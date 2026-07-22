import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ACHIEVEMENTS,
  type AchievementId,
  type PortfolioPreferences,
  readPreferences,
  unlockAchievement,
} from "components/system/PortfolioExperience/events";
import {
  BSOD,
  BugSwarm,
  CRTFilm,
  DisplayFilm,
  InvincibleFrame,
  Pet,
  PortfolioGlobalStyle,
  Shutdown,
  StyledPortfolioExperience,
  Toast,
  ToastStack,
} from "components/system/PortfolioExperience/StyledPortfolioExperience";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";

type ToastState = {
  message: string;
  title: string;
  tone?: "achievement" | "success" | "warning";
};

const getAutoWallpaper = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "COASTAL_LANDSCAPE";
  if (hour >= 11 && hour < 17) return "VANTA";
  if (hour >= 17 && hour < 21) return "HEXELLS";

  return "MATRIX";
};

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']")
  );
};

const PortfolioExperience: FC = () => {
  const { processes } = useProcesses();
  const { setWallpaper } = useSession();
  const [preferences, setPreferences] =
    useState<PortfolioPreferences>(readPreferences);
  const [toast, setToast] = useState<ToastState>();
  const [bsodCode, setBsodCode] = useState<string>();
  const [bugsCleaning, setBugsCleaning] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [petPosition, setPetPosition] = useState({ x: 22, y: 180 });
  const [petWaving, setPetWaving] = useState(false);
  const pointerRef = useRef({ x: 90, y: 180 });
  const toastTimeoutRef = useRef<number | undefined>(undefined);
  const processKeys = Object.keys(processes).join("|");

  const showToast = useCallback((nextToast: ToastState): void => {
    window.clearTimeout(toastTimeoutRef.current);
    setToast(nextToast);
    toastTimeoutRef.current = window.setTimeout(
      () => setToast(undefined),
      4700
    );
  }, []);

  const award = useCallback(
    (achievement: AchievementId): void => {
      if (unlockAchievement(achievement)) {
        const { description, label, mark } = ACHIEVEMENTS[achievement];

        showToast({
          message: `${mark} / ${description}`,
          title: `Badge unlocked: ${label}`,
          tone: "achievement",
        });
      }
    },
    [showToast]
  );

  const executeCheat = useCallback(
    (code: string): void => {
      award("cheat");

      if (code === "iddqd") {
        setInvincible(true);
        showToast({
          message: "Systems reinforced. Keep exploring.",
          title: "Invincible mode",
          tone: "success",
        });
        window.setTimeout(() => setInvincible(false), 1800);
      } else if (code === "sudo hire rahul") {
        showToast({
          message: "Access granted. Hiring decision: APPROVED.",
          title: "Opportunity console",
          tone: "success",
        });
      } else if (code === "rm -rf bugs") {
        setBugsCleaning(true);
        showToast({
          message: "Fictional bugs cleared. Real work still gets tests.",
          title: "Clean workspace",
          tone: "success",
        });
        window.setTimeout(() => setBugsCleaning(false), 980);
      } else if (code === "coffee") {
        document.body.classList.remove("portfolio-coffee-shake");
        document.body.getBoundingClientRect();
        document.body.classList.add("portfolio-coffee-shake");
        showToast({
          message: "Coding speed +300%. Hydration still recommended.",
          title: "Coffee accepted",
          tone: "success",
        });
        window.setTimeout(
          () => document.body.classList.remove("portfolio-coffee-shake"),
          500
        );
      }
    },
    [award, showToast]
  );

  useEffect(() => {
    award("booted");

    return () => window.clearTimeout(toastTimeoutRef.current);
  }, [award]);

  useEffect(() => {
    const updatePreferences = (event: Event): void => {
      const { detail } = event as CustomEvent<PortfolioPreferences>;
      const nextPreferences = detail || readPreferences();

      setPreferences(nextPreferences);
      document.documentElement.dataset.portfolioAccent = nextPreferences.accent;
      document.documentElement.dataset.portfolioAnimations =
        nextPreferences.animationsEnabled ? "on" : "off";
      document.documentElement.dataset.portfolioDark = nextPreferences.darkMode
        ? "on"
        : "off";
      document.documentElement.dataset.portfolioIconSize =
        nextPreferences.iconSize;
      document.documentElement.dataset.portfolioTheme = nextPreferences.theme;
    };
    const onMatrix = (): void => {
      setWallpaper("MATRIX");
      showToast({
        message: "Desktop switched to the Matrix wallpaper.",
        title: "Display mode",
      });
    };
    const onCheat = (event: Event): void =>
      executeCheat(
        (event as CustomEvent<{ code?: string }>).detail?.code || ""
      );
    const onBsod = (event: Event): void =>
      setBsodCode(
        (event as CustomEvent<{ code?: string }>).detail?.code ||
          "ERROR_PORTFOLIO_NOT_FOUND"
      );
    const onShutdown = (): void => setShutdown(true);

    updatePreferences(
      new CustomEvent("portfolio:preferences", {
        detail: readPreferences(),
      })
    );
    window.addEventListener("portfolio:preferences", updatePreferences);
    window.addEventListener("portfolio:matrix", onMatrix);
    window.addEventListener("portfolio:cheat", onCheat);
    window.addEventListener("portfolio:bsod", onBsod);
    window.addEventListener("portfolio:shutdown", onShutdown);

    return () => {
      window.removeEventListener("portfolio:preferences", updatePreferences);
      window.removeEventListener("portfolio:matrix", onMatrix);
      window.removeEventListener("portfolio:cheat", onCheat);
      window.removeEventListener("portfolio:bsod", onBsod);
      window.removeEventListener("portfolio:shutdown", onShutdown);
    };
  }, [executeCheat, setWallpaper, showToast]);

  useEffect(() => {
    let intervalId: number | undefined;

    if (preferences.autoWallpaper) {
      const updateWallpaper = (): void => setWallpaper(getAutoWallpaper());

      updateWallpaper();
      intervalId = window.setInterval(updateWallpaper, 30 * 60 * 1000);
    }

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [preferences.autoWallpaper, setWallpaper]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent): void => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    const chasePointer = (): void => {
      const x = Math.max(
        12,
        Math.min(window.innerWidth - 46, pointerRef.current.x + 18)
      );
      const y = Math.max(
        50,
        Math.min(window.innerHeight - 62, pointerRef.current.y + 18)
      );

      setPetPosition({ x, y });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const intervalId = window.setInterval(chasePointer, 4200);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (processKeys) {
      const activeProcesses = Object.entries(processes);
      const processOpened = (processName: string): boolean =>
        activeProcesses.some(([id]) => id.startsWith(processName));
      const markedUrls = activeProcesses
        .filter(([id]) => id.startsWith("Marked"))
        .map(([, process]) => process.url || "");

      if (processOpened("GameTour")) {
        award("game");
      }
      if (processOpened("RahulTerminal")) {
        award("terminal");
      }
      if (markedUrls.some((url) => url.includes("Selected Work"))) {
        award("work");
      }
      if (
        activeProcesses.some(
          ([id, process]) =>
            id.startsWith("PDF") &&
            (process.url || "").includes("Rahul-Rathnavel-Resume.pdf")
        )
      ) {
        award("resume");
      }

      setPetWaving(true);
      timeoutId = window.setTimeout(() => setPetWaving(false), 1100);
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [award, processKeys, processes]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (
        isTypingTarget(event.target) ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key.length !== 1) return;

      const currentBuffer =
        `${(window as Window & { portfolioCheatBuffer?: string }).portfolioCheatBuffer || ""}${event.key.toLowerCase()}`.slice(
          -40
        );
      (
        window as Window & { portfolioCheatBuffer?: string }
      ).portfolioCheatBuffer = currentBuffer;

      ["sudo hire rahul", "rm -rf bugs", "iddqd", "coffee"].forEach((code) => {
        if (currentBuffer.endsWith(code)) executeCheat(code);
      });
    };
    const onRapidDesktopClick = (() => {
      let clicks: number[] = [];

      return (event: MouseEvent): void => {
        if (
          !(event.target instanceof Element) ||
          !event.target.closest("main > ol")
        ) {
          return;
        }

        const now = Date.now();
        clicks = [...clicks.filter((time) => now - time < 1250), now];

        if (clicks.length >= 14) {
          clicks = [];
          setBsodCode("ERROR_ICON_STRESS_TEST_COMPLETE");
        }
      };
    })();

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onRapidDesktopClick, {
      capture: true,
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onRapidDesktopClick, {
        capture: true,
      });
    };
  }, [executeCheat]);

  useEffect(() => {
    let timeoutId: number | undefined;
    let hasSeenHint = false;

    try {
      hasSeenHint = Boolean(
        window.localStorage.getItem("rahul-os:terminal-hint:v1")
      );
    } catch {
      // The hint remains a non-essential enhancement when storage is unavailable.
    }

    if (!hasSeenHint) {
      timeoutId = window.setTimeout(
        () => {
          try {
            window.localStorage.setItem("rahul-os:terminal-hint:v1", "true");
          } catch {
            // No-op.
          }
          showToast({
            message:
              "A quiet terminal is available with Ctrl + Alt + T. The Try This Terminal file has a few optional commands.",
            title: "System note",
          });
        },
        3 * 60 * 1000
      );
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [showToast]);

  useEffect(() => {
    const timeoutId = bsodCode
      ? window.setTimeout(() => setBsodCode(undefined), 3600)
      : undefined;

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [bsodCode]);

  return (
    <>
      <PortfolioGlobalStyle />
      <StyledPortfolioExperience aria-live="polite">
        <DisplayFilm $theme={preferences.theme} />
        {preferences.theme === "crt" && <CRTFilm />}
        <Pet
          $wave={petWaving}
          $x={petPosition.x}
          $y={petPosition.y}
          aria-hidden="true"
        />
        {bugsCleaning && (
          <BugSwarm aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((bug) => (
              <span
                key={bug}
                style={
                  {
                    "--bug-left": `${(bug - 2.5) * 28}px`,
                    "--bug-top": `${(bug % 2 ? 1 : -1) * (18 + bug * 7)}px`,
                    "--bug-x": `${(bug - 2.5) * 95}px`,
                    "--bug-y": `${bug % 2 ? -130 : 150}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </BugSwarm>
        )}
        {invincible && <InvincibleFrame aria-hidden="true" />}
        {toast && (
          <ToastStack>
            <Toast
              $tone={toast.tone}
              onClick={() => setToast(undefined)}
              type="button"
            >
              <strong>{toast.title}</strong>
              <span>{toast.message}</span>
            </Toast>
          </ToastStack>
        )}
      </StyledPortfolioExperience>
      {bsodCode && (
        <BSOD aria-live="assertive" role="alert">
          <div>
            <h1>:(</h1>
            <p>
              RahulOS ran into a deliberately harmless problem and needs a
              moment to restart.
            </p>
            <p>Do not worry. The portfolio and your browser are fine.</p>
            <code>STOP CODE: {bsodCode}</code>
            <button onClick={() => setBsodCode(undefined)} type="button">
              Restart now
            </button>
          </div>
        </BSOD>
      )}
      {shutdown && (
        <Shutdown aria-label="RahulOS sleeping" role="dialog">
          <div>
            <p>RahulOS is sleeping.</p>
            <button onClick={() => setShutdown(false)} type="button">
              Wake desktop
            </button>
          </div>
        </Shutdown>
      )}
    </>
  );
};

export default memo(PortfolioExperience);
