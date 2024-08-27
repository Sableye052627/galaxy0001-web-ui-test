import { Button, Col, Form, InputNumber, Row, Spin, message } from "antd";
import { useGameLayout } from "./hook/useGameLayout";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

const IframeComponent = () => {
  const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, windowWidth, windowHeight } = useGameLayout();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue = {
      amount: playerInfo?.wallet1,
  };
  const location = useLocation();
  const { item } = location.state || {};

  function confirmGoBack() {
      Swal.fire({
          text: t("confirmToExit"),
          icon: "info",
          showCancelButton: true,
          color: "#fff",
          background: "#434343",
      }).then((result) => {
          if (result.isConfirmed) {
            handleRedirectBack();
          }
      });
  }

  function handleRedirectBack(){
    navigate(`/game-transfer/${item.category}/${item.srno}`);
  }

  return (
    <div style={{ position: 'relative', width: windowWidth, height: windowHeight }}>
    <img 
      src="https://game-platform.sgp1.digitaloceanspaces.com/mb-app-h5-v2/button/close.png"
      alt="Return Button"
      style={{
        position: 'absolute',
        top: 10, // Adjust these values as needed
        left: 10,
        zIndex: 1, // Ensure the button appears above other elements
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        cursor: 'pointer'
      }}
      onClick={()=>confirmGoBack()}
     />
      
      <Row justify="center">
        <iframe style={{ width: windowWidth, height: windowHeight }} src={item.src}></iframe>
      </Row>
    </div>
  );
};

export default IframeComponent; 