import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";

export const useContactPermission = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo, setAgentInfo, hostname } = playerContext;

    return { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, };
};
