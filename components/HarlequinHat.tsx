export function HarlequinHat({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hat-sway"
      aria-hidden="true"
    >
      {/* Left lobe - celeste */}
      <path d="M8 36 L18 10 L28 36 Z" fill="#74ACDF" />
      {/* Right lobe - white */}
      <path d="M20 36 L30 10 L40 36 Z" fill="#FFFFFF" />
      {/* Overlap blend diamond mid */}
      <path d="M24 18 L28 26 L24 34 L20 26 Z" fill="#74ACDF" opacity="0.4" />
      {/* Brim */}
      <rect x="4" y="33" width="40" height="7" rx="3.5" fill="#FFD700" />
      <rect x="4" y="33" width="40" height="7" rx="3.5" fill="none" stroke="#003870" strokeWidth="0.8" />
      {/* Pompom left */}
      <circle cx="18" cy="9" r="4.5" fill="#FFD700" />
      <circle cx="18" cy="9" r="4.5" fill="none" stroke="#003870" strokeWidth="0.5" />
      {/* Pompom right */}
      <circle cx="30" cy="9" r="4.5" fill="#FFD700" />
      <circle cx="30" cy="9" r="4.5" fill="none" stroke="#003870" strokeWidth="0.5" />
      {/* Shine on pompoms */}
      <circle cx="16.5" cy="7.5" r="1.2" fill="white" opacity="0.6" />
      <circle cx="28.5" cy="7.5" r="1.2" fill="white" opacity="0.6" />
    </svg>
  )
}
