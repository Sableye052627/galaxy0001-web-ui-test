import { useNavbar } from "./hook/useNavbar";
import { Col, Popover, Row, Tooltip } from "antd";
import { WalletOutlined, LoginOutlined, UserOutlined, CaretDownOutlined, MenuOutlined, TranslationOutlined } from "@ant-design/icons";

import "./navbar.scss";
import { gridSetting } from "../../MainLayout";
import UserDropdown from "./component/user-dropdown/UserDropdown";
import { formatNumber } from "../../../../function/Common";
import { useState } from "react";
import SmDrawer from "./component/sm-drawer/SmDrawer";
import LanguageModal from "../../../language-modal/LanguageModal";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { theOneApi } from "../../../../service/CallApi";

const Navbar = () => {
    const { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, hostname } = useNavbar();

    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState<boolean>(false);

    function handleRedirect(path: string) {
        navigate(path);
    }

    function confirmWithdrawAll() {
        Swal.fire({
            text: "Confirm withdraw all balance",
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

    const renderLogin = () => (
        <div className="wallet-player">
            <Tooltip title={t("withdrawAllBalance")}>
                <div className="wallet" onClick={() => confirmWithdrawAll()}>
                    {/* <div className="wallet"> */}
                    <WalletOutlined style={{ fontSize: 22 }} />
                    <div className="wallet-balance">{formatNumber(playerInfo?.wallet1)}</div>
                </div>
            </Tooltip>
            <Popover overlayInnerStyle={{ padding: 0 }} placement="bottomRight" trigger="hover" arrow={false} content={<UserDropdown />}>
                <div className="btn-info">
                    <UserOutlined />
                    <div className="player-id">{playerInfo?.playerID}</div>
                    <CaretDownOutlined />
                </div>
            </Popover>
        </div>
    );

    return (
        <Row className="navbar" justify="center" align="middle">
            <Col {...gridSetting}>
                <Row justify="space-between" align="middle">
                    <Col sm={0}>
                        <div className="btn-drawer" onClick={() => setOpenMenu(!openMenu)}>
                            <MenuOutlined />
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={3} xxl={2}>
                        <div className="navbar-logo" onClick={() => handleRedirect("/")}>
                            <img src={platformInfo?.logoImage} alt={platformInfo?.uniqueID} />
                        </div>
                    </Col>

                    <Col sm={0}>
                        <div className="btn-translate" onClick={() => setLang(!lang)}>
                            <TranslationOutlined />
                        </div>
                    </Col>

                    <Col hidden={windowWidth <= 576}>{playerInfo ? renderLogin() : renderNoLogin()}</Col>
                </Row>

                <SmDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
                <LanguageModal lang={lang} setLang={setLang} />
            </Col>
        </Row>
    );
};

export default Navbar;
