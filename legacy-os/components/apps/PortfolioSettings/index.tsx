import { memo, useCallback, useState } from "react";
import StyledPortfolioSettings from "components/apps/PortfolioSettings/StyledPortfolioSettings";
import {
  DEFAULT_PREFERENCES,
  type PortfolioPreferences,
  type PortfolioTheme,
  readPreferences,
  writePreferences,
} from "components/system/PortfolioExperience/events";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";

const DISPLAY_THEMES: { label: string; value: PortfolioTheme }[] = [
  { label: "Classic", value: "classic" },
  { label: "Windows XP", value: "windows-xp" },
  { label: "Windows 98", value: "win98" },
  { label: "Ubuntu", value: "ubuntu" },
  { label: "macOS", value: "macos" },
  { label: "Hacker", value: "hacker" },
  { label: "Cyberpunk", value: "cyberpunk" },
  { label: "Minimal", value: "minimal" },
  { label: "CRT Monitor", value: "crt" },
];

const WALLPAPERS = [
  { label: "Waves", value: "VANTA" },
  { label: "Landscape", value: "COASTAL_LANDSCAPE" },
  { label: "Hexells", value: "HEXELLS" },
  { label: "Matrix", value: "MATRIX" },
] as const;

const PortfolioSettings: FC<ComponentProcessProps> = ({ id }) => {
  const { closeWithTransition } = useProcesses();
  const { setWallpaper, wallpaperImage } = useSession();
  const [preferences, setPreferences] =
    useState<PortfolioPreferences>(readPreferences);

  const updatePreferences = useCallback(
    (updates: Partial<PortfolioPreferences>): void => {
      setPreferences((currentPreferences) => {
        const nextPreferences = { ...currentPreferences, ...updates };

        writePreferences(nextPreferences);

        return nextPreferences;
      });
    },
    []
  );

  const resetPreferences = useCallback((): void => {
    setPreferences(DEFAULT_PREFERENCES);
    setWallpaper("VANTA");
    writePreferences(DEFAULT_PREFERENCES);
  }, [setWallpaper]);

  return (
    <StyledPortfolioSettings aria-label="Portfolio display settings">
      <header className="settings__header">
        <div>
          <p className="settings__eyebrow">Local control panel</p>
          <h1>Desktop settings</h1>
        </div>
        <button onClick={() => closeWithTransition(id)} type="button">
          Close
        </button>
      </header>

      <div className="settings__sections">
        <section className="settings__section">
          <h2>Wallpaper</h2>
          <p>Pick a scene, or let the desktop follow the time of day.</p>
          <div className="settings__grid">
            {WALLPAPERS.map(({ label, value }) => (
              <button
                key={value}
                className="settings__choice"
                data-active={wallpaperImage === value}
                onClick={() => setWallpaper(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="settings__setting">
            <div>
              <strong>Automatic day cycle</strong>
              <span>
                Landscape in the morning, Waves in the afternoon, Matrix at
                night.
              </span>
            </div>
            <span className="settings__toggle">
              <input
                checked={preferences.autoWallpaper}
                id="portfolio-auto-wallpaper"
                onChange={() =>
                  updatePreferences({
                    autoWallpaper: !preferences.autoWallpaper,
                  })
                }
                type="checkbox"
              />
              <label htmlFor="portfolio-auto-wallpaper">Auto</label>
            </span>
          </div>
        </section>

        <section className="settings__section">
          <h2>Display skin</h2>
          <p>
            Lightweight visual treatments; the portfolio stays readable in every
            one.
          </p>
          <div className="settings__grid">
            {DISPLAY_THEMES.map(({ label, value }) => (
              <button
                key={value}
                className="settings__choice"
                data-active={preferences.theme === value}
                onClick={() => updatePreferences({ theme: value })}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="settings__section">
          <h2>Accent and scale</h2>
          <div className="settings__grid">
            {(["azure", "amber", "violet"] as const).map((accent) => (
              <button
                key={accent}
                className="settings__choice"
                data-active={preferences.accent === accent}
                onClick={() => updatePreferences({ accent })}
                type="button"
              >
                {accent[0].toUpperCase() + accent.slice(1)} accent
              </button>
            ))}
            {(["small", "normal", "large"] as const).map((iconSize) => (
              <button
                key={iconSize}
                className="settings__choice"
                data-active={preferences.iconSize === iconSize}
                onClick={() => updatePreferences({ iconSize })}
                type="button"
              >
                {iconSize[0].toUpperCase() + iconSize.slice(1)} icons
              </button>
            ))}
          </div>
        </section>

        <section className="settings__section">
          <h2>Comfort</h2>
          <div className="settings__setting">
            <div>
              <strong>Dark workspace</strong>
              <span>
                Uses the calm, high-contrast desktop appearance by default.
              </span>
            </div>
            <span className="settings__toggle">
              <input
                checked={preferences.darkMode}
                id="portfolio-dark-mode"
                onChange={() =>
                  updatePreferences({ darkMode: !preferences.darkMode })
                }
                type="checkbox"
              />
              <label htmlFor="portfolio-dark-mode">Dark</label>
            </span>
          </div>
          <div className="settings__setting">
            <div>
              <strong>Window animations</strong>
              <span>Turns decorative motion off across the workstation.</span>
            </div>
            <span className="settings__toggle">
              <input
                checked={preferences.animationsEnabled}
                id="portfolio-animations"
                onChange={() =>
                  updatePreferences({
                    animationsEnabled: !preferences.animationsEnabled,
                  })
                }
                type="checkbox"
              />
              <label htmlFor="portfolio-animations">Motion</label>
            </span>
          </div>
          <div className="settings__setting">
            <div>
              <strong>Interface sounds</strong>
              <span>
                Only enables small local feedback sounds in the recycle bin.
              </span>
            </div>
            <span className="settings__toggle">
              <input
                checked={preferences.soundEnabled}
                id="portfolio-sound"
                onChange={() =>
                  updatePreferences({ soundEnabled: !preferences.soundEnabled })
                }
                type="checkbox"
              />
              <label htmlFor="portfolio-sound">Sound</label>
            </span>
          </div>
        </section>
      </div>

      <footer className="settings__footer">
        <p>All display preferences stay in this browser.</p>
        <div>
          <button onClick={resetPreferences} type="button">
            Reset display
          </button>{" "}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("portfolio:shutdown"))
            }
            type="button"
          >
            Power desktop
          </button>
        </div>
      </footer>
    </StyledPortfolioSettings>
  );
};

export default memo(PortfolioSettings);
