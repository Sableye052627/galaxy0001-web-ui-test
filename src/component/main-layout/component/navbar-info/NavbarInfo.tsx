import { useNavbarInfo } from "./hook/useNavbarInfo";
import { Col, Popover, Row, Tooltip } from "antd";
import { WalletOutlined, LoginOutlined, UserOutlined, CaretDownOutlined, MenuOutlined, TranslationOutlined } from "@ant-design/icons";

import "./navbar-info.scss";
import { gridSetting } from "../../MainLayout";
import { formatNumber } from "../../../../function/Common";
import { useState } from "react";
import LanguageModal from "../../../language-modal/LanguageModal";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { playerApi } from "../../../../service/CallApi";
import { validateToken } from "../../../../function/ApiFunction"

const Navbar = () => {
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, isVertical } = useNavbarInfo();

    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState<boolean>(false);

    function handleRedirect(path: string) {
        navigate(path);
    }

    function navigateToDepositPage(){
        //navigate(`/player-info/top-up-balance`);
    }

    function navigateToPersonalPage(){
        navigate(`/player-info/my-profile`);
    }


    function confirmWithdrawAll() {
        Swal.fire({
            text: t("confirmToWithdrawBalance"),
            icon: "info",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
                withdrawAllBalance();
            }
        });
    }

    async function withdrawAllBalance() {
        Swal.fire({
            text: "Withdrawal In Progress",
            didOpen: () => Swal.showLoading(),
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            color: "#fff",
            background: "#434343",
        });
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: "all",
                AgentGpSrno: 0,
            };
            const result = await playerApi("/game-account/withdraw-all-balance", object);
            if (result.status) {
                //setPlayerInfo(result.data);
                validateToken(hostname, setPlayerInfo, setAgentInfo);
                Swal.close();
            }
        } catch (error: any) {}
    }

    const renderNoLogin = () => (
        <div className="btn-login" onClick={() => handleRedirect("/login")}>
            <LoginOutlined />
            {t("login")}
        </div>
    );

    const renderDeposit = () => (
        <div className="deposit-btn-container">
            <img className="deposit-btn-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/deposit-btn-icon.png" alt="" onClick={() => navigateToDepositPage()} />
            <img className="deposit-arrow-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/arrow-right-icon.png" alt=""  />
        </div>
    );

    const renderAmount = () => (
        <div className="amount-btn-container">
            <img className="amount-btn-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/amount-value-icon.png" alt="" onClick={() => confirmWithdrawAll()} />
            <p className="amount-text">
            {(playerInfo?.wallet1 ?? 0) / 1000 > 1000 
                ? `${formatNumber((playerInfo?.wallet1 ?? 0) / 1000)}k` 
                : formatNumber((playerInfo?.wallet1 ?? 0))}
            </p>
        </div>
    );

    const renderPlayer = () => (
        <div className="player-btn-container">
            <img  className="player-btn-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/player-value-icon.png" alt="" onClick={() => navigateToPersonalPage()} />
            <p  className="player-text">{playerInfo?.playerID}</p>
        </div>
    );

    return (
    <div className={`${isVertical ? "v" : "h"}-info-container`}>
            <div className="menu-container">            
                {playerInfo && renderDeposit()}   
            </div>
            <div className="menu-container">            
                {playerInfo && renderAmount()}   
            </div>
            <div className="menu-container">
            {playerInfo && renderPlayer()  }
            </div>
        </div>  
    );
};

export default Navbar;
