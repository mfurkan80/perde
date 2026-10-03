import { useState } from "react";
import { PhotoIcon } from "./Icons";

interface PosterImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

const PosterImage = ({ src, alt, className = "" }: PosterImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gray-800 text-gray-600 ${className}`}
      >
        <PhotoIcon className="w-1/3 max-w-12" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export default PosterImage;
