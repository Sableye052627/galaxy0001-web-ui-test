import { Outlet } from "react-router-dom";
import { HomeFilled, SettingFilled, FileFilled } from "@ant-design/icons";

import "./main-layout.scss";
import { useEffect, useState } from "react";
import Navbar from "./component/navbar/Navbar";
import NavbarSec from "./component/navbar-sec/NavbarSec";
import Footer from "./component/footer/Footer";
import { useMainLayout } from "./hook/useMainLayout";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
    const { t, navigate, playerInfo, isVertical } = useMainLayout();

    useEffect(() => {
      if (!playerInfo) {
        navigate("/login");
        return;
      }
    }, []);
    
    return (
        <div id="main-layout">
            <Navbar />
            <Outlet />
            {!isVertical ? (
              <Footer />
            ) : (

              <div className="tab-bar">
                <div className="tab"><FileFilled  style={{ fontSize: '150%'}} onClick={() => navigate("/suggestion")}/></div>
                <div className="tab" ><HomeFilled  style={{ fontSize: '150%'}} onClick={() => navigate("/play-game/live")}/></div>
                <div className="tab" ><SettingFilled  style={{ fontSize: '150%'}} /></div>
              </div>  
            )}
        </div>
    );
};

export default MainLayout;
