import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { validateToken } from "../../function/ApiFunction";
import { useContactPermission } from "./hook/useContactPermission";
import {  playerApi } from "../../service/CallApi";

const ContactPermission = () => {
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname } = useContactPermission();

    useEffect(() => {
        const handleUpdateContactPermission = async () => {
            const object = {
              Hostname: hostname,
              PlayerID: Cookies.get("PlayerID"),
              PlayerToken: Cookies.get("PlayerToken")
            };
            await playerApi("/update-contact-permission", object)
            //.then((result) => {
            //  validateToken(hostname, setPlayerInfo, setAgentInfo);
            //})
            //.catch((error) => message.error({ content: t(error?.response?.data?.message?.replace(/ /g, "")), key: error?.response?.data?.message }));
        };

        if(playerInfo?.contactPermissionAsked == 0){
            handleUpdateContactPermission();
        }
        navigate("/select-game/slot");
    }, []);
    
    return (<div></div>);
};

export default ContactPermission;
