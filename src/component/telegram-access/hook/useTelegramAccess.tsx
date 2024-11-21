import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Player } from "../../../context/player/PlayerContext";

export const useTelegramAccess = () => {
    const navigate = useNavigate();

    const playerContext = useContext(Player);
    const { playerInfo } = playerContext;

    return { navigate, playerInfo };
};
