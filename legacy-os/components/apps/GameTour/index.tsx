import { memo } from "react";
import styled from "styled-components";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcesses } from "contexts/process";

const GameFrame = styled.iframe`
  border: 0;
  display: block;
  height: 100%;
  width: 100%;
`;

const GameTour: FC<ComponentProcessProps> = ({ id }) => {
  const {
    processes: {
      [id]: { url = "/game-tour/index.html?mode=guided" } = {},
    },
  } = useProcesses();

  return (
    <GameFrame
      allow="fullscreen; autoplay"
      referrerPolicy="no-referrer"
      src={url}
      title="RR Game Tour"
    />
  );
};

export default memo(GameTour);
