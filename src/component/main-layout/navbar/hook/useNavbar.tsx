import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../context/ApiContext";

export const useNavbar = () => {
  const { t } = useTranslation();

  const apiContext = useContext(Api);
  const { platformInfo } = apiContext;

  return { t, platformInfo };
};
