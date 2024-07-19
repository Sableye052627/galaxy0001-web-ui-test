import { Carousel, Col, Row } from "antd";
import "./home-page.scss";
import { useHomePage } from "./hook/useHomePage";
import { gridSetting } from "../../component/main-layout/MainLayout";
import {
    NotificationOutlined,
    TranslationOutlined,
    MobileOutlined,
    LockOutlined,
    CreditCardOutlined,
    PlayCircleOutlined,
    FireOutlined,
} from "@ant-design/icons";

import Marquee from "react-fast-marquee";
import { Parallax, Background } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import LanguageModal from "../../component/language-modal/LanguageModal";
import { sponsorList } from "../../asset/Asset";

const HomePage = () => {
    const { t, i18n, windowWidth, platformInfo, gpCategory, bannerList, handleRedirect, hostname } = useHomePage();

    const [gameSwiperShow, setGameSwiperShow] = useState(5);
    const [providerSwiperShow, setProviderSwiperShow] = useState(10);
    const [lang, setLang] = useState<boolean>(false);

    const currentLng = i18n.language;
    let language = currentLng === "EN" || currentLng === "en-US" ? "english" : currentLng === "CN" || currentLng === "zh-CN" ? "mandarin" : "bahasa";

    useEffect(() => {
        if (windowWidth < 992) {
            setGameSwiperShow(4);
            setProviderSwiperShow(8);
            if (windowWidth < 768) {
                setGameSwiperShow(3);
                setProviderSwiperShow(6);
                if (windowWidth < 577) {
                    setGameSwiperShow(2);
                    setProviderSwiperShow(4);
                }
            }
        }
    }, [windowWidth]);

    // const sponsorList = [{ gameCode: "VP" }];
    // const poster = [{ title: "asd" }];
    return (
        <div id="home-page">
            <Carousel autoplay dots={false}>
                {bannerList
                    ?.filter((item) => item.advertisingType === "banner")
                    .map((item: any, index: number) => (
                        <img key={index} src={item?.mediaUrl} alt="" />
                    ))}
            </Carousel>
            <div className="neon-hr" />
            <Row justify="center">
                <Col {...gridSetting}>
                    <div className="marquee">
                        <NotificationOutlined />
                        <Marquee gradient={false}>{t("marqueeText", { domainName: platformInfo?.platformName })}</Marquee>

                        <LanguageModal lang={lang} setLang={setLang} />
                        <TranslationOutlined style={{ fontSize: 20, cursor: "pointer" }} onClick={() => setLang(!lang)} />
                    </div>
                </Col>
            </Row>
            <div className="neon-hr" />
            <Row className="about-us" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("trustedOnlineCasinoMalaysia", { domainName: platformInfo?.platformName })}</div>

                    <div className="desc">
                        {language === "bahasa"
                            ? platformInfo?.descriptionMY
                            : language === "mandarin"
                            ? platformInfo?.descriptionCN
                            : platformInfo?.descriptionEN}
                    </div>
                    {/* <div dangerouslySetInnerHTML={{ __html: platformInfo?.descriptionEN }} /> */}
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
                    <Row gutter={[16, 16]} justify="center">
                        {gpCategory?.map((items: any, index: number) => (
                            <Col key={index} xs={6}>
                                <div className="sm-menu-item" onClick={() => handleRedirect(items.category)}>
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/${items.category}.png`}
                                        alt={items.category}
                                    />
                                    {/* {t(items.category)} */}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Parallax>
            )}

            <Row className="sponsored" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("sponsored")}</div>
                    <Swiper spaceBetween={15} slidesPerView={providerSwiperShow} autoplay modules={[Autoplay]}>
                        {sponsorList.map((items: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div className="sponsored-item">
                                    <img src={items.image} alt={items.gameCode} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
            </Row>

            <Row className="useful-information" justify="center">
                <Col {...gridSetting}>
                    <div className="title">{t("usefulInformation")}</div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        <div className="info-item">
                            <div className="title">
                                <MobileOutlined />
                                {t("mobileApp")}
                            </div>
                            <div className="content">{t("infoContent1", { domainName: platformInfo?.platformName })}</div>
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
                                <CreditCardOutlined />
                                {t("paymentMethod")}
                            </div>
                            <div className="content">{t("infoContent3")}</div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="game-category" justify="center">
                <Col {...gridSetting}>
                    <div className="title" hidden={gpCategory[0] === undefined}>
                        {t("typesOfTheBestOnlineCasinoGames")}
                    </div>
                    <Swiper spaceBetween={15} slidesPerView={gameSwiperShow} autoplay modules={[Autoplay]}>
                        {gpCategory?.map((items: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div className="game-category-item">
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/${
                                            platformInfo?.uniqueID
                                        }/home-game-btn/${items.category.toLocaleUpperCase()}.png`}
                                        alt={items.category}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
            </Row>

            <Row className="video-poster" justify="center">
                <Col {...gridSetting}>
                    <Row justify="space-between" gutter={[10, 10]}>
                        <Col xs={24} lg={16}>
                            <div className="latest-video">
                                <div className="title">
                                    <PlayCircleOutlined />
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
                                    <FireOutlined />
                                    {t("recommended")}
                                </div>

                                <Carousel autoplay dots={false}>
                                    {bannerList
                                        ?.filter((item) => item.advertisingType === "poster")
                                        .map((item: any, index: number) => (
                                            <img key={index} src={item?.mediaUrl} alt="" />
                                        ))}
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
