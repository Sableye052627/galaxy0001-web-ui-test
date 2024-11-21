
import { useEffect, useState } from "react";
import { useTelegramAccess } from "./hook/useTelegramAccess";

const TelegramAccess = () => {
    const { navigate } = useTelegramAccess();

    useEffect(() => {
        navigate("/select-game/slot");
    }, []);
    
    return (<div></div>);
};

export default TelegramAccess;
