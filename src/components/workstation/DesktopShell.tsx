"use client";

import { Rnd } from "react-rnd";
import {
  CircleHelp,
  FileCheck2,
  FileText,
  FolderKanban,
  Gamepad2,
  Mail,
  Maximize2,
  Menu,
  Minimize2,
  Search,
  Settings2,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { profile } from "@/config/portfolioData";
import { AppContent, appDescriptions } from "./PortfolioApps";
import type { AppId, Language, WindowRect, WindowState } from "./types";

type AppDefinition = {
  defaultBounds: WindowRect;
  desktop: boolean;
  icon: LucideIcon;
  id: AppId;
  label: string;
  shortLabel: string;
};

const appDefinitions: AppDefinition[] = [
  {
    defaultBounds: { height: 525, width: 835, x: 105, y: 62 },
    desktop: false,
    icon: Sparkles,
    id: "welcome",
    label: "START_HERE.md",
    shortLabel: "Start here",
  },
  {
    defaultBounds: { height: 560, width: 855, x: 146, y: 72 },
    desktop: true,
    icon: UserRound,
    id: "about",
    label: "About Rahul.md",
    shortLabel: "About",
  },
  {
    defaultBounds: { height: 575, width: 990, x: 88, y: 48 },
    desktop: true,
    icon: FolderKanban,
    id: "work",
    label: "Selected Work",
    shortLabel: "Work",
  },
  {
    defaultBounds: { height: 575, width: 980, x: 116, y: 50 },
    desktop: true,
    icon: FileCheck2,
    id: "proof",
    label: "Proof Desk.app",
    shortLabel: "Proof",
  },
  {
    defaultBounds: { height: 430, width: 735, x: 260, y: 120 },
    desktop: true,
    icon: FileText,
    id: "resume",
    label: "Rahul-Rathnavel-Resume.pdf",
    shortLabel: "Resume",
  },
  {
    defaultBounds: { height: 560, width: 935, x: 155, y: 58 },
    desktop: true,
    icon: Mail,
    id: "contact",
    label: "Contact Rahul.app",
    shortLabel: "Contact",
  },
  {
    defaultBounds: { height: 540, width: 880, x: 176, y: 95 },
    desktop: true,
    icon: Gamepad2,
    id: "game",
    label: "RR Game Tour.app",
    shortLabel: "Game Tour",
  },
  {
    defaultBounds: { height: 450, width: 710, x: 250, y: 125 },
    desktop: false,
    icon: Settings2,
    id: "settings",
    label: "Control Center",
    shortLabel: "Settings",
  },
];

const appIds = new Set<AppId>(appDefinitions.map((app) => app.id));

function definitionFor(id: AppId) {
  return appDefinitions.find((app) => app.id === id) as AppDefinition;
}

function createInitialWindows() {
  return appDefinitions.reduce<Record<AppId, WindowState>>((windows, app, index) => {
    windows[app.id] = {
      ...app.defaultBounds,
      maximized: false,
      minimized: false,
      open: app.id === "welcome",
      zIndex: 10 + index,
    };
    return windows;
  }, {} as Record<AppId, WindowState>);
}

function fallbackApp(windows: Record<AppId, WindowState>, excludedApp: AppId): AppId {
  const candidate = appDefinitions
    .filter((app) => app.id !== excludedApp && windows[app.id].open && !windows[app.id].minimized)
    .sort((left, right) => windows[right.id].zIndex - windows[left.id].zIndex)[0];

  return candidate?.id ?? "welcome";
}

function useCompactLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1120px), (pointer: coarse)");
    const update = () => setIsCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

type WindowFrameProps = {
  active: boolean;
  app: AppDefinition;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  onRectChange: (rect: WindowRect) => void;
  state: WindowState;
};

