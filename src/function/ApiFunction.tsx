import { Dispatch, SetStateAction } from "react";

import Cookies from "js-cookie";
import { gameApi, platformApi, playerApi } from "../service/CallApi";

export async function getPlatformInfo(hostname: string, setPlatformInfo: Dispatch<SetStateAction<any>>, setGpCategory: Dispatch<SetStateAction<any>>, setAgentInfo: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname };
  await platformApi("/get-info", object).then((result) => {
    result.data.platformName = "Galaxy0001"
    setPlatformInfo(result.data);
    setGpCategory(result.data2);
    setAgentInfo((prev: any) => (prev ? prev : result.data3));

    document.documentElement.style.setProperty("--primary-color", `#${result.data.primaryColor}`);
    document.documentElement.style.setProperty("--secondary-color", `#${result.data.secondaryColor}`);
    document.documentElement.style.setProperty("--background-color", `#${result.data.backgroundColor}`);
    document.documentElement.style.setProperty("--text-color", `#${result.data.textColor}`);
    document.documentElement.style.setProperty("--header-color", `#${result.data.headerColor}`);
    document.documentElement.style.setProperty("--footer-color", `#${result.data.footerColor}`);
    document.documentElement.setAttribute("data-theme", result.data.mode);
  });
}

export async function getHomePage(hostname: string, setBannerList: Dispatch<SetStateAction<any>>, setGpList: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname };
  await platformApi("/home-page", object).then((result) => {
    setBannerList(result.data);
    setGpList(result.data2);
  });
}

export async function validateToken(hostname: string, setPlayerInfo: Dispatch<SetStateAction<any>>, setAgentInfo: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname, PlayerID: Cookies.get("PlayerID"), PlayerToken: Cookies.get("PlayerToken") };
  await playerApi("/validate-token", object).then((result) => {
    setPlayerInfo(result.data);
    setAgentInfo((prev: any) => (!result.data2.length ? prev : result.data2));
  });
}

export async function getGameProviderList(hostname: string, setGpList: Dispatch<SetStateAction<any>>) {
  const object = { HostName: hostname, PlayerID: Cookies.get("PlayerID"), PlayerToken: Cookies.get("PlayerToken") };
  await gameApi("/game-provider-list", object).then((result) => {
    setGpList(result.data);
  });
}
