import { Outlet } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";

import "./main-layout.scss";
import Navbar from "./component/navbar/Navbar";
import NavbarSec from "./component/navbar-sec/NavbarSec";
import Footer from "./component/footer/Footer";
import { useMainLayout } from "./hook/useMainLayout";

export const gridSetting = { xxl: 18, xs: 23 };

const MainLayout = () => {
    const { t, navigate, platformInfo, agentInfo, windowWidth } = useMainLayout();

    // const agentContact = [
    //     {
    //         srno: 1,
    //         contactType: "Whatsapp",
    //         url: "asd",
    //     },
    //     {
    //         srno: 2,
    //         contactType: "Telegram",
    //         url: "asd",
    //     },
    // ];
    return (
        <div id="main-layout">
            <Navbar />
            <div className="neon-hr" />

            {windowWidth > 991 && <NavbarSec />}
            {windowWidth > 991 && <div className="neon-hr" />}

            <Outlet />
            {/* <div className="neon-hr" /> */}

            <Footer />

            <div className="contact-us-float" hidden={!agentInfo || agentInfo[0] === undefined}>
                <div className="content">
                    {agentInfo?.map((items: any, index: number) => (
                        <div className="items" key={index} onClick={() => window.open(items.redirectUrl)}>
                            {platformInfo?.platformName?.toUpperCase()} @ {items?.contactType?.toUpperCase()}
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
