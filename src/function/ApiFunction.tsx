import { Dispatch, SetStateAction } from "react";

import Cookies from "js-cookie";
import { platformApi, playerApi } from "../service/CallApi";

export async function getPlatformInfo(hostname: string, setPlatformInfo: Dispatch<SetStateAction<any>>, setGpCategory: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname };
  await platformApi("/get-info", object).then((result) => {
    setPlatformInfo(result.data);
    setGpCategory(result.data2);

    document.documentElement.style.setProperty("--primary-color", `#${result.data.primaryColor}`);
    document.documentElement.style.setProperty("--secondary-color", `#${result.data.secondaryColor}`);
    document.documentElement.style.setProperty("--background-color", `#${result.data.backgroundColor}`);
    document.documentElement.style.setProperty("--text-color", `#${result.data.textColor}`);
    document.documentElement.style.setProperty("--header-color", `#${result.data.headerColor}`);
    document.documentElement.style.setProperty("--footer-color", `#${result.data.footerColor}`);
    document.documentElement.setAttribute("data-theme", result.data.mode);
  });
}

export async function validateToken(hostname: string, setPlayerInfo: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname, PlayerID: Cookies.get("PlayerID"), PlayerToken: Cookies.get("PlayerToken") };
  await playerApi("/validate-token", object).then((result) => {
    setPlayerInfo(result.data);
  });
}
