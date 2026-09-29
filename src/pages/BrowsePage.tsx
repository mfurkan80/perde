import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { mapListPage, mapMovieSummary, mapTvSummary } from "../api/mappers";
import { discoverMovies, discoverTv, fetchGenres } from "../api/tmdb";
import MediaGrid, { MediaGridSkeleton } from "../components/MediaGrid";
import type { MediaType, SortKey } from "../types/movie";

// TMDB sayfa 500'ün ötesini vermiyor.
const MAX_PAGE = 500;

// TMDB toplam sonuç sayısını ~20.000'de kesiyor: filtresiz liste de aksiyon da "20001" döner.
const RESULT_COUNT_CAP = 20000;

const formatResultCount = (count: number) =>
  count >= RESULT_COUNT_CAP
    ? `${RESULT_COUNT_CAP.toLocaleString("tr-TR")}+ sonuç`
    : `${count.toLocaleString("tr-TR")} sonuç`;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "En Popüler" },
  { value: "top_rated", label: "En Yüksek Puan" },
  { value: "newest", label: "En Yeni" },
];

const DEFAULT_SORT: SortKey = "popular";

// URL'den gelen her şey string ve güvenilmez: ?sort=abc de yazılabilir.
const isSortKey = (value: string | null): value is SortKey =>
  SORT_OPTIONS.some((option) => option.value === value);

const parseGenreIds = (value: string | null): number[] =>
  (value ?? "")
    .split(",")
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0);

interface BrowsePageProps {
  mediaType: MediaType;
}

const BrowsePage = ({ mediaType }: BrowsePageProps) => {
  // Filtreler state'te değil URL'de: link paylaşılabilir, geri tuşu çalışır, F5'te kaybolmaz.
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort");
  const sort = isSortKey(sortParam) ? sortParam : DEFAULT_SORT;
  const genreIds = parseGenreIds(searchParams.get("genres"));

  const { data: genres } = useQuery({
    queryKey: ["genres", mediaType],
    queryFn: async () => (await fetchGenres(mediaType)).genres,
    staleTime: Infinity, // Tür listesi pratikte hiç değişmez.
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["discover", mediaType, sort, genreIds],
    queryFn: async ({ pageParam }) => {
      const filters = { genreIds, sort, page: pageParam };

      if (mediaType === "movie") {
        const raw = await discoverMovies(filters);
        return mapListPage(raw, (items) => items.map(mapMovieSummary));
      }

      const raw = await discoverTv(filters);
      return mapListPage(raw, (items) => items.map(mapTvSummary));
    },
    initialPageParam: 1,
    // Sıradaki sayfa numarası; undefined dönerse "daha fazla yok" demek.
    getNextPageParam: (lastPage) =>
      lastPage.page < Math.min(lastPage.totalPages, MAX_PAGE)
        ? lastPage.page + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
  });

  // Sayfaları tek listeye düzleştir. Popülerlik sayfalar arasında değişebildiği için
  // aynı içerik iki sayfada birden gelebiliyor: tekrarları at.
  const seen = new Set<number>();
  const items = (data?.pages ?? [])
    .flatMap((page) => page.items)
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

  const totalResults = data?.pages[0]?.totalResults;

  // Varsayılan değerleri URL'e yazmıyoruz: /movie?sort=popular yerine sadece /movie.
  const updateParams = (next: { genres?: number[]; sort?: SortKey }) => {
    const params = new URLSearchParams(searchParams);

    if (next.genres !== undefined) {
      if (next.genres.length > 0) {
        // Sıralı yaz: [28,12] ile [12,28] aynı filtre, aynı önbellek anahtarı olsun.
        params.set("genres", [...next.genres].sort((a, b) => a - b).join(","));
      } else {
        params.delete("genres");
      }
    }

    if (next.sort !== undefined) {
      if (next.sort === DEFAULT_SORT) {
        params.delete("sort");
      } else {
        params.set("sort", next.sort);
      }
    }

    setSearchParams(params);
  };

  const toggleGenre = (id: number) => {
    updateParams({
      genres: genreIds.includes(id)
        ? genreIds.filter((genreId) => genreId !== id)
        : [...genreIds, id],
    });
  };

  const title = mediaType === "movie" ? "Filmler" : "Diziler";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          {totalResults !== undefined && (
            <p className="mt-1 text-sm text-gray-400">
              {formatResultCount(totalResults)}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-400">
          Sırala
          <select
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value as SortKey })}
            className="rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Mobilde yatay kayan tek satır, masaüstünde alt alta sarılan etiketler */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0">
        {genres?.map((genre) => {
          const isActive = genreIds.includes(genre.id);
          return (
            <button
              key={genre.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => toggleGenre(genre.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-sm transition-colors ${
                isActive
                  ? "border-white bg-white text-gray-900"
                  : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
              }`}
            >
              {genre.name}
            </button>
          );
        })}

        {genreIds.length > 0 && (
          <button
            type="button"
            onClick={() => updateParams({ genres: [] })}
            className="shrink-0 px-2 py-1 text-sm text-gray-400 underline hover:text-white"
          >
            Temizle
          </button>
        )}
      </div>

      {error && <p className="text-red-400">{error.message}</p>}

      {isLoading ? (
        <MediaGridSkeleton />
      ) : items.length === 0 && !error ? (
        <p className="py-12 text-center text-gray-400">
          Bu filtrelere uygun içerik bulunamadı.
        </p>
      ) : (
        <MediaGrid items={items} />
      )}

      {hasNextPage && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded border border-gray-600 px-6 py-2 font-semibold transition-colors hover:bg-gray-800 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Yükleniyor..." : "Daha Fazla Göster"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
