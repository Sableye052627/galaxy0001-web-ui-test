import { useSignUp } from "./hook/useSignUp";
import { Button, Card, Carousel, Col, Form, Input, Row, Spin, message } from "antd";

import "./signup.scss";
import { useEffect, useState } from "react";
import { playerApi } from "../../service/CallApi";
import { gridSetting } from "../../component/main-layout/MainLayout";
import Cookies from "js-cookie";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";

const SignUp = () => {
  const { t, i18n, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, setAgentInfo, hostname } = useSignUp();

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

  async function handleSignUp(values: any) {
    setIsLoading(true);
    try {
      const object = {
        HostName: hostname,
        PlayerID: values.playerID,
        Password: values.password,
      };
      const result = await playerApi("/signup", object);
      if (result.status) {
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
    <Row className="signup" justify="center">
      <Col {...gridSetting}>
        {/* <SuccessModal show={show} setShow={setShow} /> */}

        <Row className="header">
        <Col xs={24} sm={16} md={14} lg={12} xl={12}>
            {t("signUp")}
          </Col>
        </Row>

        <Row className="content" justify="center" gutter={[16, 10]}>
          <Col xs={24} sm={16} md={14} lg={12} xl={12}>
            <Spin spinning={isLoading}>
              <Card>
                <Form layout="vertical" onFinish={handleSignUp}>

                  <Form.Item label={t("playerID")} name="playerID" rules={[{ required: true, message: t("pleaseInsertPlayerID") }]}>
                    <Input />
                  </Form.Item>
                    
                  <Form.Item label={t("fullName")} name="fullName" rules={[{ required: true, message: t("pleaseInsertYourFullName") }]}>
                    <Input />
                  </Form.Item>
                    
                  <Form.Item label={t("phone")} name="phone" rules={[{ required: true, message: t("pleaseInsertPhoneNumber") }]}>
                    <Input />
                  </Form.Item>
                    
                  <Form.Item label={t("email")} name="email" rules={[{ required: true, message: t("pleaseInsertPhoneNumber") }]}>
                    <Input />
                  </Form.Item>

                  <Form.Item label={t("password")} name="password" rules={[{ required: true, message: t("pleaseInsertPassword") }]}>
                    <Input.Password />
                  </Form.Item>

                  <Form.Item label={t("confirmedPassword")} name="confirmedPassword" rules={[{ required: true, message: t("pleaseInsertConfirmedPassword") }]}>
                    <Input.Password />
                  </Form.Item>
                    
                  <Form.Item label={t("referralID")} name="referralID" rules={[{ required: false }]}>
                    <Input />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button block size="large" type="primary" htmlType="submit">
                        {t("signUp")}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Spin>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
