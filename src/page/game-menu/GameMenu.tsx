import { Col, Row, Spin, message } from "antd";

import "./game-menu.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameMenu } from "./hook/useGameMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { theOneApi } from "../../service/CallApi";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";
import { Player } from "../../context/player/PlayerContext";
import { isMobile } from "../../function/Common";

interface IGame {
    displayName: string;
    gameType: string;
    gameID: string;
    imageUrl: string;
}

interface IGameDetail {
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

interface IGameDownload {
    iosDownloadUrl: string;
    androidDownloadUrl: string;
    pcUrl: string;
    mobileUrl: string;
    gameLoginID: string;
    gameLoginPassword: string;
}

const GameMenu = () => {
    const { t, navigate, hostname } = useGameMenu();
    const { category, srno } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGameLoading, setIsGameLoading] = useState<boolean>(false); 
    
    const [gameList, setGameList] = useState<IGame[] | []>([]);
  
    const playerContext = useContext(Player);
    const { playerInfo } = playerContext;
  
    const [gameDetail, setGameDetail] = useState<IGameDetail | undefined>(undefined);
    const [gameDownload, setGameDownload] = useState<IGameDownload | undefined>(undefined);
    const [showDownload, setShowDownload] = useState<boolean>(false);

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
    
    async function handleTransfer(category: string, gameID: string, srno: string, amount: number) {
      setIsGameLoading(true); // Set loading to true when the user clicks
      try {
          const object = {
              Hostname: hostname,
              PlayerID: Cookies.get("PlayerID"),
              PlayerToken: Cookies.get("PlayerToken"),
              AgentGpSrno: Number(srno),
              GameID: gameID,
              Category: category,
              Amount: amount,
              CallBackUrl: window.location.href,
          };
          const result = await theOneApi("/game-loading", object);
          if (result.status) {
              if (gameDetail?.type === "App") {
                  setGameDownload(result.data);
                  setShowDownload(true);
              } else {
                  if (isMobile()) {
                      const item = { 
                          srno: srno,
                          category: category,
                          src: result.data.mobileUrl
                      };
                      navigate("/start-game", { state: { item } });
                      //console.log(playerInfo?.wallet1)
                  } else {
                      const item = { 
                          srno: srno,
                          category: category,
                          src: result.data.pcUrl
                      };
                      navigate("/start-game", { state: { item } });
                      //console.log(playerInfo?.wallet1)
                  }
              }
          }
      } catch (error: any) {
          console.log(error);
          message.info(t("gameUnderMaintenance"));
      }
      setIsGameLoading(false); // Set loading to false after the transfer
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
                                <div className="item" onClick={() => handleTransfer(category ?? "", items.gameID, srno ?? "", playerInfo?.wallet1 ?? 0)} style={{ position: "relative" }}>
                                    <div className="game-img">
                                        <img src={items.imageUrl} alt={items.gameID} loading="lazy" style={{ opacity: isGameLoading ? 0.5 : 1 }} />
  
                                            {/* Spinner on top of the image when loading */}
                                            {isGameLoading && (
                                                <div className="spin-overlay" style={{ 
                                                    position: "absolute", 
                                                    top: "50%", 
                                                    left: "50%", 
                                                    transform: "translate(-50%, -50%)", 
                                                    display: "flex", 
                                                    justifyContent: "center", 
                                                    alignItems: "center",
                                                    width: "100%", 
                                                    height: "100%" 
                                                    }}>
                                                    <Spin size="large" />
                                                </div>
                                            )}
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
