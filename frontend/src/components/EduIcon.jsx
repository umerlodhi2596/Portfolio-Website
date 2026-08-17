function EduIcon({ type }) {
  switch (type) {
    case "school":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 6 4 15l20 9 20-9-20-9Z"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M12 20v10c0 2 5.4 5 12 5s12-3 12-5V20"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M44 15v12"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "college":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 42h36"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M9 42V20M15 42V20M24 42V20M33 42V20M39 42V20"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M4 20l20-12 20 12H4Z"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M6 20h36v4H6z"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "university":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 6 2 16l22 10 22-10L24 6Z"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M10 20v9c0 3 6.3 7 14 7s14-4 14-7v-9"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M2 16v11"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle
            cx="2"
            cy="30"
            r="1.6"
            fill="#ff7a1a"
          />
        </svg>
      );

    case "certificate":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="6"
            width="38"
            height="26"
            rx="2"
            stroke="#ff7a1a"
            strokeWidth="2"
          />

          <path
            d="M11 14h20M11 20h26M11 26h14"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle
            cx="24"
            cy="37"
            r="6"
            stroke="#ff7a1a"
            strokeWidth="2"
          />

          <path
            d="M20 42l-2 5 6-3 6 3-2-5"
            stroke="#ff7a1a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default EduIcon;