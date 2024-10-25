import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction, useState  } from "react";
import "./h-marquee.scss";
import Marquee from "react-fast-marquee";
import { useNavigate} from "react-router-dom";
import { useHMarquee } from "./hook/useHMarquee";
import {
    NotificationOutlined,
    TranslationOutlined
} from "@ant-design/icons";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import LanguageModal from "../../../../component/language-modal/LanguageModal";
import { websiteName } from "../../../../function/Common";

const HMarquee = () => {
    const navigate = useNavigate();
    const { t, i18n, isVertical, platformInfo } = useHMarquee();
    const [lang, setLang] = useState<boolean>(false);

    const currentLng = i18n.language;
    let language = currentLng === "EN" || currentLng === "en-US" ? "english" : currentLng === "CN" || currentLng === "zh-CN" ? "mandarin" : "burnese";


    return (
        <div>
            <Row justify="center">
                <Col {...gridSetting}>
                    <div className="h-container">
                        <div className="h-marquee-container">
                            <img className="h-marquee-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/annoucement-icon.png" alt="" />
                            <Marquee className="h-marquee-text" gradient={false}>
                                {t("marqueeText", { domainName: platformInfo?.platformName, websiteName: websiteName })}
                            </Marquee>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HMarquee;

