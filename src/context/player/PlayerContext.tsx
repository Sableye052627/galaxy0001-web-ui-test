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
}
const initPlayerContext: IPlayerContextType = {
    playerInfo: undefined,
    setPlayerInfo: () => {},
    agentInfo: undefined,
    setAgentInfo: () => {},
    hostname: "",
};
export const Player = createContext<IPlayerContextType>(initPlayerContext);

interface IPlayerContextProps {
    children: ReactNode;
}
const PlayerContext = ({ children }: IPlayerContextProps) => {
    const [playerInfo, setPlayerInfo] = useState<IPlayerType | undefined>(undefined);
    const [agentInfo, setAgentInfo] = useState<[IAgentType] | undefined>(undefined);
    const hostname =
        window.location.hostname === "localhost" || window.location.hostname === "webh5.danger.asia" ? "danger.asia" : window.location.hostname;

    const values: IPlayerContextType = { playerInfo, setPlayerInfo, agentInfo, setAgentInfo, hostname };
    return <Player.Provider value={values}>{children}</Player.Provider>;
};

export default PlayerContext;
