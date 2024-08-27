import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../../context/ApiContext";

export const useHMarquee = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { isVertical, platformInfo } = apiContext;

    return { t, i18n, isVertical, platformInfo };
};
