
import { useEffect, useState } from "react";
import { useTelegramAccess } from "./hook/useTelegramAccess";

const TelegramAccess = () => {
    const { navigate, playerInfo } = useTelegramAccess();

    useEffect(() => {
        if(playerInfo){
            navigate("/select-game/slot");
        }
        else{
            navigate("/login");
        }
    }, []);
    
    return (<div></div>);
};

export default TelegramAccess;
