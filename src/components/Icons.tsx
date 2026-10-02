interface IconProps {
  className?: string;
}

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  stroke: "currentColor",
  "aria-hidden": true,
};

export const MenuIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...baseProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export const SearchIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...baseProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export const CloseIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...baseProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const ChevronLeftIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...baseProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

export const ChevronRightIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...baseProps} className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);
