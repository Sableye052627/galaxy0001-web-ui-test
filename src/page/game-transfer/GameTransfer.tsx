import { Button, Col, Form, InputNumber, Row, Spin, message } from "antd";

import "./game-transfer.scss";
import { gridSetting } from "../../component/main-layout/MainLayout";
import { useGameTransfer } from "./hook/useGameTransfer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { gameProviderApi, theOneApi } from "../../service/CallApi";
import Swal from "sweetalert2";
import { validateToken } from "../../function/ApiFunction";
import { formatNumber, isMobile } from "../../function/Common";
import { GameDownloadModal } from "./component/game-download-modal/GameDownloadModal";

interface IGameDetail {
    srno: number;
    gameName: string;
    gameCode: string;
    type: string;
    getGameList: number;
    logoImage: string;
    bannerImage: string;
    btnImage: string;
    status: number;
}

interface IGameDownload {
    iosDownloadUrl: string;
    androidDownloadUrl: string;
    pcUrl: string;
    mobileUrl: string;
    gameLoginID: string;
    gameLoginPassword: string;
}
const GameTransfer = () => {
    const { t, navigate, playerInfo, setPlayerInfo, hostname } = useGameTransfer();
    const { category, gameCode, gameID } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialValue = {
        amount: playerInfo?.wallet1,
    };

    const [gameDetail, setGameDetail] = useState<IGameDetail | undefined>(undefined);
    const [gameDownload, setGameDownload] = useState<IGameDownload | undefined>(undefined);
    const [showDownload, setShowDownload] = useState<boolean>(false);

    useEffect(() => {
        getGameInfo();
    }, [category, gameCode]);

    async function getGameInfo() {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: category,
                GameCode: gameCode,
            };
            const result = await gameProviderApi("/get-detail", object);
            if (result.status) {
                setGameDetail(result.data);
                message.error(result.message);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    async function handleTransfer(values: any) {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                GameCode: gameCode,
                GameID: gameID,
                Category: category,
                Amount: values.amount,
            };
            const result = await theOneApi("/game-loading", object);
            if (result.status) {
                if (gameDetail?.type === "App") {
                    setGameDownload(result.data);
                    setShowDownload(true);
                    // result.data.iosDownloadUrl
                    // result.data.androidDownloadUrl
                } else {
                    if (isMobile()) {
                        confirmRedirect(result.data.mobileUrl);
                    }
                    confirmRedirect(result.data.pcUrl);
                }
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    function confirmRedirect(url: string) {
        Swal.fire({
            text: t("redirectToGameNow"),
            icon: "info",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign(url);
                return;
            }
            validateToken(hostname, setPlayerInfo);
            navigate(`/play-game/${category}`);
        });
    }

    return (
        <div className="gp-transfer-balance">
            <Spin spinning={isLoading}>
                <Row justify="center">
                    <Col xs={24} sm={18} md={14} lg={12} xl={11} xxl={10}>
                        <div className="gp-btn">
                            <img src={gameDetail?.btnImage} alt={gameDetail?.gameName} />
                        </div>

                        <Form layout="vertical" initialValues={initialValue} onFinish={handleTransfer}>
                            <Form.Item
                                label={t("amount")}
                                name="amount"
                                rules={[
                                    { required: true, message: t("pleaseInsertAmount") },
                                    {
                                        type: "number",
                                        min: 0,
                                        max: playerInfo?.wallet1,
                                        message: "Amount must between 0.00 and " + formatNumber(playerInfo?.wallet1),
                                    },
                                ]}
                            >
                                <InputNumber precision={2} size="large" style={{ width: "100%" }} controls={false} />
                            </Form.Item>

                            <Form.Item>
                                <Button block size="large" danger type="primary" htmlType="submit">
                                    {t("transferAndPlay")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                {showDownload && <GameDownloadModal showDownload={showDownload} setShowDownload={setShowDownload} gameDownload={gameDownload} />}
            </Spin>
        </div>
    );
};

export default GameTransfer;
