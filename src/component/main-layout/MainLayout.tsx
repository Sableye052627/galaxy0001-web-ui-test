import { Outlet } from "react-router-dom";

import "./main-layout.scss";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import NavbarSec from "./navbar-sec/NavbarSec";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
    return (
        <div id="main-layout">
            <Navbar />
            <div className="neon-hr" />
            <NavbarSec />
            <div className="neon-hr" />
            <Outlet />
            <div className="neon-hr" />
            <Footer />
        </div>
    );
};

export default MainLayout;
