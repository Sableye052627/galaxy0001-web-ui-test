import { Col, Row, message } from "antd";

import "./game-lobby.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameLobby } from "./hook/useGameLobby";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { gameProviderApi } from "../../service/CallApi";
import { LazyLoad } from "../loading/lazy-load/LazyLoad";
import { getPlatformInfo } from "../../function/ApiFunction";
import { Player } from "../../context/player/PlayerContext";
import { PlayGame } from "../../context/PlayGameContext";

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
  const { t, navigate, platformInfo, hostname } = useGameLobby();
  const { category } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [apiData, setApiData] = useState<IApiData[] | []>([]);
  
  const playerContext = useContext(Player);
  const { playerInfo } = playerContext;
  
  const playGameContext = useContext(PlayGame);
  const { getGameInfo, handleTransfer } = playGameContext;

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
    } catch (error: any) {
      message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
    }
    setIsLoading(false);
  }

  function handleRedirect(item: IApiData) {
    // if (item.status === 1 || (playerInfo?.agentSrno === 18 && item.status === 2)) {
    if (item.status === 1) {
      if (item.getGameList === 1) {
        navigate(`/game-menu/${category}/${item.srno}`);
      } else {
        //navigate(`/game-transfer/${category}/${item.srno}`);
        handleTransfer(category ?? "", "", item.srno.toString(), playerInfo?.wallet1 ?? 0)

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
        <img src={`https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/game-banner/${category?.toUpperCase()}.png`} alt="" />
      </div>
      <div className="neon-hr" />
      <Row className="game-provider" justify="center">
        <Col {...gridSetting}>
          <Row gutter={[20, 20]} className="gp-card-wrapper">
            {apiData?.map((items: IApiData, index: number) => (
              <Col key={index} xs={12} sm={8} xl={6}>
                <div className={`gp-card ${items.status === 1 ? "active" : items.status === 2 ? "testing" : "inactive"}`} onClick={() => handleRedirect(items)}>
                  <img src={items.btnImage} alt={items.gameCode} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default GameLobby;
