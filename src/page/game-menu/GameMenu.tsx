import { Col, Row, message } from "antd";

import "./game-menu.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameMenu } from "./hook/useGameMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { theOneApi } from "../../service/CallApi";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";

interface IGame {
    displayName: string;
    gameType: string;
    gameID: string;
    imageUrl: string;
}

const GameMenu = () => {
    const { t, navigate, hostname } = useGameMenu();
    const { category, srno } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gameList, setGameList] = useState<IGame[] | []>([]);

    useEffect(() => {
        getGameInfo();
    }, [category, srno]);

    async function getGameInfo() {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: category,
                AgentGpSrno: Number(srno),
            };
            const result = await theOneApi("/get-game-list", object);
            if (result.status) {
                setGameList(result.data);

                // message.error(result.message);
            }
        } catch (error: any) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    function handleRedirect(items: any) {
        navigate(`/game-transfer/${category}/${srno}/${items.gameID}`);
    }

    if (isLoading) {
        return <LazyLoad />;
    }

    return (
        <Row className="game-menu" justify="center">
            <Col {...gridSetting}>
                <Row className="game-provider-menu" gutter={[16, 10]}>
                    {gameList?.map((items: IGame, index: number) => {
                        return (
                            <Col key={index} xs={12} sm={8} md={6} xl={4}>
                                <div className="item" onClick={() => handleRedirect(items)}>
                                    <div className="game-img">
                                        <img src={items.imageUrl} alt={items.gameID} loading="lazy" />
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>

                {/* {game?.isTransfer && <GpTransferBalance game={game} />}
                {!game?.isApp && <GpGameList gameList={gameList} />} */}
            </Col>
        </Row>
    );
};

export default GameMenu;
