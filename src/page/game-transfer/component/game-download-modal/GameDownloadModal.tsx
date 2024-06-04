import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./game-download-modal.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { downloadApp } from "../../../../asset/Asset";

interface IGameDownload {
    iosDownloadUrl: string;
    androidDownloadUrl: string;
    pcUrl: string;
    mobileUrl: string;
    gameLoginID: string;
    gameLoginPassword: string;
}

interface IGameDownloadModalProps {
    showDownload: boolean;
    setShowDownload: Dispatch<SetStateAction<boolean>>;
    gameDownload: IGameDownload | undefined;
}

export const GameDownloadModal = ({ showDownload, setShowDownload, gameDownload }: IGameDownloadModalProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const modalSetting = {
        className: "game-dowanload-modal",
        title: t("downloadGame"),
        open: showDownload,
        centered: true,
        closable: false,
        footer: null,
        onCancel: () => handleClose(),
        destroyOnClose: true,
    };

    function handleClose() {
        setShowDownload(false);
        navigate("/");
    }

    function handleDownload(type: string) {
        if (type === "android" && gameDownload?.androidDownloadUrl !== "") {
            window.open(gameDownload?.androidDownloadUrl);
            return;
        }
        if (type === "ios" && gameDownload?.iosDownloadUrl !== "") {
            window.open(gameDownload?.iosDownloadUrl);
            return;
        } else {
            message.error(t("comingSoon"));
        }
    }

    return (
        <Modal {...modalSetting}>
            <div className="gp-download">
                <Row justify="center">
                    <Col xs={24}>
                        <Form layout="vertical" initialValues={gameDownload}>
                            <Form.Item label={t("gameLoginID")} name="gameLoginID">
                                <Input disabled size="large" />
                            </Form.Item>

                            <Form.Item label={t("gamePassword")} name="gamePassword">
                                <Input disabled size="large" />
                            </Form.Item>
                        </Form>

                        <Row gutter={[16, 16]}>
                            <Col xs={12}>
                                <div className="btn-app" hidden={!gameDownload?.androidDownloadUrl} onClick={() => handleDownload("android")}>
                                    <img src={downloadApp[0].url} alt={downloadApp[0].key} />
                                </div>
                            </Col>

                            <Col xs={12}>
                                <div className="btn-app" hidden={!gameDownload?.iosDownloadUrl} onClick={() => handleDownload("ios")}>
                                    <img src={downloadApp[1].url} alt={downloadApp[1].key} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};
