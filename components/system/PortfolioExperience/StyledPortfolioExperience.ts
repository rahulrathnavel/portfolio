import styled, { createGlobalStyle, keyframes } from "styled-components";

const floatIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgb(101 220 255 / 0%); }
  45% { box-shadow: 0 0 0 8px rgb(101 220 255 / 12%); }
`;

const scrambleAway = keyframes`
  0% { opacity: 0; transform: translate(0, 0) rotate(0deg); }
  16% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--bug-x), var(--bug-y)) rotate(130deg); }
`;

const coffeeShake = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  20% { transform: translate3d(-3px, 2px, 0); }
  40% { transform: translate3d(3px, -1px, 0); }
  60% { transform: translate3d(-2px, -2px, 0); }
  80% { transform: translate3d(2px, 1px, 0); }
`;

export const PortfolioGlobalStyle = createGlobalStyle`
  :root {
    --portfolio-accent: #65dcff;
  }

  :root[data-portfolio-accent="amber"] { --portfolio-accent: #ffc569; }
  :root[data-portfolio-accent="violet"] { --portfolio-accent: #c3a6ff; }

  :root[data-portfolio-icon-size="small"] main > ol { zoom: 0.88; }
  :root[data-portfolio-icon-size="large"] main > ol { zoom: 1.12; }

  body.portfolio-coffee-shake main {
    animation: ${coffeeShake} 420ms ease-in-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    body.portfolio-coffee-shake main { animation: none; }
  }

  :root[data-portfolio-dark="off"] main {
    filter: brightness(1.13) saturate(0.9);
  }

  :root[data-portfolio-theme="hacker"] main > ol figure figcaption {
    color: #bdffbe;
    text-shadow: 0 0 7px rgb(96 255 126 / 74%);
  }

  :root[data-portfolio-theme="cyberpunk"] main > ol figure figcaption {
    color: #e8dcff;
    text-shadow: 1px 0 #ff5bca, -1px 0 #50e5ff;
  }

  :root[data-portfolio-theme="minimal"] main > ol figure figcaption {
    text-shadow: none;
  }

  :root[data-portfolio-animations="off"] *,
  :root[data-portfolio-animations="off"] *::before,
  :root[data-portfolio-animations="off"] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

`;

export const StyledPortfolioExperience = styled.div`
  color: #eff9ff;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  inset: 0;
  pointer-events: none;
  position: fixed;
  z-index: 2147483640;
`;

export const DisplayFilm = styled.div<{ $theme: string }>`
  background: ${({ $theme }) => {
    if ($theme === "win98") {
      return "linear-gradient(135deg, rgb(36 68 118 / 13%), rgb(204 204 204 / 5%))";
    }
    if ($theme === "windows-xp") {
      return "linear-gradient(135deg, rgb(25 100 207 / 14%), rgb(68 192 67 / 8%))";
    }
    if ($theme === "ubuntu") {
      return "linear-gradient(135deg, rgb(113 28 28 / 18%), rgb(226 94 42 / 7%))";
    }
    if ($theme === "macos") {
      return "linear-gradient(135deg, rgb(155 204 246 / 13%), rgb(255 215 231 / 7%))";
    }
    if ($theme === "hacker") {
      return "linear-gradient(135deg, rgb(0 44 22 / 28%), transparent 58%)";
    }
    if ($theme === "cyberpunk") {
      return "linear-gradient(135deg, rgb(68 9 98 / 23%), rgb(0 125 170 / 10%))";
    }
    if ($theme === "minimal") {
      return "rgb(3 10 17 / 7%)";
    }
    return "transparent";
  }};
  inset: 0;
  mix-blend-mode: screen;
  position: absolute;
`;

export const CRTFilm = styled.div`
  background-image: repeating-linear-gradient(
    to bottom,
    rgb(0 0 0 / 22%) 0,
    rgb(0 0 0 / 22%) 1px,
    transparent 1px,
    transparent 4px
  );
  inset: 0;
  opacity: 42%;
  position: absolute;
`;

export const ToastStack = styled.div`
  bottom: 46px;
  display: grid;
  gap: 9px;
  max-width: min(330px, calc(100vw - 34px));
  pointer-events: auto;
  position: fixed;
  right: 16px;
`;

