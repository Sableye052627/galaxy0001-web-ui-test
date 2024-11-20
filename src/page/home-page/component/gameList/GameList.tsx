import { Col, Form, Input, Modal, Row, Spin, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./game-list.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { theOneApi, gameProviderApi } from "../../../../service/CallApi";
import { LazyLoad } from "../../../loading/lazy-load/LazyLoad";
import { useNavigate } from "react-router-dom";
import { useGameList } from "./hook/useGameList";
import { downloadApp } from "../../../../asset/Asset";
import { Player } from "../../../../context/player/PlayerContext";
import { isMobile } from "../../../../function/Common";
import { getMyIp } from "../../../../function/IPFunction";

interface IApiData {
  srno: number;
  gameName: string;
  gameCode: string;
  type: string;
  getGameList: number;
  logoImage: string;
  bannerImage: string;
  btnImage: string;
  btnImage_V: string;
  btnImage_H: string;
  status: number;
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

const GameList = () => {
  const navigate = useNavigate();
  const { t, hostname, isVertical } = useGameList();

  const { category } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGameLoading, setIsGameLoading] = useState<boolean>(false);

  const [apiData, setApiData] = useState<IApiData[] | []>([]);

  const playerContext = useContext(Player);
  const { playerInfo } = playerContext;

  const [gameDetail, setGameDetail] = useState<IGameDetail | undefined>(undefined);
  const [gameDownload, setGameDownload] = useState<IGameDownload | undefined>(undefined);
  const [showDownload, setShowDownload] = useState<boolean>(false);

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
    console.log(playerInfo);
    if ((playerInfo?.playerType == "2" || item.status === 1) && !isGameLoading) {
      setIsGameLoading(true); // Set loading to true when the user clicks

      if (item.getGameList === 1) {
        navigate(`/game-menu/${category}/${item.srno}`);
      } else {
        handleTransfer(category ?? "", "", item.srno.toString(), playerInfo?.wallet1 ?? 0);
        //console.log( playerInfo?.wallet1 );
      }
    } else {
      message.info(t("gameUnderMaintenance"));
    }
  }

  async function handleTransfer(category: string, gameID: string, srno: string, amount: number) {
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
        IP: await getMyIp(),
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
              src: result.data.mobileUrl,
            };
            navigate("/start-game", { state: { item } });
          } else {
            const item = {
              srno: srno,
              category: category,
              src: result.data.pcUrl,
            };
            navigate("/start-game", { state: { item } });
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
    <div className={`${isVertical ? "v" : "h"}-game-container`}>
      <div className="game-wrapper">
        {apiData?.map((items: IApiData, index: number) => (
          <div key={index} className="game" onClick={() => handleRedirect(items)} style={{ position: "relative" }}>
            {/* Image */}
            <img src={items.btnImage} alt={items.gameCode} style={{ opacity: isGameLoading ? 0.5 : 1 }} />

            {/* Spinner on top of the image when loading */}
            {isGameLoading && (
              <div
                className="spin-overlay"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
