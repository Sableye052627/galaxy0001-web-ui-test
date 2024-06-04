import "./loading.scss";
import { useLoading } from "./hook/useLoading";
import { Col, Row, Spin } from "antd";

export const Loading = () => {
    const { platformInfo } = useLoading();

    return (
        <Row className="loading" justify="center" align="middle">
            <Spin spinning />

            {platformInfo && (
                <Col xs={12} sm={8} lg={6} xl={3}>
                    <div className="loading-logo">
                        <img src={platformInfo.logoImage} alt={platformInfo.platformName} />
                    </div>
                </Col>
            )}
        </Row>
    );
};
