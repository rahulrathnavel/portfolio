import styled, { keyframes } from "styled-components";

const drift = keyframes`
  from {
    transform: translateY(-18%);
  }

  to {
    transform: translateY(18%);
  }
`;

const StyledRahulTerminal = styled.main`
  background:
    radial-gradient(circle at 78% 0%, rgb(58 195 132 / 11%), transparent 34%),
    #07100f;
  color: #d9fbe7;
  display: flex;
  flex-direction: column;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  position: relative;

  * {
    box-sizing: border-box;
  }

  .terminal-matrix {
    display: grid;
    gap: 0.45rem;
    grid-template-columns: repeat(18, 1fr);
    inset: 0;
    opacity: 18%;
    overflow: hidden;
    padding: 0 0.4rem;
    pointer-events: none;
    position: absolute;
  }

  .terminal-matrix-column {
    animation: ${drift} 5.8s linear infinite alternate;
    color: #4dff9f;
    font-size: clamp(0.64rem, 1.2vw, 0.82rem);
    line-height: 1.35;
    text-align: center;
    text-shadow: 0 0 0.45rem rgb(77 255 159 / 80%);
    white-space: pre-wrap;
  }

  .terminal-matrix-column:nth-child(3n) {
    animation-duration: 7.2s;
  }

  .terminal-matrix-column:nth-child(4n) {
    animation-duration: 4.7s;
  }

  .terminal-header,
  .terminal-footer,
  .terminal-body {
    position: relative;
    z-index: 1;
  }

  .terminal-header {
    align-items: center;
    background: rgb(12 26 23 / 88%);
    border-bottom: 1px solid rgb(137 255 188 / 20%);
    display: flex;
    gap: 0.55rem;
    min-height: 2.45rem;
    padding: 0.55rem 0.85rem;
  }

  .terminal-led {
    background: #54ef9a;
    border-radius: 50%;
    box-shadow: 0 0 0.55rem #54ef9a;
    height: 0.48rem;
    width: 0.48rem;
  }

  .terminal-title {
    color: #f2fff6;
    font-size: clamp(0.68rem, 1.5vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.075em;
    text-transform: uppercase;
  }

  .terminal-status {
    color: #86a99a;
    font-size: clamp(0.57rem, 1.2vw, 0.68rem);
    margin-left: auto;
  }

  .terminal-body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: clamp(0.75rem, 2vw, 1.15rem);
    scrollbar-color: #316a50 transparent;
  }

  .terminal-line {
    font-size: clamp(0.72rem, 1.55vw, 0.88rem);
    line-height: 1.58;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  .terminal-line + .terminal-line {
    margin-top: 0.2rem;
  }

  .terminal-line-input {
    color: #fcffc9;
    margin-top: 0.75rem;
  }

  .terminal-line-output {
    color: #d9fbe7;
  }

  .terminal-line-success {
    color: #75ffae;
  }

  .terminal-line-warning {
    color: #ffd680;
  }

  .terminal-prompt {
    color: #64f6a5;
  }

  .terminal-command {
    color: #f7ffe4;
  }

  .terminal-form {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .terminal-input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgb(132 255 183 / 34%);
    border-radius: 0;
    color: #f6fff8;
    flex: 1;
    font: inherit;
    font-size: clamp(0.72rem, 1.55vw, 0.88rem);
    min-width: 0;
    padding: 0.3rem 0.1rem;
  }

  .terminal-input::placeholder {
    color: #719082;
  }

  .terminal-input:focus-visible {
    border-bottom-color: #75ffae;
    outline: 0;
  }

  .terminal-run {
    background: #54ef9a;
    border: 1px solid #74ffaf;
    border-radius: 0.3rem;
    color: #062014;
    cursor: pointer;
    font: inherit;
    font-size: clamp(0.63rem, 1.25vw, 0.72rem);
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 0.35rem 0.56rem;
    text-transform: uppercase;
  }

  .terminal-run:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .terminal-footer {
    border-top: 1px solid rgb(137 255 188 / 17%);
    color: #779a89;
    display: flex;
    font-size: clamp(0.55rem, 1.15vw, 0.65rem);
    gap: 0.8rem;
    justify-content: space-between;
    padding: 0.45rem 0.85rem;
  }

  @media (width <= 420px) {
    .terminal-header {
      min-height: 2.2rem;
      padding-inline: 0.65rem;
    }

    .terminal-status {
      display: none;
    }

    .terminal-footer span:last-child {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-matrix-column {
      animation: none;
    }
  }
`;

export default StyledRahulTerminal;
