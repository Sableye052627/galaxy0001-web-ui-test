import { Outlet } from "react-router-dom";
import { HomeFilled, SettingFilled, FileFilled } from "@ant-design/icons";

import "./main-layout.scss";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import NavbarSec from "./component/navbar-sec/NavbarSec";
import NavbarInfo from "./component/navbar-info/NavbarInfo";
import Jackpot from "./component/jackpot/jackpot";
import Footer from "./component/footer/Footer";
import { useMainLayout } from "./hook/useMainLayout";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
    const { t, navigate, playerInfo, isVertical } = useMainLayout();

    const location = useLocation();

    useEffect(() => {
      console.log(location.pathname);
      if (!playerInfo) {
        navigate("/login");
        return;
      }
      else{
        
      }
    }, []);
    
    return (
        <div id="main-layout" >
            <Navbar />
            {isVertical && <NavbarInfo /> }
            {isVertical && location.pathname.includes("select-game/") && <Jackpot /> }
            <Outlet />
            {!isVertical && (
              <Footer />
            ) }
            {/*
            : (
              <div className="tab-bar">
                <div className="tab"><FileFilled  style={{ fontSize: '150%'}} onClick={() => navigate("/suggestion")}/></div>
                <div className="tab" ><HomeFilled  style={{ fontSize: '150%'}} onClick={() => navigate("/select-game/live")}/></div>
                <div className="tab" ><SettingFilled  style={{ fontSize: '150%'}} /></div>
              </div> 
            )}  
            */}
        </div>
    );
};

export default MainLayout;
