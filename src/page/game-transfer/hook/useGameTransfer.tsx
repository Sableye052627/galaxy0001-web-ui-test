import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";

export const useGameTransfer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, isVertical } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo, setAgentInfo, hostname } = playerContext;

    return { t, navigate, platformInfo, playerInfo, setPlayerInfo, setAgentInfo, hostname, isVertical };
};
