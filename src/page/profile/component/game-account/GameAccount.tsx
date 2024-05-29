import { Button, Col, Row, Space, Spin, Table } from "antd";

import "./game-account.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useGameAccount } from "./hook/useGameAccount";
import { useState } from "react";
import { formatNumber } from "../../../../function/Common";

const GameAccount = () => {
    const { t, navigate, platformInfo, playerInfo } = useGameAccount();
    const [isLoading, setIsLoading] = useState(false);

    async function handleCheck(record: any) {
        // setCurrentGp(record.srno);
        // try {
        //   const object = {
        //     PlatformName: logoInfo?.platformName,
        //     PlayerID: localStorage.getItem("PlayerID"),
        //     PlayerToken: localStorage.getItem("PlayerToken"),
        //     GameCode: record.gameCode,
        //   };
        //   const result = await gameApi("/get-game-balance", object);
        //   if (result.status) {
        //     apiData.filter(function (item) {
        //       if (item.srno === record.srno) {
        //         item.balance = result.data.balance;
        //         item.isCheck = result.data.isCheck;
        //       }
        //     });
        //   }
        // } catch (error) {
        //   message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        // }
        // setCurrentGp();
    }

    async function handleWithdraw(record: any) {
        // if (record.balance <= 0) {
        //   message.info(t("noCreditInsideGame"));
        //   return;
        // }
        // setWithdrawGp(record.srno);
        // try {
        //   const object = {
        //     PlatformName: logoInfo?.platformName,
        //     PlayerID: localStorage.getItem("PlayerID"),
        //     PlayerToken: localStorage.getItem("PlayerToken"),
        //     GameCode: record.gameCode,
        //     Amount: record.balance,
        //   };
        //   const result = await gameApi("/withdraw-one-balance", object);
        //   if (result.status) {
        //     setPlayerInfo(result.data);
        //     apiData.filter(function (item) {
        //       if (item.srno === record.srno) {
        //         item.balance = 0;
        //         item.isCheck = false;
        //       }
        //     });
        //   }
        // } catch (error) {
        //   message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        // }
        // setWithdrawGp();
    }

    const columns = [
        {
            title: "#",
            ellipsis: true,
            render: (text: string, record: any, index: number) => {
                return index + 1;
            },
        },
        {
            title: t("gameName"),
            dataIndex: "displayName",
            ellipsis: true,
            render: (text: string) => text.toUpperCase(),
        },
        {
            title: t("gameLoginID"),
            dataIndex: "gameLoginID",
            ellipsis: true,
        },
        {
            title: t("balance"),
            dataIndex: "balance",
            ellipsis: true,
            render: (_: any, record: any) => (record.isCheck ? formatNumber(record.balance) : "-"),
        },
        {
            title: t("action"),
            ellipsis: true,
            render: (_: any, record: any) => (
                <Space>
                    {/* <Button ghost disabled={record.isCheck} loading={currentGp === record.srno} onClick={() => handleCheck(record)}> */}
                    <Button ghost disabled={record.isCheck} onClick={() => handleCheck(record)}>
                        {t("checkBalance")}
                    </Button>

                    <Button
                        ghost
                        disabled={!record.isCheck || record.balance <= 0}
                        // loading={withdrawGp === record.srno}
                        onClick={() => handleWithdraw(record)}
                    >
                        {t("transferToWallet")}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="game-account">
            <Spin spinning={isLoading}>
                <Table columns={columns} rowKey="srno" scroll={{ x: true }} />
            </Spin>
        </div>
    );
};

export default GameAccount;
