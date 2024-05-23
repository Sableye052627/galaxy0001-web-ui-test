import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../../context/ApiContext";

export const useNavigatorNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const apiContext = useContext(Api);
  const { platformInfo, gpCategory } = apiContext;

  const do_path = `https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/nav-menu-icon/`;

  function handleNavigate(path: string) {
    navigate(path);
  }

  return { t, gpCategory, do_path, handleNavigate };
};
