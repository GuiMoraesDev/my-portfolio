import "./styles.css";

type HamburgerState = {
  isOpen?: boolean;
};

export const Hamburger = ({ isOpen = false }: HamburgerState) => (
  <svg
    width="32"
    id={isOpen ? "hamburger-opened" : ""}
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Header">
      <g clipPath="url(#clip0_714_3)">
        <g id="Size=Mobile">
          <g id="Content">
            <g id="Frame 37">
              <rect
                x="-14"
                y="-14"
                width="59.8477"
                height="60"
                rx="29.9239"
                fill="url(#paint0_radial_714_3)"
              />

              <g id="hamburger-wrapper" clipPath="url(#clip1_714_3)">
                <g id="bottom-bread">
                  <path d="M2 27L32 27V22L2 22L2 27Z" fill="#BF7404" />
                  <path
                    d="M4.37114e-07 27H2L2 22L0 22L4.37114e-07 27Z"
                    fill="#855103"
                  />
                  <path d="M2 29L4 29V27L2 27L2 29Z" fill="#855103" />
                  <path d="M4 29L30 29V27L4 27V29Z" fill="#BF7404" />
                </g>

                <g id="lettuce">
                  <path d="M0 20H32V22H0V20Z" fill="#B9EB4A" />
                  <path d="M2 20H4V24H2V20Z" fill="#86B817" />
                  <path d="M6 20H8V24H6V20Z" fill="#86B817" />
                  <path d="M10 20H12V24H10V20Z" fill="#86B817" />
                  <path d="M12 20H14V24H12V20Z" fill="#86B817" />
                  <path d="M16 20H18V24H16V20Z" fill="#86B817" />
                  <path d="M18 20H20V24H18V20Z" fill="#86B817" />
                  <path d="M20 20H22V24H20V20Z" fill="#86B817" />
                  <path d="M26 20H28V24H26V20Z" fill="#86B817" />
                  <path d="M29 20H31V24H29V20Z" fill="#86B817" />
                  <path d="M30 20H32V22H30V20Z" fill="#86B817" />
                </g>

                <g id="meat">
                  <path d="M2 12H30V14H2V12Z" fill="#A17155" />
                  <path d="M2 18H30V20H2V18Z" fill="#542408" />
                  <path d="M0 14H32V18H0V14Z" fill="#78340C" />
                </g>

                <g id="top-bread">
                  <path d="M2 7H32V12H2V7Z" fill="#BF7404" />
                  <path d="M0 7H2V12H0V7Z" fill="#855103" />
                  <path d="M2 5H4V7H2V5Z" fill="#855103" />
                  <path d="M4 3H6V5H4V3Z" fill="#855103" />
                  <path d="M4 5H30V7H4V5Z" fill="#BF7404" />
                  <path d="M6 3H28V5H6V3Z" fill="#BF7404" />
                  <path d="M8 3H10V5H8V3Z" fill="#E0BB85" />
                  <path d="M10 5H12V7H10V5Z" fill="#E0BB85" />
                  <path d="M12 3H14V5H12V3Z" fill="#E0BB85" />
                  <path d="M14 5H16V7H14V5Z" fill="#E0BB85" />
                  <path d="M20 5H22V7H20V5Z" fill="#E0BB85" />
                  <path d="M18 3H20V5H18V3Z" fill="#E0BB85" />
                  <path d="M26 3H28V5H26V3Z" fill="#D29E50" />
                  <path d="M24 3H26V5H24V3Z" fill="#D29E50" />
                  <path d="M22 3H24V5H22V3Z" fill="#D29E50" />
                  <path d="M20 3H22V5H20V3Z" fill="#D29E50" />
                  <path d="M28 5H30V7H28V5Z" fill="#D29E50" />
                  <path d="M30 7H32V9H30V7Z" fill="#D29E50" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>

    <defs>
      <filter
        id="filter0_d_714_3"
        x="-70"
        y="-52"
        width="433"
        height="140"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />

        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />

        <feMorphology
          radius="6"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_714_3"
        />

        <feOffset dy="2" />

        <feGaussianBlur stdDeviation="7" />

        <feComposite in2="hardAlpha" operator="out" />

        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.286275 0 0 0 0 0.129412 0 0 0 0 0.231373 0 0 0 1 0"
        />

        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_714_3"
        />

        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_714_3"
          result="shape"
        />
      </filter>

      <radialGradient
        id="paint0_radial_714_3"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(15.9239 16) rotate(90) scale(40 44.5378)"
      >
        <stop stopColor="#D9D9D9" stopOpacity="0" />
        <stop offset="1" stopColor="#D9D9D9" stopOpacity="0.3" />
      </radialGradient>

      <clipPath id="clip0_714_3">
        <rect x="-70" y="-174" width="1552" height="260" rx="5" fill="white" />
      </clipPath>

      <clipPath id="clip1_714_3">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
