import { Col, Row } from "antd";
import { gridSetting } from "../MainLayout";

const Navbar = () => {
  return (
    <Row className="navbar">
      <Col {...gridSetting}>
        <Row justify="space-between">
          <Col>
            <div className="logo"></div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Navbar;
