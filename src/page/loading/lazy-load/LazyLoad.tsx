import { Card, Col, Row } from "antd";
import { gridSetting } from "../../../component/main-layout/MainLayout";
import "./lazy-load.scss";

export const LazyLoad = () => {
    return (
        <Row className="lazy-load" justify="center">
            <Col {...gridSetting}>
                <Card loading />
            </Col>
        </Row>
    );
};
