import { Col, Row } from "antd";

import "./withdraw.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useWithdraw } from "./hook/useWithdraw";

const Withdraw = () => {
    const { t, navigate, platformInfo, playerInfo } = useWithdraw();

    return (
        <Row className="withdraw-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default Withdraw;
