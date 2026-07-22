import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  BiosCard,
  BiosFooter,
  BiosSpecs,
  BiosTitle,
  BootCard,
  BootFooter,
  BootHeader,
  BootLine,
  BootLog,
  ProgressBar,
  ProgressTrack,
  SetupActions,
  SetupCard,
  SetupDescription,
  SetupTitle,
  StyledPortfolioBoot,
  ToggleList,
} from "components/system/PortfolioBoot/StyledPortfolioBoot";

const BOOT_LINES = [
  "RahulOS v2.6",
  "Initializing Portfolio...",
  "Loading Skills...",
  "Checking Bugs...",
  "Found: 127",
  "Fixing...",
  "Done ✓",
  "Welcome Rahul.",
] as const;

const BOOT_STORAGE_KEY = "rahul-os:boot-complete:v2";
const SETTINGS_STORAGE_KEY = "rahul-os:boot-settings:v2";

type BootPhase = "bios" | "boot" | "complete" | "setup";

interface StartupSettings {
  quickBoot: boolean;
  showBootScreen: boolean;
}

const DEFAULT_SETTINGS: StartupSettings = {
  quickBoot: false,
  showBootScreen: false,
};

export interface PortfolioBootProps {
  className?: string;
  forceShow?: boolean;
  onComplete?: () => void;
  persist?: boolean;
  storageKey?: string;
}

const isStartupSettings = (value: unknown): value is StartupSettings =>
  typeof value === "object" &&
  value !== null &&
  "quickBoot" in value &&
  "showBootScreen" in value &&
  typeof value.quickBoot === "boolean" &&
  typeof value.showBootScreen === "boolean";

const readStartupSettings = (): StartupSettings => {
  try {
    const storedSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!storedSettings) return DEFAULT_SETTINGS;

    const parsedSettings: unknown = JSON.parse(storedSettings);

    return isStartupSettings(parsedSettings)
      ? parsedSettings
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const writeStartupSettings = (settings: StartupSettings): void => {
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing or strict storage settings should not block the desktop.
  }
};

