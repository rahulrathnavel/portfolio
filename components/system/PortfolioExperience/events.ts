export const ACHIEVEMENTS_STORAGE_KEY = "rahul-os:achievements:v1";
export const PREFERENCES_STORAGE_KEY = "rahul-os:preferences:v1";

export type AchievementId =
  | "booted"
  | "cheat"
  | "game"
  | "resume"
  | "terminal"
  | "work";

export type PortfolioTheme =
  | "classic"
  | "win98"
  | "windows-xp"
  | "ubuntu"
  | "macos"
  | "hacker"
  | "cyberpunk"
  | "minimal"
  | "crt";

export type PortfolioPreferences = {
  accent: "amber" | "azure" | "violet";
  animationsEnabled: boolean;
  autoWallpaper: boolean;
  darkMode: boolean;
  iconSize: "large" | "normal" | "small";
  soundEnabled: boolean;
  theme: PortfolioTheme;
};

export const DEFAULT_PREFERENCES: PortfolioPreferences = {
  accent: "azure",
  animationsEnabled: true,
  autoWallpaper: false,
  darkMode: true,
  iconSize: "normal",
  soundEnabled: false,
  theme: "classic",
};

export const ACHIEVEMENTS: Record<
  AchievementId,
  { description: string; label: string; mark: string }
> = {
  booted: {
    description: "Started the portfolio workstation.",
    label: "System online",
    mark: "01",
  },
  cheat: {
    description: "Found one of the quiet shortcuts.",
    label: "Curious operator",
    mark: "02",
  },
  game: {
    description: "Took the RR Game Tour for a drive.",
    label: "Field explorer",
    mark: "03",
  },
  resume: {
    description: "Opened the recruiter-ready resume.",
    label: "Prepared reader",
    mark: "04",
  },
  terminal: {
    description: "Used Rahul Terminal.",
    label: "Shell visitor",
    mark: "05",
  },
  work: {
    description: "Opened a selected work case note.",
    label: "Case-note reader",
    mark: "06",
  },
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isPortfolioTheme = (value: unknown): value is PortfolioTheme =>
  [
    "classic",
    "win98",
    "windows-xp",
    "ubuntu",
    "macos",
    "hacker",
    "cyberpunk",
    "minimal",
    "crt",
  ].includes(value as PortfolioTheme);

export const readPreferences = (): PortfolioPreferences => {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;

  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);

    if (!raw) return DEFAULT_PREFERENCES;

    const parsed: unknown = JSON.parse(raw);

    if (!isRecord(parsed)) return DEFAULT_PREFERENCES;

    return {
      accent:
        parsed.accent === "amber" || parsed.accent === "violet"
          ? parsed.accent
          : "azure",
      animationsEnabled: parsed.animationsEnabled !== false,
      autoWallpaper: parsed.autoWallpaper === true,
      darkMode: parsed.darkMode !== false,
      iconSize:
        parsed.iconSize === "large" || parsed.iconSize === "small"
          ? parsed.iconSize
          : "normal",
      soundEnabled: parsed.soundEnabled === true,
      theme: isPortfolioTheme(parsed.theme) ? parsed.theme : "classic",
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export const writePreferences = (preferences: PortfolioPreferences): void => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences)
    );
  } catch {
    // Preferences are enhancement-only; private mode should not block the desktop.
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:preferences", { detail: preferences })
  );
};

export const readAchievements = (): Partial<Record<AchievementId, true>> => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);

    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);

    return isRecord(parsed)
      ? (parsed as Partial<Record<AchievementId, true>>)
      : {};
  } catch {
    return {};
  }
};

export const unlockAchievement = (achievement: AchievementId): boolean => {
  if (typeof window === "undefined") return false;

  const currentAchievements = readAchievements();

  if (currentAchievements[achievement]) return false;

  const nextAchievements = { ...currentAchievements, [achievement]: true };

  try {
    window.localStorage.setItem(
      ACHIEVEMENTS_STORAGE_KEY,
      JSON.stringify(nextAchievements)
    );
  } catch {
    // Unlock feedback still works when storage is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent("portfolio:achievement", { detail: { achievement } })
  );

  return true;
};
