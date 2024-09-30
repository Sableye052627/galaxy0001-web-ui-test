import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { Player } from "../context/player/PlayerContext";
import { gameProviderApi, theOneApi } from "../service/CallApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../function/Common";

import Loading from "../component/loading/Loading";

interface IGameDetail {
    srno: number;
    gameName: string;
    gameCode: string;
    type: string;
    getGameList: number;
    logoImage: string;
    bannerImage: string;
    btnImage: string;
    status: number;
}

interface IGameDownload {
    iosDownloadUrl: string;
    androidDownloadUrl: string;
    pcUrl: string;
    mobileUrl: string;
    gameLoginID: string;
    gameLoginPassword: string;
}

const playerContext = useContext(Player);
const { hostname } = playerContext;

const [gameDetail, setGameDetail] = useState<IGameDetail | undefined>(undefined);
const [gameDownload, setGameDownload] = useState<IGameDownload | undefined>(undefined);
const [showDownload, setShowDownload] = useState<boolean>(false);

const navigate = useNavigate();

export async function getGameInfo(category: string, srno: string) {
    try {
        const object = {
            Hostname: hostname,
            PlayerID: Cookies.get("PlayerID"),
            PlayerToken: Cookies.get("PlayerToken"),
            Category: category,
            AgentGpSrno: Number(srno),
        };
        const result = await gameProviderApi("/get-detail", object);
        if (result.status) {
            setGameDetail(result.data);
        }
    } catch (error: any) {
        console.log(error);
        // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
    }
}

export async function handleTransfer(category: string, gameID: string, srno: string, amount: Number) {
    console.log("sdadas");
    try {
        const object = {
            Hostname: hostname,
            PlayerID: Cookies.get("PlayerID"),
            PlayerToken: Cookies.get("PlayerToken"),
            AgentGpSrno: Number(srno),
            GameID: gameID,
            Category: category,
            Amount: amount,
            CallBackUrl: window.location.href,
        };
        const result = await theOneApi("/game-loading", object);
        if (result.status) {
            if (gameDetail?.type === "App") {
                setGameDownload(result.data);
                setShowDownload(true);
                // result.data.iosDownloadUrl
                // result.data.androidDownloadUrl
            } else {
                if (isMobile()) {
                    const item = { 
                        srno: srno,
                        category: category,
                        src: result.data.mobileUrl
                    };
                    navigate("/start-game", { state: { item } });
                } else {
                    const item = { 
                        srno: srno,
                        category: category,
                        src: result.data.pcUrl
                    };
                    navigate("/start-game", { state: { item } });
                }
            }
        }
    } catch (error: any) {
        console.log(error);
        // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
    }
}