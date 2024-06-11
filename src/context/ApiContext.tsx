import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { Player } from "./player/PlayerContext";
import { getHomePage, getPlatformInfo, validateToken } from "../function/ApiFunction";

import Loading from "../component/loading/Loading";

interface IPlatformType {
    srno: number;
    uniqueID: string;
    platformName: string;
    accountPrefix: string;
    primaryColor: string;
    secondaryColor: string;
    tabIcon: string;
    logoImage: string;
    logoImage_2: string;
    backgroundColor: string;
    textColor: string;
    headerColor: string;
    footerColor: string;
    mode: string;
    descriptionEN: string;
    descriptionCN: string;
    descriptionMY: string;
    androidDownloadUrl: string;
    iosDownloadUrl: string;
    safePay: number;
    safePayTelco: number;
    safepPayOB: number;
    safePayQR: number;
    cdm: number;
    cdM_Deposit: number;
    cdM_Withdrawal: number;
    suggestion: number;
    selfRegister: number;
    phoneNoVerify: number;
}
interface IGpCategoryType {
    category: string;
}

interface IBannerList {
    srno: number;
    advertisingType: string;
    title: string;
    sort: number;
    mediaUrl: string;
    createDate: Date;
}

interface IGpList {
    srno: number;
    gameName: string;
    gameCode: string;
    type: string;
    logoImage: string;
    bannerImage: string;
    btnImage: string;
    status: number;
}

interface IApiContextType {
    windowWidth: number;
    setWindowWidth: Dispatch<SetStateAction<number>>;
    platformInfo: IPlatformType | undefined;
    setPlatformInfo: Dispatch<SetStateAction<IPlatformType | undefined>>;
    gpCategory: IGpCategoryType[] | [];
    setGpCategory: Dispatch<SetStateAction<IGpCategoryType[] | []>>;
    bannerList: IBannerList[] | [];
    setBannerList: Dispatch<SetStateAction<IBannerList[] | []>>;
    gpList: IGpList[] | [];
    setGpList: Dispatch<SetStateAction<IGpList[] | []>>;
}
const initApiContext: IApiContextType = {
    windowWidth: window.innerWidth,
    setWindowWidth: () => {},
    platformInfo: undefined,
    setPlatformInfo: () => {},
    gpCategory: [],
    setGpCategory: () => {},
    bannerList: [],
    setBannerList: () => {},
    gpList: [],
    setGpList: () => {},
};
export const Api = createContext<IApiContextType>(initApiContext);

interface IApiContextProps {
    children: ReactNode;
}
const ApiContext = ({ children }: IApiContextProps) => {
    const playerContext = useContext(Player);
    const { setPlayerInfo, setAgentInfo, hostname } = playerContext;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const [platformInfo, setPlatformInfo] = useState<IPlatformType | undefined>(undefined);
    const [gpCategory, setGpCategory] = useState<IGpCategoryType[] | []>([]);
    const [bannerList, setBannerList] = useState<IBannerList[] | []>([]);
    const [gpList, setGpList] = useState<IGpList[] | []>([]);

    useEffect(() => {
        handleFirstLoad();
    }, []);

    async function handleFirstLoad() {
        const api1 = validateToken(hostname, setPlayerInfo, setAgentInfo);
        const api2 = getPlatformInfo(hostname, setPlatformInfo, setGpCategory);
        const api3 = getHomePage(hostname, setBannerList, setGpList);

        await Promise.all([api1, api2, api3]).catch((error) => console.log(error));
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />;
    }

    const values: IApiContextType = {
        windowWidth,
        setWindowWidth,
        platformInfo,
        setPlatformInfo,
        gpCategory,
        setGpCategory,
        bannerList,
        setBannerList,
        gpList,
        setGpList,
    };
    return <Api.Provider value={values}>{children}</Api.Provider>;
};

export default ApiContext;
