import { useProfile } from "./hook/useProfile";
import { Col, Row } from "antd";

import "./profile.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useParams } from "react-router-dom";
import MyProfile from "./component/my-profile/MyProfile";
import ChangePassword from "./component/change-password/ChangePassword";
import Deposit from "./component/deposit/Deposit";
import Withdraw from "./component/withdraw/Withdraw";
import TransactionHistory from "./component/transaction-history/TransactionHistory";
import GameAccount from "./component/game-account/GameAccount";

const Profile = () => {
    const { t, navigate, platformInfo } = useProfile();
    const { key } = useParams();

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

    return (
        <div className="profile-wrapper">
            {/* {windowWidth <= 992 && (
                <>
                    <Carousel autoplay dots={false}>
                        {banner?.map((items, index) => (
                            <div key={index} className="banner-img">
                                <img src={items.image} alt={items.title} />
                            </div>
                        ))}
                    </Carousel>
                    <div className="neon-hr" />

                    <div className="marquee">
                        <TbSpeakerphone style={{ fontSize: 20 }} />
                        <Marquee gradient={false}>{t("marqueeText")}</Marquee>
                    </div>
                    <div className="neon-hr" />
                </>
            )} */}

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
