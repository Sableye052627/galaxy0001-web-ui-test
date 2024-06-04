import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { useNavigate } from "react-router-dom";

export const useHomePage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { windowWidth, platformInfo, gpCategory, bannerList } = apiContext;

    function handleRedirect(path: string) {
        navigate(`/play-game/${path?.toLocaleLowerCase()}`);
    }

    return { t, i18n, windowWidth, platformInfo, gpCategory, bannerList, handleRedirect };
};
