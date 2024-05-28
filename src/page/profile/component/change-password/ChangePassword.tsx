import { Col, Row } from "antd";

import "./change-password.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useChangePassword } from "./hook/useChangePassword";

const ChangePassword = () => {
    const { t, navigate, platformInfo, playerInfo } = useChangePassword();

    return (
        <Row className="change-password-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default ChangePassword;
