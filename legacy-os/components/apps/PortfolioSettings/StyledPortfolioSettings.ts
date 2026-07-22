import styled from "styled-components";

const StyledPortfolioSettings = styled.main`
  background: linear-gradient(145deg, #0b1723, #0d2130 65%, #09131d);
  color: #ebf7ff;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  height: 100%;
  overflow: auto;
  padding: clamp(16px, 3vw, 24px);

  /* stylelint-disable rule-empty-line-before, selector-class-pattern */

  * {
    box-sizing: border-box;
  }

  .settings__header {
    border-bottom: 1px solid rgb(164 225 255 / 18%);
    display: flex;
    gap: 16px;
    justify-content: space-between;
    padding-bottom: 16px;
  }

  .settings__eyebrow {
    color: var(--portfolio-accent, #75dfff);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    margin: 0 0 7px;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(19px, 3.4vw, 25px);
    letter-spacing: -0.05em;
    line-height: 1;
    margin: 0;
  }

  .settings__header button,
  .settings__section button {
    background: transparent;
    border: 1px solid rgb(193 234 255 / 28%);
    border-radius: 5px;
    color: #dff5ff;
    cursor: pointer;
    font: inherit;
    font-size: 11px;
    padding: 8px 10px;
  }

  button:hover {
    border-color: var(--portfolio-accent, #75dfff);
  }
  button:focus-visible {
    outline: 2px solid var(--portfolio-accent, #75dfff);
    outline-offset: 3px;
  }

  .settings__sections {
    display: grid;
    gap: 20px;
    margin-top: 20px;
  }

  .settings__section {
    display: grid;
    gap: 9px;
  }
  .settings__section > h2 {
    color: #f4fbff;
    font-size: 12px;
    letter-spacing: 0.05em;
    margin: 0;
    text-transform: uppercase;
  }
  .settings__section > p {
    color: #a7c2d2;
    font-family: system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.45;
    margin: -2px 0 2px;
  }

  .settings__grid {
    display: grid;
    gap: 7px;
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
  }

  .settings__choice {
    min-height: 37px;
    text-align: left;
  }

  .settings__choice[data-active="true"] {
    background: rgb(101 220 255 / 12%);
    border-color: var(--portfolio-accent, #75dfff);
    color: #fff;
  }

  .settings__setting {
    align-items: center;
    border: 1px solid rgb(193 234 255 / 13%);
    border-radius: 6px;
    display: flex;
    gap: 13px;
    justify-content: space-between;
    padding: 10px 11px;
  }

  .settings__setting div {
    min-width: 0;
  }
  .settings__setting strong {
    display: block;
    font-size: 12px;
  }
  .settings__setting span {
    color: #98b6c6;
    display: block;
    font-family: system-ui, sans-serif;
    font-size: 11px;
    line-height: 1.35;
    margin-top: 3px;
  }

  .settings__toggle {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    gap: 7px;
  }

  .settings__toggle input {
    accent-color: var(--portfolio-accent, #75dfff);
    cursor: pointer;
    height: 16px;
    margin: 0;
    width: 16px;
  }
  .settings__toggle label {
    cursor: pointer;
    font-size: 10px;
  }

  .settings__footer {
    border-top: 1px solid rgb(164 225 255 / 18%);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
  }
  .settings__footer p {
    color: #87a4b3;
    font-family: system-ui, sans-serif;
    font-size: 11px;
    margin: 0;
  }
  .settings__footer button:last-child {
    border-color: rgb(255 154 133 / 56%);
    color: #ffd6ca;
  }
  /* stylelint-enable rule-empty-line-before, selector-class-pattern */
`;

export default StyledPortfolioSettings;
