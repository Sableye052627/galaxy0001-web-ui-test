import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Api } from "../../../../context/ApiContext";
import { Player } from "../../../../context/player/PlayerContext";
import { UserOutlined, LockOutlined, ImportOutlined, ExportOutlined, HistoryOutlined, RocketOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const useNavbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const apiContext = useContext(Api);
    const { platformInfo } = apiContext;

    const playerContext = useContext(Player);
    const { playerInfo, setPlayerInfo } = playerContext;

    function handleRedirect(path: string) {
        navigate(`/player-info/${path}`);
    }

    function handleLogOut() {
        localStorage.removeItem("PlayerID");
        localStorage.removeItem("PlayerToken");

        setPlayerInfo(undefined);
        navigate("/");
    }

    const items = [
        {
            key: "1",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("my-profile")}>
                    <UserOutlined />
                    {t("profile")}
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("change-password")}>
                    <LockOutlined />
                    {t("changePassword")}
                </div>
            ),
        },
        {
            key: "3",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("deposit")}>
                    <ImportOutlined />
                    {t("deposit")}
                </div>
            ),
        },
        {
            key: "4",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("withdrawal")}>
                    <ExportOutlined />
                    {t("withdrawal")}
                </div>
            ),
        },
        {
            key: "5",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("transaction-history")}>
                    <HistoryOutlined />
                    {t("transaction")}
                </div>
            ),
        },
        {
            key: "6",
            label: (
                <div className="menu-item" onClick={() => handleRedirect("game-account")}>
                    <RocketOutlined />
                    {t("gameAccount")}
                </div>
            ),
        },
        {
            key: "7",
            label: (
                <div className="menu-item" onClick={() => handleLogOut()}>
                    <LogoutOutlined />
                    {t("logout")}
                </div>
            ),
        },
    ];

    return { t, platformInfo, playerInfo, items };
};
