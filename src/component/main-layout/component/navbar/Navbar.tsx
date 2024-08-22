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
import { theOneApi } from "../../../../service/CallApi";

const Navbar = () => {
    const { t, navigate, playerInfo, setPlayerInfo, hostname, isVertical } = useNavbar();

    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState<boolean>(false);

    function handleRedirect(path: string) {
        navigate(path);
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
            const result = await theOneApi("/withdraw-balance", object);
            if (result.status) {
                setPlayerInfo(result.data);
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
        <img style={{marginLeft:'10%'}} src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/refreshbutton/refreshbutton.png" alt="" onClick={() => confirmWithdrawAll()} />
        <p style={{color: "gold", position: "absolute", marginTop: '2.75%', marginLeft:'21.5%', fontSize:'x-small'}}>{formatNumber(playerInfo?.wallet1)}</p>
        </div>
    );

    const renderHorizontal = () => (
        <div style={{ marginRight:'10%'}} className="player-btn-container">
            <img className="player-btn-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/refreshbutton/refreshbutton.png" alt="" onClick={() => confirmWithdrawAll()} />
            <p className="player-text">{formatNumber(playerInfo?.wallet1)}</p>
        </div>
    );

    const renderLoginPlayer = () => (
        <div 
        style={{ 
            marginLeft: '10%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
        }} 
        className="player-btn-container">
            <img  style={{ marginLeft: isVertical ? '-4%' : '6%' }} className="player-btn-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/playerbutton/playerbutton.png" alt="" />
            <p  className="player-text">{playerInfo?.playerID}</p>
            {!isVertical && (
            <img 
                className="setting-btn-img" 
                src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/menubutton/menu%20button.png" 
                alt="" 
                style={{ cursor: 'pointer', width: '40%', marginRight:'30%' }} 
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
