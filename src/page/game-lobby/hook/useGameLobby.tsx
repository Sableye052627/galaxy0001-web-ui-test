import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../context/ApiContext";
import { Player } from "../../../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";
import { getGameProviderList } from "../../../function/ApiFunction";
import Loading from "../../../component/loading/Loading";

interface IGpList {
    gpCode: string;
}

export const useGameLobby = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gpList, setGpList] = useState<IGpList[] | []>([]);

    const apiContext = useContext(Api);
    const { platformInfo } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo, hostname } = playerContext;

    useEffect(() => {
        handleFirstLoad();
    }, []);

    async function handleFirstLoad() {
        const api1 = getGameProviderList(hostname, setGpList);

        await Promise.all([api1]).catch((error) => console.log(error));
        setIsLoading(false);
    }

    // if (isLoading) {
    //     return <Loading />;
    // }

    return { t, navigate, platformInfo, playerInfo, setPlayerInfo, gpList };
};
