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

interface IPlayerContextType {
    playerInfo: IPlayerType | undefined;
    setPlayerInfo: Dispatch<SetStateAction<IPlayerType | undefined>>;
    hostname: string;
}
const initPlayerContext: IPlayerContextType = {
    playerInfo: undefined,
    setPlayerInfo: () => {},
    hostname: "",
};
export const Player = createContext<IPlayerContextType>(initPlayerContext);

interface IPlayerContextProps {
    children: ReactNode;
}
const PlayerContext = ({ children }: IPlayerContextProps) => {
    const [playerInfo, setPlayerInfo] = useState<IPlayerType | undefined>(undefined);
    const hostname = window.location.hostname === "localhost" ? "test" : window.location.hostname.split(".")[0];

    const values: IPlayerContextType = { playerInfo, setPlayerInfo, hostname };
    return <Player.Provider value={values}>{children}</Player.Provider>;
};

export default PlayerContext;
