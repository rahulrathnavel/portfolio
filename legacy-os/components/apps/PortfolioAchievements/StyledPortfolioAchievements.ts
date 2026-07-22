import styled from "styled-components";

const StyledPortfolioAchievements = styled.main`
  background: linear-gradient(145deg, #0b1723, #10263a 68%, #08131e);
  color: #edf9ff;
  font-family:
    "Cascadia Code", SFMono-Regular, Consolas, "Liberation Mono", monospace;
  height: 100%;
  overflow: auto;
  padding: clamp(16px, 3vw, 24px);

  /* stylelint-disable rule-empty-line-before, selector-class-pattern */

  * {
    box-sizing: border-box;
  }

  header {
    align-items: start;
    border-bottom: 1px solid rgb(166 225 255 / 18%);
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding-bottom: 16px;
  }
  header p {
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
  header button {
    background: transparent;
    border: 1px solid rgb(193 234 255 / 28%);
    border-radius: 5px;
    color: #dff5ff;
    cursor: pointer;
    font: inherit;
    font-size: 11px;
    padding: 8px 10px;
  }
  button:focus-visible {
    outline: 2px solid var(--portfolio-accent, #75dfff);
    outline-offset: 3px;
  }
  .badges__summary {
    color: #a9c4d3;
    font-family: system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    margin: 17px 0;
  }
  .badges__list {
    display: grid;
    gap: 9px;
  }
  .badge {
    background: rgb(2 10 18 / 18%);
    border: 1px solid rgb(181 230 255 / 14%);
    border-radius: 7px;
    display: grid;
    gap: 11px;
    grid-template-columns: 35px 1fr auto;
    min-height: 66px;
    padding: 10px;
  }
  .badge[data-unlocked="true"] {
    background: linear-gradient(
      100deg,
      rgb(62 197 229 / 14%),
      rgb(93 236 174 / 5%)
    );
    border-color: rgb(117 231 185 / 43%);
  }
  .badge__mark {
    background: rgb(153 212 240 / 11%);
    border: 1px solid rgb(153 212 240 / 28%);
    border-radius: 5px;
    color: #83e4ff;
    display: grid;
    font-size: 10px;
    font-weight: 800;
    height: 33px;
    place-items: center;
    width: 33px;
  }
  .badge[data-unlocked="true"] .badge__mark {
    background: #8cffbb;
    border-color: #8cffbb;
    color: #07301c;
  }
  .badge strong {
    display: block;
    font-size: 12px;
  }
  .badge span {
    color: #9ab7c6;
    display: block;
    font-family: system-ui, sans-serif;
    font-size: 11px;
    line-height: 1.35;
    margin-top: 3px;
  }
  .badge__status {
    color: #8aa8b7;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .badge[data-unlocked="true"] .badge__status {
    color: #99f1be;
  }
  footer {
    border-top: 1px solid rgb(166 225 255 / 18%);
    color: #86a4b3;
    font-family: system-ui, sans-serif;
    font-size: 11px;
    line-height: 1.45;
    margin-top: 17px;
    padding-top: 14px;
  }
  /* stylelint-enable rule-empty-line-before, selector-class-pattern */
`;

export default StyledPortfolioAchievements;
