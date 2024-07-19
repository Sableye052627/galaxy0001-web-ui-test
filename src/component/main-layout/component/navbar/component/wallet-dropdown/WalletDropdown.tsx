import "./wallet-dropdown.scss";
import { useNavbar } from "../../hook/useNavbar";
import { LogoutOutlined, HistoryOutlined, UserOutlined, LockOutlined, RocketOutlined, ImportOutlined, ExportOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

interface WalletDropdownProps {
    withdrawAllBalance: () => void;
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({ withdrawAllBalance }) => {
    const { t, navigate, platformInfo, setPlayerInfo } = useNavbar();

    function handleRedirect(path: string) {
        navigate(`/player-info/${path}`);
    }

    return (
        <div className="wallet-dropdown">
            <div className="item" onClick={() => handleRedirect("top-up-balance")}>
                {t("topUpBalance")}
            </div>
            <div className="item" onClick={withdrawAllBalance}>
                {t("withdrawAllBalance")}
            </div>
        </div>
    );
}

export default WalletDropdown;
