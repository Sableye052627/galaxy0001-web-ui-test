import { useNavbar } from "./hook/useNavbar";
import { WalletOutlined, UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Col, Dropdown, Popover, Row } from "antd";

import "./navbar.scss";
import { gridSetting } from "../MainLayout";

const Navbar = () => {
    const { t, platformInfo, playerInfo, items } = useNavbar();

    return (
        <Row className="navbar" justify="center">
            <Col {...gridSetting}>
                <Row justify="space-between" align="middle" style={{ height: "100%" }}>
                    <Col xs={6} md={4} lg={3} xxl={2} className="logo">
                        <img src={platformInfo?.logoImage} alt={platformInfo?.uniqueID} />
                    </Col>

                    {!playerInfo ? (
                        <Col className="btn-menu">
                            <div className="btn-info">
                                <WalletOutlined />
                                {t("balance")}
                            </div>
                            <Dropdown overlayClassName="dropdown" menu={{ items }} placement="bottomRight">
                                <div className="btn-info">
                                    <UserOutlined />
                                    {t("playerid")}
                                    <CaretDownOutlined />
                                </div>
                            </Dropdown>
                        </Col>
                    ) : (
                        <Col className="btn-login">{t("login")}</Col>
                    )}
                </Row>
            </Col>
        </Row>
    );
};

export default Navbar;
