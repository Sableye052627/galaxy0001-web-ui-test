import { useProfile } from "./hook/useProfile";
import { Col, Row } from "antd";

import "./profile.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useParams } from "react-router-dom";
import { Parallax, Background } from "react-parallax";
import MyProfile from "./component/my-profile/MyProfile";
import ChangePassword from "./component/change-password/ChangePassword";
import TopUpBalance from "./component/top-up-balance/TopUpBalance";
import Deposit from "./component/deposit/Deposit";
import Withdraw from "./component/withdraw/Withdraw";
import TransactionHistory from "./component/transaction-history/TransactionHistory";
import GameAccount from "./component/game-account/GameAccount";

const Profile = () => {
    const { t, navigate, windowWidth, gpCategory, platformInfo } = useProfile();
    const { key } = useParams();
    const pathname = window.location.pathname.split("/");

    const profileMenuItems = [
        {
            key: "my-profile",
            label: "myProfile",
        },
        {
            key: "change-password",
            label: "changePassword",
        },
        {
            key: "top-up-balance",
            label: "topUpBalance",
        },
        {
            key: "deposit-balance",
            label: "deposit",
            hidden: platformInfo?.cdM_Deposit === 0,
        },
        {
            key: "withdraw-balance",
            label: "withdraw",
            hidden: platformInfo?.cdM_Withdrawal === 0,
        },
        {
            key: "transaction-history",
            label: "transactionHistory",
        },
        {
            key: "game-account",
            label: "gameAccount",
        },
    ].filter((item) => !item.hidden);

    function handleRedirect(item: any) {
        navigate(`/player-info/${item.key}`);
    }

    function handleRedirect2(path: string) {
        navigate(`/select-game/${path?.toLocaleLowerCase()}`);
    }

    function handleRedirect3(path: string) {
        navigate(`${path?.toLocaleLowerCase()}`);
    }

    return (
        <div className="profile-wrapper">

        <div className="neon-hr" />
            <Row className="navbar-sec" justify="center" align="middle">
                <Col {...gridSetting}>
                    <Row justify="space-around" align="middle">
                        <Col>
                            <div className={`item ${pathname[1] === ""}`} onClick={() => handleRedirect3("/")}>
                                {/* <img src={homeIcon} alt="home" /> */}
                                {t("home")}
                            </div>
                        </Col>

                        {gpCategory?.map((items: any, index: number) => (
                            <Col key={index}>
                                <div
                                    className={`item ${pathname[2] === items.category.toLocaleLowerCase()}`}
                                    onClick={() => handleRedirect2(items.category)}
                                >
                                    {/* <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/${items.category}.png`}
                                        alt={items.category}
                                    /> */}
                                    {t(items.category.toLocaleLowerCase())} 
                                </div>
                            </Col>
                        ))}

                        <Col>
                            <div className={`item ${pathname[1] === "suggestion"}`} onClick={() => handleRedirect3("/suggestion")}>
                                {/* <img src={suggestionIcon} alt="suggestion" /> */}
                                {t("suggestion")}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>  

            {/* 

            {windowWidth <= 991 && (
                <Parallax blur={2} strength={500} className="sm-menu">
                    <Background className="custom-bg">
                        <div
                            style={{
                                height: 500,
                                width: windowWidth,
                                backgroundImage: "url('https://game-platform.sgp1.digitaloceanspaces.com/win22/sm-home-menu-bg.png')",
                            }}
                        />
                    </Background>
                    <Row gutter={[16, 16]} justify="center">
                        {gpCategory?.map((items: any, index: number) => (
                            <Col key={index} xs={6}>
                                <div className="sm-menu-item" onClick={() => handleRedirect(items.category)}>
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/${items.category}.png`}
                                        alt={items.category}
                                    />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Parallax>
            )}
            */}
        <div className="neon-hr" />

            <Row className="profile" justify="center">
                <Col {...gridSetting}>
                    <div className="profile-menu">
                        {profileMenuItems.map((items) => (
                            <div key={items.key} className={`item ${key === items.key}`}>
                                <span onClick={() => handleRedirect(items)}>{t(items.label)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="content">
                        {key === "my-profile" && <MyProfile />}
                        {/* {key === "change-password" && <ChangePassword banner={banner} />} */}
                        {key === "change-password" && <ChangePassword />}
                        {key === "top-up-balance" && <TopUpBalance />}
                        {key === "deposit-balance" && <Deposit />}
                        {key === "withdraw-balance" && <Withdraw />}
                        {key === "transaction-history" && <TransactionHistory />}
                        {key === "game-account" && <GameAccount />}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
