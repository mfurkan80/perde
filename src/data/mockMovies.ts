import type { MovieSummary } from "../types/movie";

export const mockMovies: MovieSummary[] = [
  {
    id: 1,
    title: "From",
    overview:
      "From, John Griffin tarafından yaratılan ve ilk olarak 2022 yılında yayınlanmaya başlayan Amerikan yapımı bir bilim kurgu, gizem ve psikolojik korku dizisidir.",
    releaseDate: "2022-02-20",
    voteAverage: 7.8,
    adult: false,
  },
  {
    id: 2,
    title: "Game of Thrones",
    overview:
      "George R. R. Martin'in Buz ve Ateşin Şarkısı roman serisinden uyarlanan, David Benioff ve D. B. Weiss tarafından yaratılan Amerikan fantastik televizyon dramasidır",
    releaseDate: "2012-02-20",
    voteAverage: 9.2,
    adult: false,
    posterPath: "/favicon.svg",
  },
  {
    id: 3,
    title: "Breaking Bad",
    overview:
      "Breaking Bad, ölümcül akciğer kanseri teşhisi konan bir lise kimya öğretmeninin, ailesinin geleceğini güvence altına almak için eski bir öğrencisiyle metamfetamin üretip satmaya başlamasını ve zamanla acımasız bir suç liderine dönüşmesini konu alan Amerikan suç draması türündeki televizyon dizisidir.",
    releaseDate: "2010-02-20",
    voteAverage: 9.6,
    adult: true,
    posterPath: "/lpg123.jpg",
  },
];
