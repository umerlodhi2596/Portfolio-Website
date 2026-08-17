export default function ContactIcon({ type }) {
  switch (type) {
    case "phone":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7.6 3.5 5 4.6c-1 .43-1.5 1.5-1.2 2.55C5.4 13.1 10.9 18.6 16.85 20.2c1.05.3 2.12-.2 2.55-1.2l1.1-2.6a1.7 1.7 0 0 0-.9-2.2l-3.1-1.3a1.7 1.7 0 0 0-1.9.42l-1 1.1a13.4 13.4 0 0 1-6-6l1.1-1c.5-.47.65-1.2.42-1.9L8.8 4.4a1.7 1.7 0 0 0-2.2-.9Z"
            stroke="#ff7a1a"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "mail":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="#ff7a1a"
            strokeWidth="1.7"
          />
          <path
            d="m4 6.5 8 6.2 8-6.2"
            stroke="#ff7a1a"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "location":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 21.5s7-6.3 7-12A7 7 0 0 0 5 9.5c0 5.7 7 12 7 12Z"
            stroke="#ff7a1a"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="9.5"
            r="2.4"
            stroke="#ff7a1a"
            strokeWidth="1.7"
          />
        </svg>
      );

    case "arrow":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 18 18 6M18 6H9M18 6v9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}