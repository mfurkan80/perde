import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

interface ScrollRowProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const arrowClass =
  "absolute inset-y-0 z-10 hidden w-14 items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 md:flex";

const circleClass =
  "rounded-full bg-gray-900/90 p-2 text-white shadow-lg ring-1 ring-gray-700 transition-colors hover:bg-gray-800";

const ScrollRow = ({
  children,
  className = "",
  wrapperClassName = "",
}: ScrollRowProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateArrows = () => {
      setCanScrollLeft(scroller.scrollLeft > 0);
      setCanScrollRight(
        scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1,
      );
    };

    const observer = new ResizeObserver(updateArrows);
    observer.observe(scroller);
    scroller.addEventListener("scroll", updateArrows, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", updateArrows);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className={`group relative ${wrapperClassName}`}>
      <div
        ref={scrollerRef}
        className={`scrollbar-none overflow-x-auto overflow-y-hidden ${className}`}
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          aria-label="Sola kaydır"
          onClick={() => scrollByPage(-1)}
          className={`${arrowClass} left-0 justify-start bg-linear-to-r from-gray-950 to-transparent`}
        >
          <span className={circleClass}>
            <ChevronLeftIcon className="size-5" />
          </span>
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Sağa kaydır"
          onClick={() => scrollByPage(1)}
          className={`${arrowClass} right-0 justify-end bg-linear-to-l from-gray-950 to-transparent`}
        >
          <span className={circleClass}>
            <ChevronRightIcon className="size-5" />
          </span>
        </button>
      )}
    </div>
  );
};

export default ScrollRow;
