import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";

export const useLogin = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const apiContext = useContext(Api);
  const { platformInfo, windowWidth, isVertical } = apiContext;

  const playerContext = useContext(Player);
  const { playerInfo, setPlayerInfo, setAgentInfo, hostname } = playerContext;

  return { t, i18n, navigate, platformInfo, windowWidth, isVertical, playerInfo, setPlayerInfo, setAgentInfo, hostname };
};