function WindowChrome({
  active,
  app,
  children,
  onClose,
  onFocus,
  onMaximize,
  onMinimize,
  onRectChange,
  state,
}: WindowFrameProps) {
  const Icon = app.icon;
  const chrome = (
    <>
      <header className="rr-window-titlebar">
        <div className="rr-window-title">
          <Icon aria-hidden="true" size={15} strokeWidth={2.25} />
          <span>{app.label}</span>
        </div>
        <div className="rr-window-controls" onPointerDown={(event) => event.stopPropagation()}>
          <button aria-label={`Minimize ${app.label}`} onClick={onMinimize} type="button">
            <Minimize2 aria-hidden="true" size={14} />
          </button>
          <button aria-label={`${state.maximized ? "Restore" : "Maximize"} ${app.label}`} onClick={onMaximize} type="button">
            <Maximize2 aria-hidden="true" size={13} />
          </button>
          <button aria-label={`Close ${app.label}`} className="rr-window-close" onClick={onClose} type="button">
            <X aria-hidden="true" size={14} />
          </button>
        </div>
      </header>
      <div className="rr-window-body">{children}</div>
    </>
  );

  if (state.maximized) {
    return (
      <section
        aria-label={app.label}
        className={`rr-window rr-window-maximized ${active ? "is-active" : ""}`}
        onMouseDown={onFocus}
        style={{ zIndex: state.zIndex }}
      >
        {chrome}
      </section>
    );
  }

  return (
    <Rnd
      bounds="parent"
      className={`rr-window ${active ? "is-active" : ""}`}
      dragHandleClassName="rr-window-titlebar"
      minHeight={320}
      minWidth={420}
      onDragStop={(_, data) => onRectChange({ height: state.height, width: state.width, x: data.x, y: data.y })}
      onMouseDown={onFocus}
      onResizeStop={(_, __, ref, ___, position) => onRectChange({
        height: ref.offsetHeight,
        width: ref.offsetWidth,
        x: position.x,
        y: position.y,
      })}
      position={{ x: state.x, y: state.y }}
      size={{ height: state.height, width: state.width }}
      style={{ zIndex: state.zIndex }}
    >
      {chrome}
    </Rnd>
  );
}

type MobileWorkspaceProps = {
  activeApp: AppId;
  language: Language;
  onDismissWelcome: () => void;
  onOpenApp: (app: AppId) => void;
  onResetWorkspace: () => void;
  onSetLanguage: (language: Language) => void;
};

function MobileWorkspace({
  activeApp,
  language,
  onDismissWelcome,
  onOpenApp,
  onResetWorkspace,
  onSetLanguage,
}: MobileWorkspaceProps) {
  const activeDefinition = definitionFor(activeApp);
  const Icon = activeDefinition.icon;
  const navApps: AppId[] = ["about", "work", "proof", "contact"];

  return (
    <main className="rr-mobile-workstation">
      <header className="rr-mobile-header">
        <button aria-label="Open quick brief" className="rr-mobile-mark" onClick={() => onOpenApp("welcome")} type="button">RR</button>
        <div>
          <strong>RR Workstation</strong>
          <span>Portfolio OS / mobile view</span>
        </div>
        <div className="rr-mobile-tools">
          <button aria-label="Toggle Tamil mode" onClick={() => onSetLanguage(language === "en" ? "ta" : "en")} type="button">{language === "en" ? "த" : "EN"}</button>
          <a aria-label="Open resume PDF" href={profile.resume} rel="noreferrer" target="_blank"><FileText aria-hidden="true" size={16} /></a>
        </div>
      </header>
      <nav aria-label="Portfolio sections" className="rr-mobile-nav">
        {navApps.map((id) => {
          const app = definitionFor(id);
          const NavIcon = app.icon;
          return (
            <button aria-current={activeApp === id ? "page" : undefined} key={id} onClick={() => onOpenApp(id)} type="button">
              <NavIcon aria-hidden="true" size={17} />
              {app.shortLabel}
            </button>
          );
        })}
      </nav>
      <section aria-label={activeDefinition.label} className="rr-mobile-panel">
        <header className="rr-mobile-panel-title"><Icon aria-hidden="true" size={16} /> {activeDefinition.label}</header>
        <AppContent
          app={activeApp}
          language={language}
          onDismissWelcome={onDismissWelcome}
          onOpenApp={onOpenApp}
          onResetWorkspace={onResetWorkspace}
          onSetLanguage={onSetLanguage}
        />
      </section>
      <footer className="rr-mobile-footer">
        <button onClick={() => onOpenApp("game")} type="button"><Gamepad2 aria-hidden="true" size={16} /> Game Tour</button>
        <button onClick={() => onOpenApp("resume")} type="button"><FileText aria-hidden="true" size={16} /> Resume</button>
        <button onClick={() => onOpenApp("settings")} type="button"><Settings2 aria-hidden="true" size={16} /> More</button>
      </footer>
    </main>
  );
}

