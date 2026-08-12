type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Film camera on a tripod — cinematic production
export function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="7" width="12" height="9" rx="1.5" />
      <path d="M15 10.2 21 8v8l-6-2.2" />
      <circle cx="7.5" cy="11.5" r="1.6" />
      <path d="M12 3v3M6 3l1.5 3M18 3l-1.5 3" />
    </svg>
  );
}

// Broadcast waves — media coverage
export function BroadcastIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="16" r="1.8" />
      <path d="M7.8 12a6 6 0 0 1 8.4 0" />
      <path d="M4.9 9a10 10 0 0 1 14.2 0" />
      <path d="M12 5v-.5" />
    </svg>
  );
}

// Open book — media research
export function BookIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 6.5c-1.6-1.2-4-1.5-6-1v13c2 -.5 4.4-.2 6 1 1.6-1.2 4-1.5 6-1v-13c-2-.5-4.4-.2-6 1Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

// Spotlight / mixer dial — studio design
export function StudioIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 19h16" />
      <path d="M7 19 10 6h4l3 13" />
      <circle cx="12" cy="10.5" r="1.6" />
    </svg>
  );
}

// Phone handset
export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L15 13l4 1.5v3c0 1-1 1.8-2 1.7A15.5 15.5 0 0 1 3.8 6c-.1-1 .7-2 1.7-2Z" />
    </svg>
  );
}

// Paper plane — Telegram
export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="m3.5 12.5 17-8-6 16-4-6-6-2Z" />
      <path d="m10.5 14.5 4-5" />
    </svg>
  );
}

// Chat bubble — Eitaa
export function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4 5h16v11H9l-4 3.5V16H4Z" />
    </svg>
  );
}

// Globe — website
export function GlobeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.4 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.4-3.8-8.5S9.5 5.9 12 3.5Z" />
    </svg>
  );
}

// Play button — Aparat
export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 9.2v5.6l5-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
