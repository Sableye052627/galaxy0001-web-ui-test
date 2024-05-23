import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";

export const useHomePage = () => {
    const { t } = useTranslation();

    const apiContext = useContext(Api);
    const { platformInfo, windowWidth } = apiContext;

    return { t, platformInfo, windowWidth };
};
