import { Carousel, Col, Row } from "antd";
import "./home-page.scss";
import { useHomePage } from "./hook/useHomePage";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Autoplay } from "swiper/modules";
import GameCat from "./component/gameCat/GameCat";
import GameList from "./component/gameList/GameList";
import Jackpot from "./component/jackpot/Jackpot";
import Marquee from "./component/marquee/Marquee";
import HMarquee from "./component/h-marquee/H-Marquee";

const HomePage = () => {
  const { t, i18n, navigate, playerInfo, windowWidth, isVertical } = useHomePage();

  const { category } = useParams();
  const location = useLocation();

  const [gameSwiperShow, setGameSwiperShow] = useState(5);
  const [providerSwiperShow, setProviderSwiperShow] = useState(10);

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

  useEffect(() => {
    
    if (location.pathname === "/") {
      //console.log(location.pathname);
      //navigate("/select-game/slot");
      if (playerInfo) {
        console.log(window.location.hostname)
        if(window.location.protocol == "ui-test" && playerInfo?.contactPermissionAsked == 0){
          window.location.href = `${window.location.protocol}//${window.location.host}//permission?srno=${playerInfo?.srno}&lang=${playerInfo?.lang}`
        }
        else{
          navigate("/select-game/slot");
        }
      }
    }
  }, [playerInfo])

  return (
    <div id="home-page">
      {isVertical ? (
        <div className="v-lobby-container">
          <div className="lb-marquee-container">
            <Marquee />
          </div>
          <div className="lb-game-cat-container">
            <GameCat />
          </div>
          <div className="lb-game-container">
            <GameList />
          </div>
        </div>
      ) : (
        <div className="h-lobby-container">
          <div className="lb-main-container">
            <div className="lb-game-cat-container">
              <GameCat />
            </div>
            <div className="lb-sub-container">
              <div className="lb-marquee-container">
                <HMarquee />
              </div>
              <div className="lb-game-container">
                <GameList />
              </div>
            </div>
          </div>
          <div className="lb-jackpot-container">
            <Jackpot />
          </div>
        </div>
      )}

      {/*
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
            */}
    </div>
  );
};

export default HomePage;
