import { Outlet } from "react-router-dom";

import "./main-layout.scss";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import NavbarSec from "./navbar-sec/NavbarSec";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
    const agentContact = [
        {
            srno: 1,
            contactType: "Whatsapp",
            url: "",
        },
        {
            srno: 2,
            contactType: "Telegram",
            url: "",
        },
    ];
    return (
        <div id="main-layout">
            <Navbar />
            <div className="neon-hr" />
            <NavbarSec />
            <div className="neon-hr" />
            <Outlet />
            <div className="neon-hr" />
            <Footer />

            <div className="contact-us-float" hidden={!agentContact || agentContact[0] === undefined}>
                <div className="content">
                    {agentContact?.map((items, index) => (
                        <div className="items" key={index} onClick={() => window.open(items.url)}>
                            {logoInfo?.domainName?.toUpperCase()} @ {items?.contactType?.toUpperCase()}
                        </div>
                    ))}
                </div>

                <div className="title">
                    {t("contactUs")}
                    <PhoneOutlined />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
