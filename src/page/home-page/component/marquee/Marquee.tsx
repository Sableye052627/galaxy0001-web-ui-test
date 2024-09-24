import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction, useState  } from "react";
import "./marquee.scss";
import Marquee from "react-fast-marquee";
import { useNavigate} from "react-router-dom";
import { useMarquee } from "./hook/useMarquee";
import {
    NotificationOutlined,
    TranslationOutlined
} from "@ant-design/icons";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import LanguageModal from "../../../../component/language-modal/LanguageModal";


const GameList = () => {
    const navigate = useNavigate();
    const { t, i18n, isVertical, platformInfo } = useMarquee();
    const [lang, setLang] = useState<boolean>(false);

    const currentLng = i18n.language;
    let language = currentLng === "EN" || currentLng === "en-US" ? "burnese" : currentLng === "CN" || currentLng === "zh-CN" ? "mandarin" : "burnese";


    return (
        <div>
        <div className="neon-hr" />
        <Row justify="center">
            <Col {...gridSetting}>
                <div className="marquee">
                    <NotificationOutlined />
                    <Marquee gradient={false}>{t("marqueeText", { domainName: platformInfo?.platformName })}</Marquee>

                    <LanguageModal lang={lang} setLang={setLang} />
                    <TranslationOutlined style={{ fontSize: 20, cursor: "pointer" }} onClick={() => setLang(!lang)} />
                </div>
            </Col>
        </Row>
        <div className="neon-hr" />
        </div>
    );
};

export default GameList;

