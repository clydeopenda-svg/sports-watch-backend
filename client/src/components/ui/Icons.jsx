const sharedProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function FlameIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M14 3c2.4 2.5 3.2 4.8 3.2 7.3 0 3.3-2.4 5.9-5.5 5.9-2.2 0-4.2-1.4-4.8-3.3-.7-2.1.4-3.7 2.2-5.8" />
      <path d="M8.4 15.2c.8 1.2 2 2 3.4 2.1 2.4.2 4.4-1.4 4.9-3.6" />
    </svg>
  );
}

export function TrophyIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M7 4h10a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V5a1 1 0 0 1 1-1Z" />
      <path d="M7 11h10" />
      <path d="M9 15h6" />
      <path d="M10 19h4" />
      <path d="M12 4v2" />
    </svg>
  );
}

export function BoltIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M13 2 6 13h5l-1 9 7-11h-5l1-9Z" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function SparklesIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="m12 3 1.4 4.2L18 8.7l-4.6 1.5L12 14.4l-1.4-4.2L6 8.7l4.6-1.5L12 3Z" />
      <path d="m18 15 0.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8L18 15Z" />
    </svg>
  );
}

export function TargetIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function SettingsIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M4.2 7.2l1.4 1.4" />
      <path d="M18.4 15.4l1.4 1.4" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M4.2 16.8l1.4-1.4" />
      <path d="M18.4 8.6l1.4-1.4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AlertTriangleIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M12 3 2 19h20L12 3Z" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function BookOpenIcon(props) {
  return (
    <svg {...sharedProps} {...props}>
      <path d="M4 6a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v13H6a2 2 0 0 1-2-2V6Z" />
      <path d="M20 6a2 2 0 0 0-2-2h-6a3 3 0 0 0-3 3v13h8a2 2 0 0 0 2-2V6Z" />
    </svg>
  );
}
