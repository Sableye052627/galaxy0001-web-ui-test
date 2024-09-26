import { Col, Drawer, Row } from "antd";
import { HomeOutlined, EditOutlined } from "@ant-design/icons";

import "./sm-drawer.scss";
import { useSmDrawer } from "./hook/useSmDrawer";
import { confirmWithdrawAll, formatNumber } from "../../../../../../function/Common";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";

interface ISmDrawerProps {
    openMenu: boolean;
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

const SmDrawer = ({ openMenu, setOpenMenu }: ISmDrawerProps) => {
    const { t, navigate, platformInfo, gpCategory, playerInfo, setPlayerInfo } = useSmDrawer();

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
                <div className="btn-resync" onClick={() => confirmWithdrawAll(setPlayerInfo)}>
                    {t("resync")}
                </div>
            </div>

            <div className="common-menu-item">
                <div className={`item ${pathname[1] === ""}`} onClick={() => handleRedirect2("/")}>
                    {/* <img src={homeIcon} alt="home" /> */}
                    <HomeOutlined />
                    {t("home")}
                </div>

                <div className={`item ${pathname[1] === "suggestion"}`} onClick={() => handleRedirect2("/suggestion")}>
                    {/* <img src={suggestionIcon} alt="suggestion" /> */}
                    <EditOutlined />
                    {t("suggestion")}
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
                    {t("myProfile")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "change-password"}`}
                    onClick={() => handleRedirect2("/player-info/change-password")}
                >
                    {t("changePassword")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "top-up-balance"}`}
                    onClick={() => handleRedirect2("/player-info/top-up-balance")}
                >
                    {t("topUpBalance")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "deposit-balance"}`}
                    onClick={() => handleRedirect2("/player-info/deposit-balance")}
                    hidden={platformInfo?.cdM_Deposit === 0}
                >
                    {t("deposit")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "withdraw-balance"}`}
                    onClick={() => handleRedirect2("/player-info/withdraw-balance")}
                    hidden={platformInfo?.cdM_Withdrawal === 0}
                >
                    {t("withdraw")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "transaction-history"}`}
                    onClick={() => handleRedirect2("/player-info/transaction-history")}
                >
                    {t("transactionHistory")}
                </div>

                <div
                    className={`item ${pathname[1] === "player-info" && pathname[2] === "game-account"}`}
                    onClick={() => handleRedirect2("/player-info/game-account")}
                >
                    {t("gameAccount")}
                </div>
            </div>

            <hr />

            <div className="btn-login-logout" onClick={() => handleLogInOut()}>
                {playerInfo ? t("logOut") : t("login")}
            </div>
        </Drawer>
    );
};

export default SmDrawer;
