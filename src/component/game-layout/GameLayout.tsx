  import { Button, Col, Form, InputNumber, Row, Spin, message } from "antd";
  import { useGameLayout } from "./hook/useGameLayout";
  import { theOneApi, playerApi } from "../../service/CallApi";
  import { gridSetting } from "../../component/main-layout/MainLayout";
  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import Cookies from "js-cookie";
  import { useLocation } from 'react-router-dom';
  import Swal from "sweetalert2";
  import { validateToken } from "../../function/ApiFunction";
  import "./gameLayout.scss";
  import { CaretDownFilled } from "@ant-design/icons";

  interface IGameAccountType {
    srno: number;
    gameCode: string;
    gameName: string;
    currency: string;
    gameLoginID: string;
    score: number;
    isChecked: boolean;
    isAvailableToTransfer: boolean;
    createDate: Date;
    agentGpSrno: number;
  }

  const IframeComponent = () => {
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, windowWidth, windowHeight, isVertical } = useGameLayout();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gameSrc, setGameSrc] = useState<string>('');
    const location = useLocation();
    const { item } = location.state || {};

    // State to manage the active class
    const [isTopBarActive, setIsTopBarActive] = useState(false);

    // Toggle the active state on click
    const handleToggle = () => {
        setIsTopBarActive(!isTopBarActive);
    };
    
    useEffect(() => {
      setGameSrc(item.src);
    }, [item]);

    function confirmGoBack() {
        Swal.fire({
            text: t("confirmToExit"),
            icon: "info",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
              console.log("confirmed")
              handleGetBalance();
            }
        });
    }

  async function handleGetBalance() {
    const object = { 
      Hostname: hostname,
      PlayerID: Cookies.get("PlayerID"), 
      PlayerToken: Cookies.get("PlayerToken"), 
      AgentGpSrno: item.srno
    };

    await playerApi("/game-account/get-balance", object)
      .then((result) => {
        console.log("get balance")
        handleWithdrawBalance(result.data.balance);
      })
      .catch((error) => message.error({ content: t(error?.response?.data?.message?.replace(/ /g, "")), key: error?.response?.data?.message }));
    }

    async function handleWithdrawBalance(balance: number) {
      navigate(`/select-game/${item.category}`);
      if (balance > 0) {
        const object = { 
          Hostname: hostname,
          PlayerID: Cookies.get("PlayerID"), 
          PlayerToken: Cookies.get("PlayerToken"), 
          AgentGpSrno: item.srno,
          Balance: balance
        };
        await playerApi("/game-account/withdraw-balance", object)
          .then((result) => {
            validateToken(hostname, setPlayerInfo, setAgentInfo);
          })
          .catch((error) => message.error({ content: t(error?.response?.data?.message?.replace(/ /g, "")), key: error?.response?.data?.message }));
      }
    }

    return (
      <div style={{ position: 'relative', width: windowWidth, height: windowHeight }}>
        
        <Row justify="center">
          <iframe id="gameFrame" style={{ width: windowWidth, height: windowHeight }} src={gameSrc} allowFullScreen></iframe>
        </Row>

        <div className={`contact-us-float ${isTopBarActive ? 'active' : ''}`} onClick={handleToggle}>
          <img 
          src="https://game-platform.sgp1.digitaloceanspaces.com/mb-app-h5-v2/button/close.png"
          alt="Return Button"
          className="return-btn"
          onClick={()=>confirmGoBack()}
          />
          <div className="button">
            <div className="title">
              <CaretDownFilled />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default IframeComponent; 