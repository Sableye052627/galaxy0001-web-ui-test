import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface IPlayerType {
    srno: number;
    platformSrno: number;
    platformID: string;
    agentID: string;
    playerID: string;
    playerToken: string;
    playerType: string;
    wallet1: number;
    playerName: string;
    phoneNo: string;
    email: string;
    status: number;
    createDate: Date;
    lang: string;
}

interface IAgentType {
    srno: number;
    contactType: string;
    redirectUrl: string;
}

interface IPlayerContextType {
    playerInfo: IPlayerType | undefined;
    setPlayerInfo: Dispatch<SetStateAction<IPlayerType | undefined>>;
    agentInfo: [IAgentType] | undefined;
    setAgentInfo: Dispatch<SetStateAction<[IAgentType] | undefined>>;
    hostname: string;
    jackpot: number;
    setJackpot: Dispatch<SetStateAction<number>>;
}
const initPlayerContext: IPlayerContextType = {
    playerInfo: undefined,
    setPlayerInfo: () => {},
    agentInfo: undefined,
    setAgentInfo: () => {},
    hostname: "",
    jackpot: 0,
    setJackpot: () => {},
};
export const Player = createContext<IPlayerContextType>(initPlayerContext);

interface IPlayerContextProps {
    children: ReactNode;
}
const PlayerContext = ({ children }: IPlayerContextProps) => {
    const [playerInfo, setPlayerInfo] = useState<IPlayerType | undefined>(undefined);
    const [agentInfo, setAgentInfo] = useState<[IAgentType] | undefined>(undefined);
    const hostname = "myboss68.com"
        //window.location.hostname === "localhost" || window.location.hostname === "webh5.danger.asia" ? "danger.asia" : window.location.hostname;

    const [jackpot, setJackpot] = useState(Math.floor(Math.random() * 88888) + 800000)

    const values: IPlayerContextType = { playerInfo, setPlayerInfo, agentInfo, setAgentInfo, hostname, jackpot, setJackpot };
    return <Player.Provider value={values}>{children}</Player.Provider>;
};

export default PlayerContext;
