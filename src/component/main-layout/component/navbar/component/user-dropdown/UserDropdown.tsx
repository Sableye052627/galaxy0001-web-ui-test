import "./user-dropdown.scss";
import { useNavbar } from "../../hook/useNavbar";
import { LogoutOutlined, HistoryOutlined, ReloadOutlined, UserOutlined, LockOutlined, RocketOutlined, ImportOutlined, ExportOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function UserDropdown() {
    const { t, navigate, platformInfo, setPlayerInfo } = useNavbar();

    function handleRedirect(path: string) {
        navigate(`/player-info/${path}`);
    }
    
    function handleLogOut() {
        Cookies.remove("PlayerID");
        Cookies.remove("PlayerToken");

        setPlayerInfo(undefined);
        navigate("/login");
    }

    return (
        <div className="user-dropdown">
            <div className="item" onClick={() => handleRedirect("my-profile")}>
                <UserOutlined />
                {t("myProfile")}
            </div>

            <div className="item" onClick={() => handleRedirect("change-password")}>
                <LockOutlined />
                {t("changePassword")}
            </div>

            <hr hidden={platformInfo?.cdM_Deposit === 0 && platformInfo?.cdM_Withdrawal === 0} />

            <div className="item" onClick={() => handleRedirect("deposit-balance")} hidden={platformInfo?.cdM_Deposit === 0}>
                <ImportOutlined />
                {t("deposit")}
            </div>

            <div className="item" onClick={() => handleRedirect("withdraw-balance")} hidden={platformInfo?.cdM_Withdrawal === 0}>
                <ExportOutlined />
                {t("withdraw")}
            </div>

            <hr />
            
            <div className="item" onClick={() => handleRedirect("top-up-balance")}>
                <ReloadOutlined />
                {t("topUpBalance")}
            </div>

            <div className="item" onClick={() => handleRedirect("transaction-history")}>
                <HistoryOutlined />
                {t("transactionHistory")}
            </div>

            <div className="item" onClick={() => handleRedirect("game-account")}>
                <RocketOutlined />
                {t("gameAccount")}
            </div>

            <hr />

            <div className="item" onClick={() => handleLogOut()}>
                <LogoutOutlined />
                {t("logOut")}
            </div>
        </div>
    );
}

export default UserDropdown;
