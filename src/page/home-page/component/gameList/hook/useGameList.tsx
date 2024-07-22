import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../../context/ApiContext";
import { Player } from "../../../../../context/player/PlayerContext";

export const useGameList = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { windowWidth, platformInfo, gpCategory, bannerList } = apiContext;

    const playerContext = useContext(Player);
    const { hostname } = playerContext;

    function handleRedirect(path: string) {
        navigate(`/play-game/${path?.toLocaleLowerCase()}`);
    }

    return { t, i18n, windowWidth, platformInfo, gpCategory, bannerList, handleRedirect, hostname };
};