import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../../context/ApiContext";
import { Player } from "../../../../../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";

export const useNavbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo } = playerContext;

    return { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo };
};
