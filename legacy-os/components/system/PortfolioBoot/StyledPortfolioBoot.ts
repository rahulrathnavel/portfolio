import styled, { keyframes } from "styled-components";

const bootGlow = keyframes`
  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 1;
  }
`;

const lineIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scan = keyframes`
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(100%);
  }
`;

export const StyledPortfolioBoot = styled.section<{ $reducedMotion: boolean }>`
  background:
    radial-gradient(circle at 50% 48%, rgb(19 56 87 / 58%), transparent 43%),
    linear-gradient(145deg, #03070d 0%, #071625 48%, #02060b 100%);
  color: #dff5ff;
  display: grid;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  inset: 0;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(18px, 5vw, 72px);
  place-items: center;
  position: fixed;
  z-index: 2147483647;

  &::before {
    background-image:
      linear-gradient(rgb(110 194 255 / 7%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(110 194 255 / 7%) 1px, transparent 1px);
    background-size: 26px 26px;
    content: "";
    inset: 0;
    mask-image: radial-gradient(circle at center, #000, transparent 76%);
    pointer-events: none;
    position: absolute;
    z-index: -2;
  }

  &::after {
    animation: ${scan} 7s linear infinite;
    animation-play-state: ${({ $reducedMotion }) =>
      $reducedMotion ? "paused" : "running"};
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgb(118 220 255 / 7%) 47%,
      transparent 54%
    );
    content: "";
    height: 34%;
    inset-inline: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  button {
    appearance: none;
    background: transparent;
    border: 1px solid rgb(182 231 255 / 36%);
    border-radius: 4px;
    color: #dff5ff;
    cursor: pointer;
    font: inherit;
    font-size: 11px;
    letter-spacing: 0.04em;
    padding: 9px 12px;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease,
      transform 160ms ease;

    &:focus-visible {
      outline: 2px solid #7cddff;
      outline-offset: 3px;
    }

    &:hover {
      background-color: rgb(124 221 255 / 12%);
      border-color: #7cddff;
      color: #fff;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::after,
    *::before {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export const BootCard = styled.div<{ $reducedMotion: boolean }>`
  animation: ${bootGlow} 2.4s ease-in-out infinite;
  animation-play-state: ${({ $reducedMotion }) =>
    $reducedMotion ? "paused" : "running"};
  background: linear-gradient(135deg, rgb(5 19 31 / 92%), rgb(7 26 41 / 82%));
  border: 1px solid rgb(124 221 255 / 28%);
  box-shadow:
    0 28px 90px rgb(0 0 0 / 42%),
    inset 0 1px 0 rgb(220 249 255 / 8%);
  max-width: 620px;
  min-height: 326px;
  overflow: hidden;
  padding: clamp(24px, 5vw, 48px);
  position: relative;
  width: min(100%, 620px);

  &::before {
    border: 1px solid rgb(124 221 255 / 16%);
    content: "";
    inset: 9px;
    pointer-events: none;
    position: absolute;
  }
`;

export const BootHeader = styled.header`
  align-items: center;
  color: #7cddff;
  display: flex;
  font-size: 11px;
  font-weight: 700;
  justify-content: space-between;
  letter-spacing: 0.14em;
  position: relative;
  text-transform: uppercase;

  span:last-child {
    color: rgb(223 245 255 / 52%);
    font-weight: 500;
  }
`;

export const BootLog = styled.div`
  display: grid;
  gap: 10px;
  margin-top: clamp(38px, 7vw, 66px);
  min-height: 157px;
  position: relative;
`;

export const BootLine = styled.p<{
  $accent?: "success" | "warning";
  $visible: boolean;
}>`
  animation: ${lineIn} 160ms ease-out both;
  color: ${({ $accent }) => {
    if ($accent === "success") return "#9cf2b5";
    if ($accent === "warning") return "#ffd28a";

    return "#dff5ff";
  }};
  font-size: clamp(14px, 2.4vw, 18px);
  line-height: 1.25;
  margin: 0;
  opacity: ${({ $visible }) => ($visible ? "100%" : "0%")};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(5px)"};

  &::before {
    color: rgb(124 221 255 / 62%);
    content: "> ";
  }
`;

export const ProgressTrack = styled.div`
  background-color: rgb(223 245 255 / 11%);
  height: 2px;
  margin-top: 23px;
  overflow: hidden;
  position: relative;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  background: linear-gradient(90deg, #56b8ff, #9cf2b5);
  height: 100%;
  transition: width 180ms ease;
  width: ${({ $progress }) => `${$progress}%`};
`;

export const BootFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
  position: relative;

  p {
    color: rgb(223 245 255 / 50%);
    font-size: 10px;
    line-height: 1.5;
    margin: 0;
  }
`;

export const BiosCard = styled(BootCard)`
  min-height: 360px;
`;

export const BiosTitle = styled.h1`
  color: #fff;
  font-size: clamp(22px, 5vw, 34px);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: clamp(43px, 7vw, 65px) 0 28px;
  position: relative;
`;

export const BiosSpecs = styled.dl`
  border-block: 1px solid rgb(124 221 255 / 18%);
  display: grid;
  gap: 0;
  margin: 0;
  padding-block: 9px;
  position: relative;

  div {
    align-items: baseline;
    display: grid;
    gap: 12px;
    grid-template-columns: minmax(68px, 92px) 1fr;
    padding-block: 7px;
  }

  dt {
    color: #7cddff;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  dd {
    color: #e9f8ff;
    font-size: clamp(12px, 2.25vw, 15px);
    margin: 0;
  }
`;

export const BiosFooter = styled(BootFooter)`
  margin-top: 24px;

  p {
    color: #9cf2b5;
    font-size: 11px;
  }

  @media (width <= 430px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
`;

export const SetupCard = styled(BootCard)`
  min-height: 355px;
`;

export const SetupTitle = styled.h1`
  color: #fff;
  font-size: clamp(20px, 5vw, 30px);
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1;
  margin: clamp(43px, 7vw, 65px) 0 10px;
  position: relative;
`;

export const SetupDescription = styled.p`
  color: rgb(223 245 255 / 67%);
  font-size: 12px;
  line-height: 1.55;
  margin: 0 0 24px;
  max-width: 440px;
  position: relative;
`;

export const ToggleList = styled.div`
  border-block: 1px solid rgb(124 221 255 / 18%);
  display: grid;
  position: relative;

  label {
    align-items: center;
    color: #e9f8ff;
    cursor: pointer;
    display: flex;
    font-size: 12px;
    gap: 10px;
    justify-content: space-between;
    padding-block: 12px;
  }

  label + label {
    border-top: 1px solid rgb(124 221 255 / 12%);
  }

  input {
    accent-color: #7cddff;
    block-size: 15px;
    cursor: pointer;
    inline-size: 15px;
    margin: 0;
  }
`;

export const SetupActions = styled.footer`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 23px;
  position: relative;

  button:first-child {
    background: #7cddff;
    border-color: #7cddff;
    color: #06121c;
    font-weight: 700;

    &:hover {
      background: #b3ecff;
      color: #041018;
    }
  }
`;

export default StyledPortfolioBoot;
