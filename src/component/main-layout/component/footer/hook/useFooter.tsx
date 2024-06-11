import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../context/ApiContext";
import { useNavigate } from "react-router-dom";
import { Player } from "../../../../../context/player/PlayerContext";

export const useFooter = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth, gpCategory } = apiContext;

    const playerContext = useContext(Player);
    const { agentInfo } = playerContext;

    return { t, navigate, platformInfo, windowWidth, gpCategory, agentInfo };
};
