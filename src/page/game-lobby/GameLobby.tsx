import { Carousel, Col, Row, message } from "antd";

import "./game-lobby.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameLobby } from "./hook/useGameLobby";
import { useParams } from "react-router-dom";

const GameLobby = () => {
    const { t, navigate, platformInfo, playerInfo, setPlayerInfo, gpList } = useGameLobby();
    const { category } = useParams();

    const apiData = [
        {
            srno: "1",
            status: 0,
            btnUrl: "https://game-platform.sgp1.digitaloceanspaces.com/win22/game-btn/SLOT/VP.png",
        },
    ];

    function handleRedirect(item: any) {
        // if (item.status === 1 || (playerInfo?.agentSrno === 18 && item.status === 2)) {
        if (item.status === 1) {
            navigate(`/play-game/${category}/${item.gameCode}`);
            return;
        }
        message.info(t("gameUnderMaintenance"));
    }

    return (
        <div className="game-lobby">
            <div className="banner-img">
                <img src="https://game-platform.sgp1.digitaloceanspaces.com/win22/game-banner/SLOT.png" alt="" />
            </div>
            <div className="neon-hr" />
            <Row className="game-provider" justify="center">
                <Col {...gridSetting}>
                    <Row gutter={[20, 20]} className="gp-card-wrapper">
                        {apiData?.map((items, index) => {
                            if (items.status === 1) {
                                return (
                                    <Col key={index} xs={12} sm={8} xl={6}>
                                        <div className="gp-card active" onClick={() => handleRedirect(items)}>
                                            <img src={items.btnUrl} alt={items.srno} />
                                        </div>
                                    </Col>
                                );
                            }

                            if (items.status === 2) {
                                return (
                                    <Col key={index} xs={12} sm={8} xl={6}>
                                        <div className="gp-card testing" onClick={() => handleRedirect(items)}>
                                            <img src={items.btnUrl} alt={items.srno} />
                                        </div>
                                    </Col>
                                );
                            }

                            return (
                                <Col key={index} xs={12} sm={8} xl={6}>
                                    <div className="gp-card inactive" onClick={() => handleRedirect(items)}>
                                        <img src={items.btnUrl} alt={items.srno} />
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default GameLobby;
