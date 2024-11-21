import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Player } from "../../../../../context/player/PlayerContext";
import { Api } from "../../../../../context/ApiContext";

export const useSuccessModal = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo } = playerContext;

    return { t, i18n, navigate, playerInfo, platformInfo };
};
