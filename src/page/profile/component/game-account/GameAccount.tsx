import { Col, Row } from "antd";

import "./game-account.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useGameAccount } from "./hook/useGameAccount";

const GameAccount = () => {
    const { t, navigate, platformInfo, playerInfo } = useGameAccount();

    return (
        <Row className="game-account-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default GameAccount;
