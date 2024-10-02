import { useNavbar } from "./hook/useNavbar";
import { Col, Popover, Row, Tooltip } from "antd";
import { WalletOutlined, LoginOutlined, UserOutlined, CaretDownOutlined, MenuOutlined, TranslationOutlined } from "@ant-design/icons";

import "./navbar.scss";
import { gridSetting } from "../../MainLayout";
import UserDropdown from "./component/user-dropdown/UserDropdown";
import WalletDropdown from "./component/wallet-dropdown/WalletDropdown";
import { formatNumber } from "../../../../function/Common";
import { useState } from "react";
import SmDrawer from "./component/sm-drawer/SmDrawer";
import LanguageModal from "../../../language-modal/LanguageModal";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { playerApi } from "../../../../service/CallApi";
import { validateToken } from "../../../../function/ApiFunction"

const Navbar = () => {
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, isVertical } = useNavbar();

    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState<boolean>(false);

    function handleRedirect(path: string) {
        navigate(path);
    }

    function navigateToDepositPage(){
        //navigate(`/player-info/top-up-balance`);
    }

    function navigateToProfilePage(){
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

    const renderVertical = () => (
        <div 
            className="btn" 
            style={{ 
                marginLeft: '10%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
            }}>

        <img 
            className="setting-btn-img" 
            src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/menubutton/menu%20button.png" 
            alt="" 
            style={{ cursor: 'pointer', width: '40%' }} 
            onClick={() => setOpenMenu(!openMenu)}
        />
        </div>
    );

    const renderHorizontal = () => (
        <div 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
        }} 
        className="player-btn-container">
        <img className="deposit-btn-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/deposit-btn-icon.png" alt=""  onClick={() => navigateToDepositPage()} />
        <img className="deposit-arrow-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/arrow-right-icon.png" alt=""  />
            <img className="player-btn-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/refreshbutton/refreshbutton.png" alt="" onClick={() => confirmWithdrawAll()} />
            <p className="deposit-text">
                {(playerInfo?.wallet1 ?? 0) / 1000 > 1 
                ? `${formatNumber((playerInfo?.wallet1 ?? 0) / 1000)}k` 
                : formatNumber((playerInfo?.wallet1 ?? 0))}
            </p>
        </div>
    );
    
    const renderLoginPlayer = () => (
        <div 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
        }} 
        className="player-btn-container">
            <img  style={{ marginLeft: isVertical ? '-4%' : '0%', marginRight: isVertical ? '0%' : '27.5%' }} className="player-btn-img" 
            src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/playerbutton/playerbutton.png" alt=""
            onClick={navigateToProfilePage} />
            <p  className="player-text">{playerInfo?.playerID}</p>
            {!isVertical && (
            <img 
                className="setting-btn-img" 
                src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/menubutton/menu%20button.png" 
                alt="" 
                style={{ cursor: 'pointer' }} 
                onClick={() => setOpenMenu(!openMenu)}
            />
            )}
        </div>
    );

    const renderLoginSetting = () => (
        <Popover 
            overlayInnerStyle={{ padding: 0 }} 
            placement="bottomRight" 
            trigger="click"
            arrow={false} 
            content={<UserDropdown />}
        >
        <img 
            className="setting-btn-img" 
            src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/menubutton/menu%20button.png" 
            alt="" 
            style={{ cursor: 'pointer' }} 
        />
        </Popover>
    );

    return (
    <div className={`${isVertical ? "v" : "h"}-header-container`}>
            <div className="menu-container">            
                {playerInfo && !isVertical && renderHorizontal()}   
                {playerInfo && isVertical && renderVertical()}   
            </div>
            <div className="logo-container">
                <img className="logo-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/loginlogo/logo.png" alt="" style={{ cursor: 'pointer' }}  onClick={() => handleRedirect("/select-game/live")} />
            </div>
            <div className="menu-container">
            {playerInfo && !isVertical && renderLoginPlayer() }
            </div>
            <SmDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>  
    );
};

export default Navbar;
