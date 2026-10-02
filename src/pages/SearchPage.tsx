import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  mapListPage,
  mapMovieSummary,
  mapMultiResults,
  mapTvSummary,
} from "../api/mappers";
import { searchMovies, searchMulti, searchTv } from "../api/tmdb";
import MediaGrid from "../components/MediaGrid";
import Spinner from "../components/Spinner";

type SearchType = "all" | "movie" | "tv";

const TABS: { value: SearchType; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "movie", label: "Filmler" },
  { value: "tv", label: "Diziler" },
];

const MAX_PAGE = 500;

const isSearchType = (value: string | null): value is SearchType =>
  TABS.some((tab) => tab.value === value);

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type");
  const type = isSearchType(typeParam) ? typeParam : "all";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["search", type, query, page],
    queryFn: async () => {
      if (type === "movie") {
        const raw = await searchMovies(query, page);
        return mapListPage(raw, (items) => items.map(mapMovieSummary));
      }
      if (type === "tv") {
        const raw = await searchTv(query, page);
        return mapListPage(raw, (items) => items.map(mapTvSummary));
      }
      const raw = await searchMulti(query, page);
      return mapListPage(raw, mapMultiResults);
    },
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.min(data.totalPages, MAX_PAGE) : 1;

  const goTo = (next: { type?: SearchType; page?: number }) => {
    const nextType = next.type ?? type;
    const nextPage = next.page ?? 1;
    const params: Record<string, string> = { q: query };
    if (nextType !== "all") params.type = nextType;
    if (nextPage > 1) params.page = String(nextPage);
    setSearchParams(params);
    window.scrollTo({ top: 0 });
  };

  if (!query) {
    return (
      <p className="text-gray-400">Aramak için yukarıdaki kutuyu kullanın.</p>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold md:text-2xl">
        "{query}" için sonuçlar
      </h1>

      <div role="tablist" className="mb-6 flex gap-6 border-b border-gray-800">
        {TABS.map((tab) => {
          const isActive = tab.value === type;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo({ type: tab.value })}
              className={`-mb-px border-b-2 pb-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading && <Spinner />}
      {error && <p className="text-red-400">{error.message}</p>}

      {data && (
        <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
          {data.items.length === 0 ? (
            <p className="py-12 text-center text-gray-400">Sonuç bulunamadı.</p>
          ) : (
            <MediaGrid items={data.items} showMediaType={type === "all"} />
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => goTo({ page: page - 1 })}
                className="rounded bg-gray-800 px-4 py-2 text-sm disabled:opacity-40"
              >
                Önceki
              </button>
              <span className="text-sm text-gray-400">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => goTo({ page: page + 1 })}
                className="rounded bg-gray-800 px-4 py-2 text-sm disabled:opacity-40"
              >
                Sonraki
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
