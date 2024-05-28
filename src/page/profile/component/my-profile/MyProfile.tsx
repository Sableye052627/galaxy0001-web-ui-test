import { Col, Descriptions, Row } from "antd";

import "./my-profile.scss";
import { useMyProfile } from "./hook/useMyProfile";
import { formatNumber } from "../../../../function/Common";
import dayjs from "dayjs";

const MyProfile = () => {
    const { t, navigate, platformInfo, playerInfo } = useMyProfile();

    const settings = {
        labelStyle: { color: "#000", backgroundColor: platformInfo?.secondaryColor, borderBottom: `1px solid ${platformInfo?.primaryColor}` },
        contentStyle: { color: "#fff", borderBottom: `1px solid ${platformInfo?.primaryColor}` },
    };
    const settings_2 = {
        labelStyle: { color: "#000", backgroundColor: platformInfo?.secondaryColor },
        contentStyle: { color: "#fff" },
    };

    return (
        <div className="my-profile">
            <Descriptions column={1} bordered>
                <Descriptions.Item label={t("playerID")} {...settings}>
                    {playerInfo?.playerID}
                </Descriptions.Item>

                <Descriptions.Item label={t("balance")} {...settings}>
                    {formatNumber(playerInfo?.wallet1)}
                </Descriptions.Item>

                <Descriptions.Item label={t("phoneNumber")} {...settings}>
                    {playerInfo?.phoneNo ? playerInfo.phoneNo : "-"}
                </Descriptions.Item>

                <Descriptions.Item label={t("agentID")} {...settings}>
                    {playerInfo?.agentID}
                </Descriptions.Item>

                <Descriptions.Item label={t("registerDate")} {...settings_2}>
                    {dayjs(playerInfo?.createDate).format("DD-MM-YYYY HH:mm:ss")}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default MyProfile;
