import { useFooter } from "./hook/useFooter";
import { Col, Row } from "antd";

import "./footer.scss";
import { gridSetting } from "../../MainLayout";
import { useState } from "react";
import LanguageModal from "../../../language-modal/LanguageModal";

const Footer = () => {
    const { t, navigate, platformInfo, windowWidth } = useFooter();
    const [lang, setLang] = useState(false);

    return (
        <Row className="footer" justify="center">
            <Col {...gridSetting}>
                <Row className="footer-item" gutter={[0, 20]} hidden={windowWidth < 576}>
                    <Col xs={24} sm={12} lg={8}>
                        <div className="download-app">
                            <div className="title">{t("downloadApp")}</div>
                            {/* <Row className="content">
                                {downloadApp.map((items) => (
                                    <Col key={items.key} xs={11} sm={11} lg={6} xl={8}>
                                        <div className="download-app-btn" disabled={items.disabled}>
                                            <img src={items.url} alt={items.key} />
                                        </div>
                                    </Col>
                                ))}
                            </Row> */}
                        </div>
                    </Col>

                    <Col xs={24} sm={12} lg={6} xl={8}>
                        <div className="contact-us">
                            <div className="title">{t("contactUs")}</div>
                            {/* <div className="content">
                                {agentContact?.map((items, index) => (
                                    <div key={index} className="item" onClick={() => window.open(items.url)}>
                                        <span>{`${
                                            t(items.contactType) + logoInfo?.platformName?.toUpperCase()
                                        } @ ${items?.contactType?.toUpperCase()}`}</span>
                                    </div>
                                ))}

                                {(!agentContact || agentContact[0] === undefined) && <div className="item">-</div>}
                            </div> */}
                        </div>
                    </Col>

                    <Col xs={24} sm={12} lg={10} xl={8}>
                        <div className="product-info">
                            <div className="product">
                                <div className="title">{t("product")}</div>
                                {/* <div className="content">
                                    {gameCategory?.map((items, index) => (
                                        <div key={index} className="item">
                                            {t(items.title)}
                                        </div>
                                    ))}

                                    {gameCategory[0] === undefined && <div className="item">-</div>}
                                </div> */}
                            </div>

                            <div className="info">
                                <LanguageModal lang={lang} setLang={setLang} />

                                <div className="title">{t("info")}</div>
                                <div className="content">
                                    <div className="item" onClick={() => setLang(!lang)}>
                                        {t("language")}
                                    </div>
                                    <div className="item">{t("termsAndConditions")}</div>
                                    <div className="item">{t("faq")}</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="footer-item" style={{ marginTop: 50 }} hidden={windowWidth < 576}>
                    <Col xl={8}>
                        <div className="payment-method">
                            <div className="title">{t("depositMethod")}</div>
                            <div className="content">
                                <div className="item">{t("onlineBanking")}</div>
                                <div className="item">{t("eWallet")}</div>
                                <div className="item">{t("telco")}</div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="footer-remark">COPYRIGHT © {platformInfo?.accountPrefix?.toUpperCase()} 2022. ALL RIGHTS RESERVED</div>
            </Col>
        </Row>
    );
};

export default Footer;
