import { Col, Row } from "antd";

import "./transaction-history.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useTransactionHistory } from "./hook/useTransactionHistory";

const TransactionHistory = () => {
    const { t, navigate, platformInfo, playerInfo } = useTransactionHistory();

    return (
        <Row className="transaction-history-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default TransactionHistory;
