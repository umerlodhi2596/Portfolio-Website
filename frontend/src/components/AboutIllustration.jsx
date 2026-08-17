export default function AboutIllustration() {
  return (
    <div className="about-illustration">
      <svg
        viewBox="0 0 360 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk */}
        <rect
          x="20"
          y="230"
          width="320"
          height="10"
          rx="2"
          fill="#1b1815"
          stroke="#ff7a1a"
          strokeWidth="1.5"
        />

        <path
          d="M40 240v20M320 240v20"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Laptop base */}
        <path
          d="M110 230l14-46h112l14 46H110Z"
          fill="#141210"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Laptop screen */}
        <rect
          x="128"
          y="112"
          width="104"
          height="72"
          rx="4"
          fill="#0a0908"
          stroke="#ff7a1a"
          strokeWidth="2"
        />

        <rect
          x="136"
          y="120"
          width="88"
          height="56"
          rx="2"
          fill="#141210"
        />

        {/* Code */}
        <path
          d="M144 130h28M144 138h44M144 146h20M180 146h24M144 154h36M144 162h16M164 162h30M144 170h50"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />

        <circle
          cx="150"
          cy="170"
          r="2.4"
          fill="#ff7a1a"
        />

        {/* Mug */}
        <path
          d="M258 200h20v18a10 10 0 0 1-10 10h0a10 10 0 0 1-10-10v-18Z"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M278 205h6a6 6 0 0 1 0 12h-6"
          stroke="#ff7a1a"
          strokeWidth="2"
        />

        <path
          d="M262 194c1-3 4-3 5-6M270 194c1-3 4-3 5-6"
          stroke="#ff7a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Plant */}
        <path
          d="M78 214h18l-3 16H81l-3-16Z"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M87 214c0-10-8-16-16-16M87 214c0-8 7-13 14-13M87 214c0-6 2-11 2-16"
          stroke="#ff7a1a"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Floating brackets */}
        <path
          d="M56 90l-10 10 10 10M64 130l-10-10 10-10"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        <path
          d="M300 70l10 10-10 10M292 110l10-10-10-10"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        <circle
          cx="180"
          cy="46"
          r="3"
          fill="#ff7a1a"
          opacity="0.7"
        />

        <circle
          cx="60"
          cy="60"
          r="2"
          fill="#ff7a1a"
          opacity="0.5"
        />

        <circle
          cx="320"
          cy="150"
          r="2.4"
          fill="#ff7a1a"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}