import { Col, Drawer, Row } from "antd";
import { HomeOutlined, EditOutlined, TranslationOutlined } from "@ant-design/icons";

import "./sm-drawer.scss";
import { useSmDrawer } from "./hook/useSmDrawer";
import { confirmWithdrawAll, formatNumber } from "../../../../../../function/Common";
import { Dispatch, SetStateAction, useState } from "react";
import Cookies from "js-cookie";
import LanguageModal from "../../../../../language-modal/LanguageModal";

interface ISmDrawerProps {
    openMenu: boolean;
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const SmDrawer = ({ openMenu, setOpenMenu }: ISmDrawerProps) => {
    const { t, navigate, platformInfo, gpCategory, playerInfo, setPlayerInfo } = useSmDrawer();
    const [lang, setLang] = useState<boolean>(false);

    const pathname = window.location.pathname.split("/");
    const drawerSetting = {
        className: "sm-drawer",
        style: { background: "#242424" },
        width: 300,
        closable: false,
        open: openMenu,
        onClose: () => setOpenMenu(false),
    };

    function handleRedirect(item: string) {
        navigate(`/select-game/${item}`);
        setOpenMenu(false);
    }

    function handleRedirect2(path: string) {
        navigate(path);
        setOpenMenu(false);
    }

    function handleLogInOut() {
        if (playerInfo) {
            Cookies.remove("PlayerID");
            Cookies.remove("PlayerToken");
            setPlayerInfo(undefined);
        }
        navigate("/login");
        setOpenMenu(false);
    }

    return (
        <Drawer {...drawerSetting} placement="left">
            <div className="user" hidden={!playerInfo} onClick={() => handleRedirect2("/player-info/my-profile")}>
                {playerInfo?.playerID}
            </div>

            <div className="wallet-resync" hidden={!playerInfo}>
                <div className="wallet" onClick={() => handleRedirect2("/player-info/deposit-balance")}>
                    MMK {formatNumber(playerInfo?.wallet1)}
                </div>
                <div className="btn-resync" onClick={() => confirmWithdrawAll(setPlayerInfo, t("confirmToWithdrawBalance"))}>
                <span style={{cursor:"pointer"}}>
                    {t("resync")}
                    </span>
                </div>
            </div>

            <div className="common-menu-item">
                <div className={`item ${pathname[1] === ""}`} onClick={() => handleRedirect2("/")}>
                    {/* <img src={homeIcon} alt="home" /> */}
                    <HomeOutlined />
                    <span style={{cursor:"pointer"}}>
                        {t("home")}
                    </span>
                </div>

                <div className={`item ${pathname[1] === "suggestion"}`} onClick={() => handleRedirect2("/suggestion")}>
                    {/* <img src={suggestionIcon} alt="suggestion" /> */}
                    <EditOutlined />
                    <span style={{cursor:"pointer"}}>
                        {t("suggestion")}
                    </span>
                </div>

                <div className={`item ${pathname[1] === ""}`} onClick={() => setLang(!lang)}>
                    {/* <img src={suggestionIcon} alt="suggestion" /> */}
                    <TranslationOutlined />
                    <span style={{cursor:"pointer"}}>
                        {t("language")}
                    </span>
                </div>
            </div>

            <hr />

            <Row gutter={[16, 16]} className="game-category">
                {/* 
                {gpCategory?.map((items: any, index: number) => (
                    <Col xs={8} key={index}>
                        <div className={`item ${pathname[2] === items.category.toLocaleLowerCase()}`} onClick={() => handleRedirect(items.category)}>
                            <img
                                src={`https://game-platform.sgp1.digitaloceanspaces.com/${
                                    platformInfo?.uniqueID
                                }/navbar-game-icon/${items.category.toUpperCase()}.png`}
                                alt={items.category}
                            />
                            {/* {t(items.category.toLocaleLowerCase())}
                        </div>
                    </Col> 
                ))}
                */}
                
                <Col xs={6}>
                    <div className={`item live`} onClick={() => handleRedirect("Live")}>
                        <img
                            src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-game-icon/LIVE.png`}
                            alt="Live"
                        />
                    </div>
                </Col> 
                <Col xs={6}>
                    <div className={`item lottery`} onClick={() => handleRedirect("Lottery")}>
                        <img
                            src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-game-icon/LOTTERY.png`}
                            alt="Lottery"
                        />
                    </div>
                </Col> 
                <Col xs={6}>
                    <div className={`item slot`} onClick={() => handleRedirect("Slot")}>
                        <img
                            src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-game-icon/SLOT.png`}
                            alt="Slot"
                        />
                    </div>
                </Col> 
                <Col xs={6}>
                    <div className={`item sport`} onClick={() => handleRedirect("Sport")}>
                        <img
                            src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-game-icon/SPORT.png`}
                            alt="Sport"
                        />
                    </div>
                </Col> 
            </Row>

            <hr hidden={!playerInfo} />

            <div className="common-menu-item-2" hidden={!playerInfo}>
                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "my-profile"}`}
                    onClick={() => handleRedirect2("/player-info/my-profile")}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("myProfile")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "change-password"}`}
                    onClick={() => handleRedirect2("/player-info/change-password")}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("changePassword")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "top-up-balance"}`}
                    onClick={() => handleRedirect2("/player-info/top-up-balance")}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("topUpBalance")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "deposit-balance"}`}
                    onClick={() => handleRedirect2("/player-info/deposit-balance")}
                    hidden={platformInfo?.cdM_Deposit === 0}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("deposit")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "withdraw-balance"}`}
                    onClick={() => handleRedirect2("/player-info/withdraw-balance")}
                    hidden={platformInfo?.cdM_Withdrawal === 0}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("withdraw")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "transaction-history"}`}
                    onClick={() => handleRedirect2("/player-info/transaction-history")}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("transactionHistory")}
                    </span>
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "game-account"}`}
                    onClick={() => handleRedirect2("/player-info/game-account")}
                >
                    <span style={{cursor:"pointer"}}>
                    {t("gameAccount")}
                    </span>
                </div>
            </div>

            <hr />

            <div className="btn-login-logout" onClick={() => handleLogInOut()}>
                {playerInfo ? t("logOut") : t("login")}
            </div>
            <LanguageModal lang={lang} setLang={setLang} />
        </Drawer>
    );
};

export default SmDrawer;
