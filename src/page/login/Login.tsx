import { useLogin } from "./hook/useLogin";
import { Button, Card, Carousel, Col, Form, Input, Row, Spin, message, Radio } from "antd";
import { RadioChangeEvent } from 'antd/lib/radio';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.scss";
import { useEffect, useState } from "react";
import { playerApi } from "../../service/CallApi";
import { SuccessModal } from "./component/success-modal/SuccessModal";
import { FailedModal } from "./component/failed-modal/FailedModal";
import Cookies from "js-cookie";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";

const Login = () => {
  const { t, i18n, navigate, platformInfo, windowWidth, isVertical, playerInfo, setPlayerInfo, setAgentInfo, hostname } = useLogin();

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [banner, setBanner] = useState();
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [erroMsg, setErrorMsg] = useState<string>("");

  const [selectedLanguage, setSelectedLanguage] = useState("EN");

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

    // Handle radio button change event using RadioChangeEvent
    const handleLanguageChange = (e: RadioChangeEvent) => {
      const value = e.target.value;
      i18n.changeLanguage(value);
      setSelectedLanguage(value);
  };
  const imageUrls = {
    EN: "https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/twitter/MB3.0_Complain%20Box-01.png",
    MM: "https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/twitter/MB3.0_Complain%20Box-02.png"
  };

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

        const lang_object = {
            Hostname: hostname,
            PlayerID: Cookies.get("PlayerID"),
            PlayerToken: Cookies.get("PlayerToken"),
            Language: selectedLanguage,
        };
        const lang_result = await playerApi("/update-language", lang_object);
        if (lang_result.status) {
            message.success(result.message);
        }

        setShow(true);
      }
    } catch (error: any) {
      console.log(error);

      if(error.response.data.message == "Player ID or Password wrong"){
        setErrorMsg(t("wrongPassword"));
      }
      else{
        setErrorMsg(error.response.data.message)
      }

      setError(true);
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
            backgroundColor: "black"
        }}
    >
    <SuccessModal show={show} setShow={setShow} />
    <FailedModal show={error} setShow={setError} errorMsg={erroMsg} />

    <div
        className="login-container"
        style={{
            backgroundImage: `url(https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/loginbackground/loginbg.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}
    >
    {/* Twitter Icon */}
    <img
      src={imageUrls[selectedLanguage as keyof typeof imageUrls]}
      alt="Twitter"
      className={isVertical ? "v-twitter" : "h-twitter"}
      onClick={() => {

        if(window.location.protocol == "apph5")
        {
          fetch('https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/apk/version.json')
          .then(response => response.json())
          .then(data => {
            const telegramLink = data[0].telegramLink;
            window.location.href = telegramLink; // This will attempt to open the Telegram app
          })
          .catch(error => console.error('Error fetching data:', error));
        }
        else
        {
          fetch('https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/apk/version.json')
          .then(response => response.json())
          .then(data => {
            const webFallbackUrl = data[0].telegramWebLink; // Fallback if Telegram isn't installed
            window.open(webFallbackUrl, '_blank');
          })
          .catch(error => console.error('Error fetching data:', error));
        }
      }}
    />

        <div className="login-logo">
            <img className="login-logo-img" src="https://miniworldcup1.sgp1.digitaloceanspaces.com/BWG/loginlogo/logo.png" alt="" />
        </div>
        <div className="login-wrapper">
            <Form className="login-form" layout="vertical" onFinish={handleLogin} initialValues={{ language: 'EN' }}>
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
                    <Col xs={24}>
                        <Form.Item name="language">
                            <Radio.Group onChange={handleLanguageChange}>
                                <Radio value="EN">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                                        alt="UK Flag"
                                        style={{ width: '20px', marginRight: '8px' }}
                                    />
                                    <span style={{ color: 'white' }}>English</span>
                                </Radio>
                                <Radio value="MM">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg"
                                        alt="Myanmar Flag"
                                        style={{ width: '20px', marginRight: '8px' }}
                                    />
                                    <span style={{ color: 'white' }}>Burnese</span>
                                </Radio>
                            </Radio.Group>
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
