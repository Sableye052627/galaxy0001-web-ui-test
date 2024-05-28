import { useNavbar } from "./hook/useNavbar";
import { Col, Popover, Row } from "antd";
import { WalletOutlined, UserOutlined, CaretDownOutlined } from "@ant-design/icons";

import "./navbar.scss";
import { gridSetting } from "../MainLayout";
import UserDropdown from "./component/user-dropdown/UserDropdown";

const Navbar = () => {
    const { t, platformInfo, playerInfo } = useNavbar();

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
                            <Popover
                                overlayInnerStyle={{ padding: 0 }}
                                placement="bottomRight"
                                trigger="hover"
                                arrow={false}
                                content={<UserDropdown />}
                            >
                                <div className="btn-info">
                                    <UserOutlined />
                                    {t("playerid")}
                                    <CaretDownOutlined />
                                </div>
                            </Popover>
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
