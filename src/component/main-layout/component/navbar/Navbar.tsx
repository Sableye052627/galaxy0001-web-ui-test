import { useNavbar } from "./hook/useNavbar";
import { Col, Dropdown, Popover, Row, Tooltip } from "antd";
import { WalletOutlined, LoginOutlined, UserOutlined, CaretDownOutlined, MenuOutlined, TranslationOutlined } from "@ant-design/icons";

import "./navbar.scss";
import { gridSetting } from "../../MainLayout";
import UserDropdown from "./component/user-dropdown/UserDropdown";
import { formatNumber } from "../../../../function/Common";
import { useState } from "react";
import SmDrawer from "./component/sm-drawer/SmDrawer";
import LanguageModal from "../../../language-modal/LanguageModal";

const Navbar = () => {
    const { t, navigate, platformInfo, windowWidth, playerInfo } = useNavbar();

    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState<boolean>(false);

    function handleRedirect(path: string) {
        navigate(path);
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
                {/* <div className="wallet" onClick={() => confirmWithdrawAll(setPlayerInfo)}> */}
                <div className="wallet">
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
