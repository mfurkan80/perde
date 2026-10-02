import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mapPersonDetail } from "../api/mappers";
import { fetchPersonDetail } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import ScrollRow from "../components/ScrollRow";
import Spinner from "../components/Spinner";
import { getProfileUrl } from "../utils/movieHelpers";

const DEPARTMENT_LABELS: Record<string, string> = {
  Acting: "Oyuncu",
  Directing: "Yönetmen",
  Writing: "Senarist",
  Production: "Yapımcı",
  Sound: "Müzik",
  Camera: "Görüntü Yönetmeni",
  Editing: "Kurgu",
};

const BIOGRAPHY_PREVIEW_LENGTH = 600;
const CREDITS_PREVIEW_COUNT = 20;

const toLocalDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (value: string) =>
  toLocalDate(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getAge = (birthday: string, until: Date) => {
  const birth = toLocalDate(birthday);
  const age = until.getFullYear() - birth.getFullYear();
  const hadBirthday =
    until.getMonth() > birth.getMonth() ||
    (until.getMonth() === birth.getMonth() &&
      until.getDate() >= birth.getDate());
  return hadBirthday ? age : age - 1;
};

const PersonPage = () => {
  const { id } = useParams();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [showAllCredits, setShowAllCredits] = useState(false);

  const {
    data: person,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const person = mapPersonDetail(await fetchPersonDetail(id!, "tr-TR"));

      if (!person.biography.trim()) {
        const english = await fetchPersonDetail(id!, "en-US");
        person.biography = english.biography;
      }

      return person;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  if (!person) {
    return <p>Oyuncu bulunamadı :/</p>;
  }

  const age = person.birthday
    ? getAge(
        person.birthday,
        person.deathday ? toLocalDate(person.deathday) : new Date(),
      )
    : null;

  const isLongBio = person.biography.length > BIOGRAPHY_PREVIEW_LENGTH;
  const visibleCredits = showAllCredits
    ? person.credits
    : person.credits.slice(0, CREDITS_PREVIEW_COUNT);

  return (
    <div>
      <section className="flex flex-col gap-8 md:flex-row">
        <img
          src={getProfileUrl(person)}
          alt={person.name}
          className="w-48 shrink-0 self-start rounded-lg md:w-64"
        />

        <div className="min-w-0">
          <h1 className="text-2xl font-bold md:text-4xl">{person.name}</h1>
          <p className="mt-2 text-gray-300">
            {DEPARTMENT_LABELS[person.department] ?? person.department}
            {age !== null &&
              (person.deathday
                ? ` · ${age} yaşında hayatını kaybetti`
                : ` · ${age} yaşında`)}
          </p>

          <dl className="mt-4 flex flex-col gap-1 text-sm">
            {person.birthday && (
              <div className="flex gap-2">
                <dt className="text-gray-500">Doğum:</dt>
                <dd className="text-gray-300">
                  {formatDate(person.birthday)}
                  {person.placeOfBirth && `, ${person.placeOfBirth}`}
                </dd>
              </div>
            )}
            {person.deathday && (
              <div className="flex gap-2">
                <dt className="text-gray-500">Ölüm:</dt>
                <dd className="text-gray-300">{formatDate(person.deathday)}</dd>
              </div>
            )}
          </dl>

          <h2 className="mt-6 text-lg font-semibold">Biyografi</h2>
          {person.biography ? (
            <>
              <p
                className={`mt-2 max-w-3xl whitespace-pre-line text-gray-200 ${
                  isLongBio && !isBioExpanded ? "line-clamp-6" : ""
                }`}
              >
                {person.biography}
              </p>
              {isLongBio && (
                <button
                  type="button"
                  onClick={() => setIsBioExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-semibold text-gray-400 hover:text-white"
                >
                  {isBioExpanded ? "Daha az göster" : "Devamını oku"}
                </button>
              )}
            </>
          ) : (
            <p className="mt-2 text-gray-400">Biyografi bulunamadı.</p>
          )}
        </div>
      </section>

      {person.knownFor.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-1 text-xl font-semibold">Bilinen Yapımları</h2>
          <ScrollRow
            wrapperClassName="-mx-2"
            className="flex gap-4 px-2 pt-3 pb-4"
          >
            {person.knownFor.map((item) => (
              <div
                key={`${item.mediaType}-${item.id}`}
                className="w-36 shrink-0"
              >
                <MovieCard movie={item} showMediaType />
              </div>
            ))}
          </ScrollRow>
        </section>
      )}

      {person.credits.length > 0 && (
        <section className="mt-10 max-w-3xl">
          <h2 className="mb-3 text-xl font-semibold">
            Filmografi
            <span className="ml-2 text-sm font-normal text-gray-500">
              {person.credits.length}
            </span>
          </h2>
          <ul className="divide-y divide-gray-800 rounded-lg bg-gray-900">
            {visibleCredits.map((credit) => (
              <li
                key={`${credit.mediaType}-${credit.id}`}
                className="flex gap-4 px-4 py-3 text-sm"
              >
                <span className="w-10 shrink-0 text-gray-500">
                  {credit.date ? credit.date.slice(0, 4) : "—"}
                </span>
                <div className="min-w-0">
                  <Link
                    to={`/${credit.mediaType}/${credit.id}`}
                    className="font-semibold hover:underline"
                  >
                    {credit.title}
                  </Link>
                  {credit.mediaType === "tv" && (
                    <span className="ml-2 rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">
                      Dizi
                    </span>
                  )}
                  {credit.character && (
                    <p className="text-gray-400">{credit.character}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {person.credits.length > CREDITS_PREVIEW_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllCredits((prev) => !prev)}
              className="mt-3 text-sm font-semibold text-gray-400 hover:text-white"
            >
              {showAllCredits
                ? "Daha az göster"
                : `Tümünü göster (${person.credits.length})`}
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default PersonPage;
