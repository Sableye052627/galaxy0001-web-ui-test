import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";

export const useHomePage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { windowWidth, platformInfo, gpCategory, isVertical } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo, setAgentInfo, hostname } = playerContext;

    function handleRedirect(path: string) {
        navigate(`/select-game/${path?.toLocaleLowerCase()}`);
    }

    return { t, i18n, navigate, playerInfo, windowWidth, platformInfo, gpCategory, isVertical };
};
