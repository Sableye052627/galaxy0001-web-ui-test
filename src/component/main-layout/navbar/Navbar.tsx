import { useNavbar } from "./hook/useNavbar";

import { Col, Row } from "antd";

import "./navbar.scss";
import { gridSetting } from "../MainLayout";

const Navbar = () => {
  const { t, platformInfo } = useNavbar();

  return (
    <Row className="navbar" justify="center">
      <Col {...gridSetting}>
        <Row justify="space-between" align="middle" style={{ height: "100%" }}>
          <Col xs={6} sm={6} md={4} lg={3} xxl={2} className="logo">
            <img src={platformInfo?.logoImage} alt={platformInfo?.uniqueID} />
          </Col>

          <Col xl={2} className="btn-login">
            {t("login")}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Navbar;
