import { useLogin } from "./hook/useLogin";
import { Button, Card, Carousel, Col, Form, Input, Row, Spin, message } from "antd";

import "./login.scss";
import { useEffect, useState } from "react";
import { playerApi } from "../../service/CallApi";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { SuccessModal } from "./component/success-modal/SuccessModal";
import Cookies from "js-cookie";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";

const Login = () => {
    const { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, hostname } = useLogin();

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [banner, setBanner] = useState();
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (playerInfo) {
            navigate("/");
            return;
        }
        getBannerList();
    }, []);

    async function getBannerList() {
        // const object = {
        //     PlatformName: platformInfo?.platformName,
        // };
        // const result = await bannerApi("/banner-list", object);
        // if (result.status) {
        //     setBanner(result.data);
        // }
        setIsFirstLoad(false);
    }

    async function handleLogin(values: any) {
        setIsLoading(true);
        try {
            const object = {
                HostName: hostname,
                PlayerID: values.playerID,
                Password: values.password,
            };
            const result = await playerApi("/login", object);
            if (result.status) {
                setPlayerInfo(result.data);

                Cookies.set("PlayerID", result.data.playerID);
                Cookies.set("PlayerToken", result.data.playerToken);
                // i18n.changeLanguage(result.data.lang);

                setShow(true);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    if (isFirstLoad) {
        return <LazyLoad />;
    }

    return (
        <Row className="login" justify="center">
            <Col {...gridSetting}>
                <SuccessModal show={show} setShow={setShow} />

                <Row className="header">
                    <Col xs={0} xl={24}>
                        {t("login")}
                    </Col>
                </Row>

                <Row className="content" justify="center" gutter={[16, 10]}>
                    <Col xs={24} sm={16} md={14} lg={11} xl={8}>
                        <Spin spinning={isLoading}>
                            <Card>
                                <Form layout="vertical" onFinish={handleLogin}>
                                    <Form.Item label={t("playerID")} name="playerID" rules={[{ required: true, message: t("pleaseInsertPlayerID") }]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("pleaseInsertPassword") }]}>
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button block size="large" type="primary" htmlType="submit">
                                            {t("login")}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Spin>
                    </Col>

                    <Col xs={0} xl={16}>
                        <Card>
                            {/* <Carousel autoplay dots={false}>
                                {banner?.map((items: any, index: number) => (
                                    <div key={index} className="banner-img">
                                        <img src={items.image} alt={items.title} />
                                    </div>
                                ))}
                            </Carousel> */}

                            <hr />
                            <div className="description">{t("aboutUsDesc")}</div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Login;
