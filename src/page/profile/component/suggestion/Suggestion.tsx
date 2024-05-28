import { Col, Row } from "antd";

import "./suggestion.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useSuggestion } from "./hook/useSuggestion";

const Suggestion = () => {
    const { t, navigate, platformInfo, playerInfo } = useSuggestion();

    return (
        <Row className="deposit-wrapper" justify="center">
            <Col {...gridSetting}></Col>
        </Row>
    );
};

export default Suggestion;
