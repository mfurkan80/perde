import type { CastMember } from "../types/movie";
import { getProfileUrl } from "../utils/movieHelpers";

interface CastRowProps {
  cast: CastMember[];
}

const CastRow = ({ cast }: CastRowProps) => {
  if (cast.length === 0) {
    return null;
  }
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Oyuncular</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cast.map((person) => (
          <div key={person.id} className="w-32 shrink-0">
            <img
              className="w-full h-40 object-cover rounded"
              src={getProfileUrl(person)}
              alt={person.name}
              loading="lazy"
            />
            <p className="text-sm font-medium mt-2">{person.name}</p>
            <p className="text-xs text-gray-400">{person.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastRow;
