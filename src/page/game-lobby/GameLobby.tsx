import { Col, Row, message } from "antd";

import "./game-lobby.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameLobby } from "./hook/useGameLobby";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gameProviderApi } from "../../service/CallApi";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";
interface IApiData {
    srno: number;
    gameName: string;
    gameCode: string;
    type: string;
    getGameList: number;
    logoImage: string;
    bannerImage: string;
    btnImage: string;
    status: number;
}

const GameLobby = () => {
    const { t, navigate, hostname } = useGameLobby();
    const { category } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiData, setApiData] = useState<IApiData[] | []>([]);

    useEffect(() => {
        getGameProviderList();
    }, [category]);

    async function getGameProviderList() {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: category,
            };
            const result = await gameProviderApi("/get-list", object);
            if (result) {
                setApiData(result.data);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    function handleRedirect(item: IApiData) {
        // if (item.status === 1 || (playerInfo?.agentSrno === 18 && item.status === 2)) {
        if (item.status === 1) {
            if (item.getGameList) {
                navigate(`/game-menu/${category}/${item.gameCode}`);
            } else {
                navigate(`/game-transfer/${category}/${item.gameCode}`);
            }
        } else {
            message.info(t("gameUnderMaintenance"));
        }
    }

    if (isLoading) {
        return <LazyLoad />;
    }

    return (
        <div className="game-lobby">
            <div className="banner-img">
                {/* <img src={catInfo?.banner} alt={catInfo?.srno} /> */}
                <img src={`https://game-platform.sgp1.digitaloceanspaces.com/win22/game-banner/${category}.png`} alt="" />
            </div>
            <div className="neon-hr" />
            <Row className="game-provider" justify="center">
                <Col {...gridSetting}>
                    <Row gutter={[20, 20]} className="gp-card-wrapper">
                        {apiData?.map((items: IApiData, index: number) => {
                            if (items.status === 1) {
                                return (
                                    <Col key={index} xs={12} sm={8} xl={6}>
                                        <div className="gp-card active" onClick={() => handleRedirect(items)}>
                                            <img src={items.btnImage} alt={items.gameCode} />
                                        </div>
                                    </Col>
                                );
                            }

                            if (items.status === 2) {
                                return (
                                    <Col key={index} xs={12} sm={8} xl={6}>
                                        <div className="gp-card testing" onClick={() => handleRedirect(items)}>
                                            <img src={items.btnImage} alt={items.gameCode} />
                                        </div>
                                    </Col>
                                );
                            }

                            return (
                                <Col key={index} xs={12} sm={8} xl={6}>
                                    <div className="gp-card inactive" onClick={() => handleRedirect(items)}>
                                        <img src={items.btnImage} alt={items.gameCode} />
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
