const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-48 md:h-72 bg-gray-800 rounded-lg">
        <div className="p-3">
          <div className="h-4 bg-gray-800 rounded mb-2" />
          <div className="h-3 bg-gray-800 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
