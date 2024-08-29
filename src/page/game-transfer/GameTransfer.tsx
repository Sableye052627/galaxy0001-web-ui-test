import { Button, Card, Col, Form, InputNumber, Row, Spin, message } from "antd";

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
import { useLocation } from 'react-router-dom';

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

interface IGpList {
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
    const { t, navigate, playerInfo, setPlayerInfo, setAgentInfo, hostname, isVertical } = useGameTransfer();
    const { category, srno, gameID } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialValue = {
        amount: playerInfo?.wallet1,
    };

    const [gameDetail, setGameDetail] = useState<IGameDetail | undefined>(undefined);
    const [gpList, setGpList] = useState<[IGpList] | undefined>(undefined);
    const [gameDownload, setGameDownload] = useState<IGameDownload | undefined>(undefined);
    const [showDownload, setShowDownload] = useState<boolean>(false);

    const location = useLocation();
    const { reload } = location.state || {};
    
    useEffect(() => {
        if(reload == 1){
            window.location.reload();
        }
    }, [reload]);

    useEffect(() => {
        getGameInfo();
    }, [category, srno]);

    async function getGameInfo() {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: category,
                AgentGpSrno: Number(srno),
            };
            const result = await gameProviderApi("/get-detail", object);
            if (result.status) {
                setGameDetail(result.data);
                setGpList(result.data2);
                // message.error(result.message);
            }
        } catch (error: any) {
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
                AgentGpSrno: Number(srno),
                GameID: gameID,
                Category: category,
                Amount: values.amount,
                CallBackUrl: window.location.href,
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
                        const item = { 
                            srno: srno,
                            category: category,
                            src: result.data.mobileUrl
                        };
                        navigate("/start-game", { state: { item } });
                    } else {
                        const item = { 
                            srno: srno,
                            category: category,
                            src: result.data.pcUrl
                        };
                        navigate("/start-game", { state: { item } });
                    }
                }
            }
        } catch (error: any) {
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
            validateToken(hostname, setPlayerInfo, setAgentInfo);
            navigate(`/select-game/${category}`);
        });
    }

    function handleRedirect(item: IGpList) {
        if (item.status === 1) {
            if (item.getGameList) {
                navigate(`/game-menu/${category}/${item.srno}`);
            } else {
                navigate(`/game-transfer/${category}/${item.srno}`);
            }
        } else {
            message.info(t("gameUnderMaintenance"));
        }
    }

    function handleRedirectBack() {
        navigate(`/select-game/${category}`);
    }

    return (
        <Row className="gp-transfer-balance" justify="center">
            <Col {...gridSetting}>
                <Spin spinning={isLoading}>
                    {/* 
                    <Row className="game-provider-menu" gutter={[16, 10]}>
                        {gpList?.map((items: IGpList, index: number) => {
                            return (
                                <Col key={index} xs={12} sm={8} md={6} xl={4}>
                                    <div className="item" onClick={() => handleRedirect(items)}>
                                        <div className="game-img">
                                            <img src={items.logoImage} alt={items.gameCode} loading="lazy" />
                                            <span className="text-behind">{items.gameName}</span> 
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                    */}
                    <Row justify="center">
                        <Col xs={24} sm={18} md={14} lg={12} xl={11} xxl={10}>
                            {isVertical ? (
                                <div className="gp-btn-v">
                                    <img src={gameDetail?.btnImage} alt={gameDetail?.gameName} />
                                </div>
                            ) : (
                                <div className="gp-btn-h">
                                    <img src={gameDetail?.bannerImage} alt={gameDetail?.gameName} />
                                </div>
                            )}

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
                                    <Button style={{marginTop:"20px"}} block size="large" type="primary" onClick={handleRedirectBack}>
                                        {t("back")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                    {showDownload && <GameDownloadModal showDownload={showDownload} setShowDownload={setShowDownload} gameDownload={gameDownload} />}
                </Spin>
            </Col>
        </Row>
    );
};

export default GameTransfer;
