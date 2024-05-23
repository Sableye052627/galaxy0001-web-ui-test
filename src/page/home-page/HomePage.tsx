import { Carousel, Col, Row } from "antd";
import "./home-page.scss";
import { useHomePage } from "./hook/useHomePage";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { NotificationOutlined, MobileOutlined, LockOutlined, WalletOutlined } from "@ant-design/icons";

import Marquee from "react-fast-marquee";
import { Parallax, Background } from "react-parallax";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";

const HomePage = () => {
    const { t, platformInfo, windowWidth } = useHomePage();

    return (
        <div id="home-page">
            <Carousel autoplay dots={false}>
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/win22/banner/20-11-2023/WIN22_Banner_Galaxy_SlotMania(1).png" alt="" />
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/asset/banner/04-11-2022/w00-WIN22_Banner-01.png" alt="" />
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/asset/banner/04-11-2022/w00-WIN22_Banner-02.png" alt="" />
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/asset/banner/04-11-2022/w00-WIN22_Banner-03.png" alt="" />
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/asset/banner/04-11-2022/undefined-WIN22_Banner-04.png" alt="" />
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/asset/banner/04-11-2022/w00-WIN22_Banner-05.png" alt="" />
            </Carousel>
            <div className="neon-hr" />
            <Row justify="center">
                <Col {...gridSetting}>
                    <div className="marquee">
                        <NotificationOutlined />
                        <Marquee gradient={false}>{t("marqueeText")}</Marquee>

                        {/* <LanguageModal lang={lang} setLang={setLang} />
                        <BsTranslate style={{ fontSize: 20, cursor: "pointer" }} onClick={() => setLang(!lang)} /> */}
                    </div>
                </Col>
            </Row>
            <div className="neon-hr" />
            <Row className="about-us" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("trustedOnlineCasinoMalaysia")}</div>
                    <div className="desc">{t("aboutUsDesc")}</div>
                </Col>
            </Row>

            {windowWidth <= 991 && (
                <Parallax blur={2} strength={500} className="sm-menu">
                    <Background className="custom-bg">
                        <div
                            style={{
                                height: 500,
                                width: windowWidth,
                                backgroundImage: "url('https://game-platform.sgp1.digitaloceanspaces.com/win22/sm-home-menu-bg.png')",
                            }}
                        />
                    </Background>
                    {/* <Row gutter={[16, 16]} justify="center">
                        {gameCategory?.map((items, index) => (
                            <Col key={index} xs={6}>
                                <div className="sm-menu-item" onClick={() => handleRedirect(items)}>
                                    <img src={items.icon} alt={items.title} />
                                    {t(items.title)}
                                </div>
                            </Col>
                        ))}
                    </Row> */}
                </Parallax>
            )}

            {/* <Row className="sponsored" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("sponsored")}</div>
                    <Swiper spaceBetween={15} slidesPerView={providerSwiperShow} autoplay modules={[Autoplay]}>
                        {sponsorList.map((items, index) => (
                            <SwiperSlide key={index}>
                                <div className="sponsored-item">
                                    <img src={items.image} alt={items.gameCode} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
            </Row> */}

            <Row className="useful-information" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("usefulInformation")}</div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        <div className="info-item">
                            <div className="title">
                                <MobileOutlined />
                                {t("mobileApp")}
                            </div>
                            <div className="content">{t("infoContent1")}</div>
                        </div>

                        <div className="info-item">
                            <div className="title">
                                <LockOutlined />
                                {t("securityAndSafety")}
                            </div>
                            <div className="content">{t("infoContent2")}</div>
                        </div>

                        <div className="info-item">
                            <div className="title">
                                <WalletOutlined />
                                {t("paymentMethod")}
                            </div>
                            <div className="content">{t("infoContent3")}</div>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* <Row className="game-category" justify="center">
                <Col {...gridSetting}>
                    <div className="title" hidden={gameCategory[0] === undefined}>
                        {t("typesOfTheBestOnlineCasinoGames")}
                    </div>
                    <Swiper spaceBetween={15} slidesPerView={gameSwiperShow} autoplay modules={[Autoplay]}>
                        {gameCategory?.map((items, index) => (
                            <SwiperSlide key={index}>
                                <div className="game-category-item">
                                    <img src={items.buttonImg} alt={items.gameCode} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
            </Row> */}

            {/* <Row className="video-poster" justify="center">
                <Col {...gridSetting}>
                    <Row justify="space-between" gutter={[10, 10]}>
                        <Col xs={24} lg={16}>
                            <div className="latest-video">
                                <div className="title">
                                    <RxVideo />
                                    {t("latestHighlightVideo")}
                                </div>

                                <video muted autoPlay loop>
                                    <source src="https://ffs.sgp1.digitaloceanspaces.com/EasySports/video.mp4" />
                                </video>
                            </div>
                        </Col>

                        <Col xs={24} sm={0} lg={8}>
                            <div className="recomanded-poster">
                                <div className="title">
                                    <BsFire />
                                    {t("recommended")}
                                </div>

                                <Carousel autoplay dots={false}>
                                    {poster?.map((items, index) => (
                                        <div key={index} className="poster-img">
                                            <img src={items.image} alt={items.title} />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row> */}
        </div>
    );
};

export default HomePage;
