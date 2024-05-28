import { Col, Row } from "antd";

import "./deposit.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useDeposit } from "./hook/useDeposit";

const Deposit = () => {
    const { t, navigate, platformInfo, playerInfo } = useDeposit();

    return (
        <Row className="deposit-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default Deposit;