export const Toast = styled.button<{
  $tone?: "achievement" | "success" | "warning";
}>`
  /* stylelint-disable rule-empty-line-before */
  animation: ${floatIn} 210ms ease-out both;
  background: rgb(7 22 35 / 95%);
  border: 1px solid
    ${({ $tone }) =>
      $tone === "success"
        ? "rgb(129 240 173 / 62%)"
        : $tone === "warning"
          ? "rgb(255 205 120 / 62%)"
          : "rgb(126 220 255 / 43%)"};
  border-radius: 7px;
  box-shadow: 0 16px 34px rgb(0 0 0 / 27%);
  color: #f6fbff;
  cursor: pointer;
  font: inherit;
  padding: 12px 13px;
  text-align: left;

  &:focus-visible {
    outline: 2px solid var(--portfolio-accent);
    outline-offset: 3px;
  }

  strong,
  span {
    display: block;
  }
  strong {
    color: var(--portfolio-accent);
    font-size: 10px;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }
  span {
    font-family: system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.45;
    margin-top: 4px;
  }
  /* stylelint-enable rule-empty-line-before */
`;

export const Pet = styled.div<{ $wave: boolean; $x: number; $y: number }>`
  background: linear-gradient(150deg, #1c344d, #0b1929);
  border: 1px solid rgb(167 226 255 / 61%);
  border-radius: 8px 8px 10px 10px;
  box-shadow: 0 10px 20px rgb(0 0 0 / 28%);
  color: #dff8ff;
  display: grid;
  font-size: 11px;
  height: 25px;
  left: ${({ $x }) => `${$x}px`};
  letter-spacing: -0.13em;
  place-items: center;
  position: fixed;
  top: ${({ $y }) => `${$y}px`};
  transition:
    left 1.6s cubic-bezier(0.22, 1, 0.36, 1),
    top 1.6s cubic-bezier(0.22, 1, 0.36, 1);
  width: 31px;
  z-index: 1;

  &::before {
    background: #91e8ff;
    border-radius: 50%;
    box-shadow: 9px 0 #91e8ff;
    content: "";
    height: 3px;
    left: 8px;
    position: absolute;
    top: 9px;
    width: 3px;
  }

  &::after {
    animation: ${pulse} 600ms ease-out 2;
    animation-play-state: ${({ $wave }) => ($wave ? "running" : "paused")};
    border: 1px solid rgb(133 235 255 / 46%);
    border-radius: 4px;
    content: "";
    inset: -4px;
    position: absolute;
  }

  @media (width <= 640px) {
    display: none;
  }
`;

export const BugSwarm = styled.div`
  inset: 0;
  overflow: hidden;
  position: fixed;

  span {
    animation: ${scrambleAway} 940ms cubic-bezier(0.2, 0.8, 0.3, 1) both;
    background: #ffd66e;
    border-radius: 2px;
    box-shadow: 0 0 0 2px rgb(20 34 50 / 68%);
    height: 8px;
    left: calc(50% + var(--bug-left));
    position: absolute;
    top: calc(50% + var(--bug-top));
    width: 10px;
  }
`;

export const InvincibleFrame = styled.div`
  border: 2px solid rgb(135 228 255 / 76%);
  box-shadow:
    inset 0 0 70px rgb(81 200 255 / 16%),
    0 0 34px rgb(79 193 255 / 18%);
  inset: 8px;
  position: fixed;
`;

export const BSOD = styled.section`
  /* stylelint-disable rule-empty-line-before */
  align-content: center;
  background: #071ec4;
  color: #fff;
  display: grid;
  font-family: "Cascadia Code", Consolas, monospace;
  inset: 0;
  padding: clamp(28px, 8vw, 12vh) clamp(22px, 14vw, 18vw);
  pointer-events: auto;
  position: fixed;
  z-index: 2147483647;

  h1 {
    font-size: clamp(30px, 5vw, 54px);
    font-weight: 500;
    letter-spacing: -0.06em;
    margin: 0 0 28px;
  }
  p {
    font-size: clamp(13px, 1.7vw, 18px);
    line-height: 1.65;
    margin: 0;
    max-width: 780px;
  }
  code {
    display: block;
    font-size: 11px;
    margin-top: 35px;
    opacity: 85%;
  }
  button {
    background: transparent;
    border: 1px solid rgb(255 255 255 / 62%);
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 11px;
    justify-self: start;
    margin-top: 34px;
    padding: 8px 10px;
  }
  button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
  /* stylelint-enable rule-empty-line-before */
`;

export const Shutdown = styled.section`
  /* stylelint-disable rule-empty-line-before */
  align-content: center;
  background: #02050a;
  color: #b7d6e8;
  display: grid;
  inset: 0;
  justify-items: center;
  pointer-events: auto;
  position: fixed;
  text-align: center;
  z-index: 2147483647;

  p {
    font-family: "Cascadia Code", Consolas, monospace;
    font-size: 13px;
    letter-spacing: 0.08em;
  }
  button {
    background: transparent;
    border: 1px solid rgb(183 214 232 / 42%);
    color: #e8f7ff;
    cursor: pointer;
    font: inherit;
    font-size: 11px;
    padding: 8px 12px;
  }
  /* stylelint-enable rule-empty-line-before */
`;
