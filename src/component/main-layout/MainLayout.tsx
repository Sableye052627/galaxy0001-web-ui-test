import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
  return (
    <div id="main-layout">
      <Outlet />
    </div>
  );
};

export default MainLayout;
