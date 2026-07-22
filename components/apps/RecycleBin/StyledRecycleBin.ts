import styled from "styled-components";

const StyledRecycleBin = styled.main`
  /* The app's BEM-like names stay local to this styled component. */
  /* stylelint-disable selector-class-pattern */
  --bin-accent: #e56a3f;
  --bin-border: rgb(221 229 237 / 18%);
  --bin-canvas: #10202d;
  --bin-copy: #dbe6ee;
  --bin-muted: #98a8b5;
  --bin-panel: #142a3a;

  background:
    radial-gradient(circle at 82% 0%, rgb(229 106 63 / 15%), transparent 34%),
    linear-gradient(135deg, #0d1c29, var(--bin-canvas));
  color: var(--bin-copy);
  display: flex;
  flex-direction: column;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  height: 100%;
  min-height: 0;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  button {
    font: inherit;
  }

  button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  .recycle-bin__header {
    align-items: center;
    background: rgb(6 18 28 / 52%);
    border-bottom: 1px solid var(--bin-border);
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    padding: clamp(0.8rem, 2.5vw, 1.3rem) clamp(0.9rem, 3vw, 1.75rem);
  }

  .recycle-bin__eyebrow {
    color: var(--bin-accent);
    font-size: clamp(0.56rem, 1.4vw, 0.67rem);
    font-weight: 800;
    letter-spacing: 0.12em;
    margin: 0 0 0.25rem;
    text-transform: uppercase;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    color: #f6f9fc;
    font-size: clamp(1.05rem, 3vw, 1.45rem);
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .recycle-bin__empty-button,
  .recycle-bin__primary-action,
  .recycle-bin__secondary-action,
  .recycle-bin__dialog-close {
    border-radius: 0.35rem;
    cursor: pointer;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  .recycle-bin__empty-button {
    background: transparent;
    border: 1px solid rgb(229 106 63 / 70%);
    color: #ffc8b2;
    font-size: clamp(0.62rem, 1.6vw, 0.74rem);
    font-weight: 700;
    padding: 0.55rem 0.72rem;
  }

  .recycle-bin__empty-button:disabled {
    border-color: rgb(152 168 181 / 35%);
    color: rgb(152 168 181 / 70%);
    cursor: default;
  }

  .recycle-bin__empty-button:hover:not(:disabled) {
    background: var(--bin-accent);
    color: #18110e;
    transform: translateY(-1px);
  }

  .recycle-bin__content {
    display: grid;
    gap: clamp(1rem, 3vw, 1.75rem);
    margin: auto;
    max-width: 46rem;
    overflow: auto;
    padding: clamp(1.1rem, 4vw, 2.5rem);
    width: 100%;
  }

  .recycle-bin__summary {
    align-items: flex-start;
    display: flex;
    gap: 0.85rem;
  }

  .recycle-bin__summary-mark {
    background: var(--bin-accent);
    border-radius: 0.2rem;
    box-shadow: 0 0 0 0.35rem rgb(229 106 63 / 12%);
    display: block;
    flex: 0 0 auto;
    height: 0.65rem;
    margin: 0.35rem 0 0 0.35rem;
    transform: rotate(45deg);
    width: 0.65rem;
  }

  .recycle-bin__summary h2,
  .recycle-bin__dialog h2 {
    color: #f4f8fa;
    font-size: clamp(0.9rem, 2.3vw, 1.12rem);
    letter-spacing: -0.035em;
    line-height: 1.25;
  }

  .recycle-bin__summary p,
  .recycle-bin__dialog p {
    color: var(--bin-muted);
    font-family: system-ui, sans-serif;
    font-size: clamp(0.76rem, 1.8vw, 0.9rem);
    line-height: 1.55;
    margin-top: 0.35rem;
  }

  .recycle-bin__file-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .recycle-bin__file {
    align-items: center;
    background: rgb(20 42 58 / 76%);
    border: 1px solid var(--bin-border);
    border-radius: 0.5rem;
    color: inherit;
    cursor: pointer;
    display: flex;
    gap: 0.85rem;
    padding: 0.8rem;
    text-align: left;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      transform 160ms ease;
    width: 100%;
  }

  .recycle-bin__file:hover {
    background: rgb(35 60 78 / 92%);
    border-color: rgb(229 106 63 / 72%);
    transform: translateY(-1px);
  }

  .recycle-bin__file-icon {
    align-items: center;
    background: #e7edf0;
    border-radius: 0.16rem;
    color: #1c3442;
    display: inline-flex;
    flex: 0 0 auto;
    font-size: 0.58rem;
    font-weight: 900;
    height: 2.15rem;
    justify-content: center;
    letter-spacing: -0.08em;
    position: relative;
    width: 1.75rem;
  }

  .recycle-bin__file-icon::after {
    border-color: transparent #bfcbd1 transparent transparent;
    border-style: solid;
    border-width: 0 0.4rem 0.4rem 0;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
  }

  .recycle-bin__file-details {
    display: grid;
    gap: 0.23rem;
    min-width: 0;
  }

  .recycle-bin__file-details strong {
    color: #f5fbff;
    font-size: clamp(0.76rem, 2vw, 0.9rem);
    overflow-wrap: anywhere;
  }

  .recycle-bin__file-details span {
    color: var(--bin-muted);
    font-size: clamp(0.58rem, 1.5vw, 0.67rem);
    overflow-wrap: anywhere;
  }

  .recycle-bin__status {
    border-top: 1px solid var(--bin-border);
    color: #aab9c3;
    font-family: system-ui, sans-serif;
    font-size: clamp(0.7rem, 1.75vw, 0.82rem);
    line-height: 1.5;
    padding-top: 0.85rem;
  }

  .recycle-bin__dialog-backdrop {
    align-items: center;
    background: rgb(2 10 16 / 73%);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 1rem;
    position: absolute;
    z-index: 4;
  }

  .recycle-bin__dialog {
    animation: recycle-bin-dialog-in 180ms ease-out;
    background: #f4f0e9;
    border: 1px solid rgb(255 255 255 / 75%);
    border-radius: 0.55rem;
    box-shadow: 0 1.4rem 4rem rgb(0 0 0 / 42%);
    color: #152c3a;
    max-width: 30rem;
    padding: 1rem;
    width: min(100%, 30rem);
  }

  .recycle-bin__dialog-topline {
    align-items: center;
    color: #5a6e79;
    display: flex;
    font-size: 0.62rem;
    font-weight: 800;
    justify-content: space-between;
    letter-spacing: 0.1em;
    margin: -0.1rem 0 1.2rem;
    text-transform: uppercase;
  }

  .recycle-bin__dialog-close {
    background: transparent;
    border: 0;
    color: #38505e;
    font-size: 1.25rem;
    height: 1.5rem;
    line-height: 1;
    padding: 0;
    width: 1.5rem;
  }

  .recycle-bin__dialog-close:hover {
    background: rgb(21 44 58 / 8%);
  }

  .recycle-bin__dialog h2 {
    color: #142a37;
  }

  .recycle-bin__dialog p {
    color: #425764;
  }

  .recycle-bin__dialog-response {
    color: var(--bin-accent) !important;
    font-family:
      "Cascadia Code", SFMono-Regular, Consolas, monospace !important;
    font-size: 0.7rem !important;
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  .recycle-bin__dialog-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.15rem;
  }

  .recycle-bin__primary-action,
  .recycle-bin__secondary-action {
    font-size: clamp(0.66rem, 1.65vw, 0.75rem);
    font-weight: 800;
    padding: 0.55rem 0.75rem;
  }

  .recycle-bin__primary-action {
    background: #193c4d;
    border: 1px solid #193c4d;
    color: #f8fbfc;
  }

  .recycle-bin__primary-action:hover {
    background: var(--bin-accent);
    border-color: var(--bin-accent);
    color: #1b120e;
  }

  .recycle-bin__secondary-action {
    background: transparent;
    border: 1px solid rgb(21 44 58 / 35%);
    color: #294754;
  }

  .recycle-bin__secondary-action:hover {
    background: rgb(21 44 58 / 8%);
  }

  @keyframes recycle-bin-dialog-in {
    from {
      opacity: 0%;
      transform: translateY(0.4rem) scale(0.985);
    }

    to {
      opacity: 100%;
      transform: translateY(0) scale(1);
    }
  }

  @media (width <= 420px) {
    .recycle-bin__header {
      align-items: flex-start;
      flex-direction: column;
    }

    .recycle-bin__empty-button {
      width: 100%;
    }

    .recycle-bin__dialog-actions {
      flex-direction: column;
    }

    .recycle-bin__primary-action,
    .recycle-bin__secondary-action {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .recycle-bin__dialog,
    .recycle-bin__empty-button,
    .recycle-bin__file,
    .recycle-bin__primary-action,
    .recycle-bin__secondary-action,
    .recycle-bin__dialog-close {
      animation: none;
      transition: none;
    }
  }
  /* stylelint-enable selector-class-pattern */
`;

export default StyledRecycleBin;
