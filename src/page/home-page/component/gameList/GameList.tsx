import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./game-list.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gameProviderApi } from "../../../../service/CallApi";
import { LazyLoad } from "../../../loading/lazy-load/LazyLoad";
import { useNavigate } from "react-router-dom";
import { useGameList } from "./hook/useGameList";
import { downloadApp } from "../../../../asset/Asset";

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

const GameList = () => {
    const navigate = useNavigate();
    const { t, hostname, isVertical } = useGameList();

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
          navigate(`/game-transfer/${category}/${item.srno}`);
        }
      } else {
        message.info(t("gameUnderMaintenance"));
      }
    }
  
    if (isLoading) {
      return <LazyLoad />;
    }

    return (
        <div className={`${isVertical ? "v" : "h"}-game-container`}>
            <div className="game-wrapper">
                {apiData?.map((items: IApiData, index: number) => (
                    <div key={index} className="game" onClick={() => handleRedirect(items)}>
                        <img src={items.btnImage} alt={items.gameCode} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameList;

