import { useLogin } from "./hook/useLogin";
import { Button, Card, Carousel, Col, Form, Input, Row, Spin, message } from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.scss";
import { useEffect, useState } from "react";
import { playerApi } from "../../service/CallApi";
import { SuccessModal } from "./component/success-modal/SuccessModal";
import Cookies from "js-cookie";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";

const Login = () => {
  const { t, i18n, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, setAgentInfo, hostname } = useLogin();

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
        setAgentInfo(result.data2);

        Cookies.set("PlayerID", result.data.playerID);
        Cookies.set("PlayerToken", result.data.playerToken);
        i18n.changeLanguage(result.data.lang);

        setShow(true);
      }
    } catch (error: any) {
      console.log(error);
      // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
    }
    setIsLoading(false);
  }

  if (isFirstLoad) {
    return <LazyLoad />;
  }

  return (
    <div
        className="layout-container"
        style={{
            backgroundImage: `url(https://game-platform.sgp1.digitaloceanspaces.com/bwg/h-bg.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}
    >
    <SuccessModal show={show} setShow={setShow} />
    <div
        className="login-container"
        style={{
            backgroundImage: `url(https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/loginbackground/loginbg.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}
    >
        <div className="login-logo">
            <img className="login-logo-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/loginlogo/logo.png" alt="" />
        </div>
        <div className="login-wrapper">
            <Form className="login-form" layout="vertical" onFinish={handleLogin}>
                <Row justify="center" align="middle">
                    <Col xs={24}>
                        <Form.Item name="playerID">
                            <Input prefix={<UserOutlined />} placeholder={t("playerID")} size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="password">
                            <Input.Password prefix={<LockOutlined />} placeholder={t("password")}size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={12}>
                        <Form.Item>
                            <Button block htmlType="submit" type="primary" size="large" shape="round">
                                {t("login")}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
    </div>
  );
};

export default Login;
