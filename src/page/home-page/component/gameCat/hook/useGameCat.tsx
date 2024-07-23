import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../../context/ApiContext";
import { Player } from "../../../../../context/player/PlayerContext";

export const useGameCat = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { isVertical, platformInfo, gpCategory } = apiContext;

    function handleRedirect(path: string) {
        navigate(`/play-game/${path?.toLocaleLowerCase()}`);
    }

    return { t, handleRedirect, isVertical, platformInfo, gpCategory };
};
