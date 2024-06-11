import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";

export const useMainLayout = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth } = apiContext;

    const playerContext = useContext(Player);
    const { agentInfo } = playerContext;

    return { t, navigate, platformInfo, windowWidth, agentInfo };
};
