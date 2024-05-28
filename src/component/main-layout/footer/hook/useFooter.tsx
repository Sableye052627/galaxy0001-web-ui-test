import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../context/ApiContext";
import { useNavigate } from "react-router-dom";

export const useFooter = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth } = apiContext;

    return { t, navigate, platformInfo, windowWidth };
};
