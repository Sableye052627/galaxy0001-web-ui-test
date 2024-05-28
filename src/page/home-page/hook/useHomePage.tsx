import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { useNavigate } from "react-router-dom";

export const useHomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, gpCategory, windowWidth } = apiContext;

    function handleRedirect(path: string) {
        navigate(`/play-game/${path?.toLocaleLowerCase()}`);
    }

    return { t, platformInfo, gpCategory, windowWidth, handleRedirect };
};
