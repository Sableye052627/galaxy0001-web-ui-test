import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Player } from "../../../../../context/player/PlayerContext";

export const useSuccessModal = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const playerContext = useContext(Player);
    const { playerInfo, hostname } = playerContext;

    return { t, navigate, playerInfo, hostname };
};
