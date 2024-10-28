import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";
import { previewImage } from "../../../function/UploadFunction";

export const useSuggestion = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo, hostname } = playerContext;

    const [imagePreview, setImagePreview] = useState<any | undefined>(undefined);
  
    async function handlePreviewImage(file: any) {
      setImagePreview([await previewImage(file)]);
    }

    return { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, hostname, imagePreview, setImagePreview, handlePreviewImage };
};
