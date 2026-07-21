export type AppId =
  | "welcome"
  | "about"
  | "work"
  | "proof"
  | "resume"
  | "contact"
  | "game"
  | "settings";

export type Language = "en" | "ta";

export type WindowRect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type WindowState = WindowRect & {
  maximized: boolean;
  minimized: boolean;
  open: boolean;
  restore?: WindowRect;
  zIndex: number;
};
