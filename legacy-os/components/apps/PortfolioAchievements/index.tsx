import { memo, useEffect, useState } from "react";
import StyledPortfolioAchievements from "components/apps/PortfolioAchievements/StyledPortfolioAchievements";
import {
  ACHIEVEMENTS,
  type AchievementId,
  readAchievements,
} from "components/system/PortfolioExperience/events";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcesses } from "contexts/process";

const PortfolioAchievements: FC<ComponentProcessProps> = ({ id }) => {
  const { closeWithTransition } = useProcesses();
  const [unlocked, setUnlocked] = useState(readAchievements);
  const entries = Object.entries(ACHIEVEMENTS) as [
    AchievementId,
    (typeof ACHIEVEMENTS)[AchievementId],
  ][];
  const unlockedCount = entries.filter(
    ([achievement]) => unlocked[achievement]
  ).length;

  useEffect(() => {
    const refreshAchievements = (): void => setUnlocked(readAchievements());

    window.addEventListener("portfolio:achievement", refreshAchievements);

    return () =>
      window.removeEventListener("portfolio:achievement", refreshAchievements);
  }, []);

  return (
    <StyledPortfolioAchievements aria-label="Portfolio explorer badges">
      <header>
        <div>
          <p>Optional exploration log</p>
          <h1>Explorer badges</h1>
        </div>
        <button onClick={() => closeWithTransition(id)} type="button">
          Close
        </button>
      </header>
      <p className="badges__summary">
        {unlockedCount} of {entries.length} badges unlocked. Nothing here is a
        test - it only keeps track of the optional paths you explored.
      </p>
      <div className="badges__list">
        {entries.map(([achievement, { description, label, mark }]) => (
          <article
            key={achievement}
            className="badge"
            data-unlocked={Boolean(unlocked[achievement])}
          >
            <span className="badge__mark">
              {unlocked[achievement] ? "OK" : mark}
            </span>
            <div>
              <strong>{label}</strong>
              <span>{description}</span>
            </div>
            <span className="badge__status">
              {unlocked[achievement] ? "Unlocked" : "Hidden"}
            </span>
          </article>
        ))}
      </div>
      <footer>
        Badge progress is saved only in this browser. It never leaves the
        portfolio.
      </footer>
    </StyledPortfolioAchievements>
  );
};

export default memo(PortfolioAchievements);