const PortfolioBoot: FC<PortfolioBootProps> = ({
  className,
  forceShow = false,
  onComplete,
  persist = true,
  storageKey = BOOT_STORAGE_KEY,
}) => {
  const completedRef = useRef(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  const [phase, setPhase] = useState<BootPhase>("boot");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [settings, setSettings] = useState<StartupSettings>(DEFAULT_SETTINGS);
  const [visibleLines, setVisibleLines] = useState(0);

  const complete = useCallback((): void => {
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, "true");
      } catch {
        // Private browsing or strict storage settings should not block the desktop.
      }
    }

    setPhase("complete");
  }, [persist, storageKey]);

  const reboot = useCallback((): void => {
    completedRef.current = false;

    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Rebooting still works when browser storage is unavailable.
    }

    setPhase("boot");
    setVisibleLines(0);
  }, [storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (): void =>
      setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    setMotionPreferenceReady(true);
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const savedSettings = readStartupSettings();

    setSettings(savedSettings);

    try {
      const hasCompletedBoot =
        persist && window.localStorage.getItem(storageKey) === "true";

      if (hasCompletedBoot && !forceShow && !savedSettings.showBootScreen) {
        setPhase("complete");
      }
    } catch {
      // Start normally when browser storage is unavailable.
    }

    setHasInitialized(true);
  }, [forceShow, persist, storageKey]);

  useEffect(() => {
    if (phase !== "complete" || completedRef.current) return;

    completedRef.current = true;
    onComplete?.();
  }, [onComplete, phase]);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (hasInitialized && motionPreferenceReady && phase === "boot") {
      let lineIndex = 0;
      const lineDelay = prefersReducedMotion ? 0 : 120;
      const finishDelay = prefersReducedMotion ? 80 : 180;

      const revealNextLine = (): void => {
        lineIndex += 1;
        setVisibleLines(lineIndex);

        timeoutId =
          lineIndex < BOOT_LINES.length
            ? window.setTimeout(revealNextLine, lineDelay)
            : window.setTimeout(() => setPhase("bios"), finishDelay);
      };

      timeoutId = window.setTimeout(revealNextLine, lineDelay);
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [hasInitialized, motionPreferenceReady, phase, prefersReducedMotion]);

  useEffect(() => {
    const timeoutId =
      phase === "bios"
        ? window.setTimeout(
            complete,
            prefersReducedMotion ? 700 : settings.quickBoot ? 800 : 1800
          )
        : undefined;

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [complete, phase, prefersReducedMotion, settings.quickBoot]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        complete();
        return;
      }

      if (phase === "bios" && event.key === "Delete") {
        event.preventDefault();
        event.stopPropagation();
        setPhase("setup");
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });

    return () =>
      window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [complete, phase]);

  const updateSetting = useCallback((setting: keyof StartupSettings): void => {
    setSettings((currentSettings) => {
      const nextSettings = {
        ...currentSettings,
        [setting]: !currentSettings[setting],
      };

      writeStartupSettings(nextSettings);

      return nextSettings;
    });
  }, []);

  if (phase === "complete") return <span hidden />;

  const progress = Math.round((visibleLines / BOOT_LINES.length) * 100);

  return (
    <StyledPortfolioBoot
      $reducedMotion={prefersReducedMotion}
      aria-label="RahulOS startup"
      aria-modal="true"
      className={className}
      role="dialog"
    >
      {phase === "boot" && (
        <BootCard $reducedMotion={prefersReducedMotion}>
          <BootHeader>
            <span>RahulOS / startup</span>
            <span>v2.6</span>
          </BootHeader>
          <BootLog aria-live="polite">
            {BOOT_LINES.map((line, index) => (
              <BootLine
                key={line}
                $accent={
                  line === "Done ✓"
                    ? "success"
                    : line === "Found: 127"
                      ? "warning"
                      : undefined
                }
                $visible={index < visibleLines}
              >
                {line}
              </BootLine>
            ))}
          </BootLog>
          <ProgressTrack aria-hidden="true">
            <ProgressBar $progress={progress} />
          </ProgressTrack>
          <BootFooter>
            <p>Portfolio environment / local startup</p>
            <button onClick={complete} type="button">
              Skip intro
            </button>
          </BootFooter>
        </BootCard>
      )}
      {phase === "bios" && (
        <BiosCard $reducedMotion={prefersReducedMotion}>
          <BootHeader>
            <span>Firmware / boot sequence</span>
            <span>ready</span>
          </BootHeader>
          <BiosTitle>Rahul Personal Computer</BiosTitle>
          <BiosSpecs>
            <div>
              <dt>CPU</dt>
              <dd>AI Engineer</dd>
            </div>
            <div>
              <dt>RAM</dt>
              <dd>Unlimited Curiosity</dd>
            </div>
            <div>
              <dt>GPU</dt>
              <dd>Creative Thinking</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Looking for Opportunities</dd>
            </div>
          </BiosSpecs>
          <BiosFooter>
            <p>Press DEL to enter setup</p>
            <button onClick={() => setPhase("setup")} type="button">
              Enter setup
            </button>
          </BiosFooter>
        </BiosCard>
      )}
      {phase === "setup" && (
        <SetupCard $reducedMotion={prefersReducedMotion}>
          <BootHeader>
            <span>Firmware / setup</span>
            <span>local only</span>
          </BootHeader>
          <SetupTitle>Startup preferences</SetupTitle>
          <SetupDescription>
            These choices are saved only in this browser. Nothing is sent
            anywhere.
          </SetupDescription>
          <ToggleList>
            <label htmlFor="portfolio-boot-quick">
              Quick boot
              <input
                checked={settings.quickBoot}
                id="portfolio-boot-quick"
                onChange={() => updateSetting("quickBoot")}
                type="checkbox"
              />
            </label>
            <label htmlFor="portfolio-boot-repeat">
              Show startup screen on future visits
              <input
                checked={settings.showBootScreen}
                id="portfolio-boot-repeat"
                onChange={() => updateSetting("showBootScreen")}
                type="checkbox"
              />
            </label>
          </ToggleList>
          <SetupActions>
            <button onClick={complete} type="button">
              Save &amp; boot desktop
            </button>
            <button onClick={reboot} type="button">
              Reboot
            </button>
          </SetupActions>
        </SetupCard>
      )}
    </StyledPortfolioBoot>
  );
};

export default memo(PortfolioBoot);
