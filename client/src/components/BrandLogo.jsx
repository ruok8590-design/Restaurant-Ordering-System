function BrandLogo({ showText = true, size = 40 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 27C8 25 9 17 15 16C15 7 28 5 32 14C39 14 41 23 35 27V35H13V27Z"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 27H35M15 35H33M19 35V40H29V35"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 13V23"
          stroke="#F97316"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span style={{ fontSize: '26px', fontWeight: '800', color: '#F97316' }}>
          Savoria
        </span>
      )}
    </div>
  );
}

export default BrandLogo;