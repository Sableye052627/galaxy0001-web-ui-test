import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

import "./main-layout.scss";
import Navbar from "./navbar/Navbar";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
  return (
    <div id="main-layout">
      <Navbar />
      <div className="neon-hr" />
      <Outlet />
    </div>
  );
};

export default MainLayout;