export default function DesktopShell() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(createInitialWindows);
  const [activeApp, setActiveApp] = useState<AppId>("welcome");
  const [booting, setBooting] = useState(true);
  const [language, setLanguage] = useState<Language>("en");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const zIndex = useRef(40);
  const isCompact = useCompactLayout();

  const focusApp = useCallback((app: AppId) => {
    const nextZ = ++zIndex.current;
    setActiveApp(app);
    setWindows((current) => ({
      ...current,
      [app]: { ...current[app], zIndex: nextZ },
    }));
  }, []);

  const openApp = useCallback((app: AppId) => {
    const nextZ = ++zIndex.current;
    setActiveApp(app);
    setStartMenuOpen(false);
    setWindows((current) => ({
      ...current,
      [app]: { ...current[app], minimized: false, open: true, zIndex: nextZ },
    }));
  }, []);

  const closeApp = useCallback((app: AppId) => {
    const isActive = activeApp === app;
    const nextActive = isActive ? fallbackApp(windows, app) : activeApp;
    const nextZ = isActive ? ++zIndex.current : undefined;

    setWindows((current) => {
      const next = {
        ...current,
        [app]: { ...current[app], minimized: false, open: false },
      };

      if (isActive) {
        next[nextActive] = { ...next[nextActive], minimized: false, open: true, zIndex: nextZ ?? next[nextActive].zIndex };
      }

      return next;
    });

    if (isActive) setActiveApp(nextActive);
  }, [activeApp, windows]);

  const dismissWelcome = useCallback(() => {
    window.localStorage.setItem("rr-workstation-welcome-seen", "true");
    const nextZ = ++zIndex.current;
    setActiveApp("about");
    setWindows((current) => ({
      ...current,
      about: { ...current.about, minimized: false, open: true, zIndex: nextZ },
      welcome: { ...current.welcome, minimized: false, open: false },
    }));
  }, []);

  const minimizeApp = useCallback((app: AppId) => {
    const isActive = activeApp === app;
    const nextActive = isActive ? fallbackApp(windows, app) : activeApp;
    const nextZ = isActive ? ++zIndex.current : undefined;

    setWindows((current) => {
      const next = {
        ...current,
        [app]: { ...current[app], minimized: true },
      };

      if (isActive) {
        next[nextActive] = { ...next[nextActive], minimized: false, open: true, zIndex: nextZ ?? next[nextActive].zIndex };
      }

      return next;
    });

    if (isActive) setActiveApp(nextActive);
  }, [activeApp, windows]);

  const toggleMaximize = useCallback((app: AppId) => {
    setWindows((current) => {
      const target = current[app];
      if (target.maximized) {
        const restore = target.restore ?? definitionFor(app).defaultBounds;
        return {
          ...current,
          [app]: { ...target, ...restore, maximized: false, restore: undefined },
        };
      }

      return {
        ...current,
        [app]: {
          ...target,
          maximized: true,
          restore: { height: target.height, width: target.width, x: target.x, y: target.y },
        },
      };
    });
    focusApp(app);
  }, [focusApp]);

  const updateRect = useCallback((app: AppId, rect: WindowRect) => {
    setWindows((current) => ({
      ...current,
      [app]: { ...current[app], ...rect },
    }));
  }, []);

  const resetWorkspace = useCallback(() => {
    window.localStorage.removeItem("rr-workstation-welcome-seen");
    window.location.assign("/");
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const requested = url.searchParams.get("app") as AppId | null;
    const initialApp = requested && appIds.has(requested)
      ? requested
      : window.localStorage.getItem("rr-workstation-welcome-seen") === "true"
        ? "about"
        : "welcome";

    const initializeFrame = window.requestAnimationFrame(() => {
      setWindows((current) => {
        const next = { ...current };
        appDefinitions.forEach((app) => {
          next[app.id] = { ...next[app.id], open: app.id === initialApp, minimized: false };
        });
        return next;
      });
      setActiveApp(initialApp);
    });

    void (document.fonts?.ready ?? Promise.resolve()).finally(() => setBooting(false));
    return () => window.cancelAnimationFrame(initializeFrame);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "Escape") {
        event.preventDefault();
        setStartMenuOpen((open) => !open);
        return;
      }

      if (event.key === "Escape" && startMenuOpen) {
        setStartMenuOpen(false);
        return;
      }

      if (event.key === "Escape" && activeApp !== "welcome" && windows[activeApp].open) {
        closeApp(activeApp);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeApp, closeApp, startMenuOpen, windows]);

  const visibleApps = useMemo(() => appDefinitions.filter((app) => {
    const window = windows[app.id];
    return window.open && !window.minimized;
  }), [windows]);

  const taskbarApps = useMemo(() => appDefinitions.filter((app) => windows[app.id].open), [windows]);
  const menuApps = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return appDefinitions;
    return appDefinitions.filter((app) => `${app.label} ${appDescriptions[app.id]}`.toLowerCase().includes(query));
  }, [search]);

  const appContentProps = {
    language,
    onDismissWelcome: dismissWelcome,
    onOpenApp: openApp,
    onResetWorkspace: resetWorkspace,
    onSetLanguage: setLanguage,
  };

  if (isCompact) {
    return (
      <MobileWorkspace
        activeApp={activeApp}
        language={language}
        onDismissWelcome={dismissWelcome}
        onOpenApp={openApp}
        onResetWorkspace={resetWorkspace}
        onSetLanguage={setLanguage}
      />
    );
  }

  return (
    <main className="rr-workstation">
      <a className="rr-skip-link" href="#rr-active-window">Skip to active portfolio window</a>
      {booting && (
        <div className="rr-boot-screen" role="status">
          <div className="rr-boot-mark">RR</div>
          <p>Loading the workstation…</p>
        </div>
      )}
      <section className="rr-desktop-surface" aria-label="RR Workstation desktop">
        <div className="rr-wallpaper" aria-hidden="true">
          <div className="rr-wallpaper-copy">
            <span>RAHUL RATHNAVEL</span>
            <strong>BUILD / TEST / LEARN</strong>
            <small>APPLIED AI · PRODUCT SYSTEMS · OPEN SOURCE</small>
          </div>
          <span className="rr-orbit rr-orbit-a" />
          <span className="rr-orbit rr-orbit-b" />
          <span className="rr-route-line rr-route-line-a" />
          <span className="rr-route-line rr-route-line-b" />
        </div>

        <header className="rr-desktop-header">
          <button className="rr-header-mark" onClick={() => openApp("welcome")} type="button">RR</button>
          <div className="rr-header-breadcrumb">RAHUL_OS <span>/</span> PORTFOLIO WORKSTATION</div>
          <div className="rr-header-actions">
            <button onClick={() => openApp("resume")} type="button"><FileText aria-hidden="true" size={14} /> Resume</button>
            <button onClick={() => openApp("contact")} type="button"><Mail aria-hidden="true" size={14} /> Contact</button>
            <button aria-label="Toggle Tamil language" onClick={() => setLanguage((value) => value === "en" ? "ta" : "en")} type="button">{language === "en" ? "த" : "EN"}</button>
          </div>
        </header>

        <div className="rr-desktop-icons" aria-label="Portfolio applications">
          {appDefinitions.filter((app) => app.desktop).map((app) => {
            const Icon = app.icon;
            return (
              <button className="rr-desktop-icon" key={app.id} onClick={() => openApp(app.id)} type="button">
                <span><Icon aria-hidden="true" size={26} strokeWidth={1.75} /></span>
                <strong>{app.label}</strong>
              </button>
            );
          })}
        </div>

        {visibleApps.map((app) => (
          <WindowChrome
            active={activeApp === app.id}
            app={app}
            key={app.id}
            onClose={() => app.id === "welcome" ? dismissWelcome() : closeApp(app.id)}
            onFocus={() => focusApp(app.id)}
            onMaximize={() => toggleMaximize(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onRectChange={(rect) => updateRect(app.id, rect)}
            state={windows[app.id]}
          >
            <div id={activeApp === app.id ? "rr-active-window" : undefined}>
              <AppContent app={app.id} {...appContentProps} />
            </div>
          </WindowChrome>
        ))}

        {startMenuOpen && (
          <aside aria-label="Start menu" className="rr-start-menu">
            <div className="rr-start-menu-head">
              <div><span>RR</span><strong>Start</strong></div>
              <button aria-label="Close start menu" onClick={() => setStartMenuOpen(false)} type="button"><X aria-hidden="true" size={16} /></button>
            </div>
            <label className="rr-start-search">
              <Search aria-hidden="true" size={15} />
              <span className="sr-only">Find an app</span>
              <input autoFocus onChange={(event) => setSearch(event.target.value)} placeholder="Find work, proof, resume…" value={search} />
            </label>
            <div className="rr-start-apps">
              {menuApps.map((app) => {
                const Icon = app.icon;
                return (
                  <button key={app.id} onClick={() => openApp(app.id)} type="button">
                    <Icon aria-hidden="true" size={18} />
                    <span><strong>{app.shortLabel}</strong><small>{appDescriptions[app.id]}</small></span>
                  </button>
                );
              })}
            </div>
            <footer>Shift + Esc toggles this launcher.</footer>
          </aside>
        )}
      </section>

      <footer className="rr-taskbar">
        <button aria-expanded={startMenuOpen} aria-label="Open start menu" className="rr-start-button" onClick={() => setStartMenuOpen((open) => !open)} type="button">
          <Menu aria-hidden="true" size={17} /> <span>Start</span>
        </button>
        <div className="rr-taskbar-apps" aria-label="Open portfolio windows">
          {taskbarApps.map((app) => {
            const Icon = app.icon;
            const state = windows[app.id];
            return (
              <button
                aria-pressed={activeApp === app.id && !state.minimized}
                className={activeApp === app.id && !state.minimized ? "is-current" : ""}
                key={app.id}
                onClick={() => state.minimized ? openApp(app.id) : focusApp(app.id)}
                type="button"
              >
                <Icon aria-hidden="true" size={15} /> {app.shortLabel}
              </button>
            );
          })}
        </div>
        <div className="rr-taskbar-status"><CircleHelp aria-hidden="true" size={15} /> <span>Need the short path? Open Start Here.</span></div>
      </footer>
    </main>
  );
}
