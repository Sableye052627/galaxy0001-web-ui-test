import { Button, Space, Spin, Table, message } from "antd";

import "./game-account.scss";
import { useGameAccount } from "./hook/useGameAccount";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../../function/Common";
import { playerApi, theOneApi } from "../../../../service/CallApi";
import Cookies from "js-cookie";

interface IApiData {}

interface ICurrentGp {}
interface IWithdrawGp {}

const GameAccount = () => {
    const { t, navigate, platformInfo, playerInfo, setPlayerInfo, hostname } = useGameAccount();

    const [isLoading, setIsLoading] = useState(true);

    const [apiData, setApiData] = useState<IApiData[] | []>([]);
    const [currentGp, setCurrentGp] = useState<ICurrentGp | undefined>(undefined);
    const [withdrawGp, setWithdrawGp] = useState<IWithdrawGp | undefined>(undefined);

    useEffect(() => {
        getPlayerGameAcc();
    }, []);

    async function getPlayerGameAcc() {
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: "all",
                GameCode: "all",
            };
            const result = await playerApi("/get-game-account", object);
            if (result.status) {
                setApiData(result.data);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    async function handleCheck(record: any) {
        setCurrentGp(record.srno);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                GameCode: record.gameCode,
            };
            const result = await theOneApi("/get-balance", object);
            if (result.status) {
                apiData.filter((item: any) => {
                    if (item.srno === record.srno) {
                        item.balance = result.data.balance;
                        item.isCheck = result.data.isCheck;
                    }
                });
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setCurrentGp(undefined);
    }

    async function handleWithdraw(record: any) {
        if (record.balance <= 0) {
            message.info(t("noCreditInsideGame"));
            return;
        }
        setWithdrawGp(record.srno);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                GameCode: record.gameCode,
                Amount: record.balance,
            };
            const result = await theOneApi("/withdraw-balance", object);
            if (result.status) {
                setPlayerInfo(result.data);
                apiData.filter((item: any) => {
                    if (item.srno === record.srno) {
                        item.balance = 0;
                        item.isCheck = false;
                    }
                });
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setWithdrawGp(undefined);
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
            render: (record: any) => (record.isCheck ? formatNumber(record.balance) : "-"),
        },
        {
            title: t("action"),
            ellipsis: true,
            render: (record: any) => (
                <Space>
                    <Button ghost disabled={record.isCheck} loading={currentGp === record.srno} onClick={() => handleCheck(record)}>
                        {t("checkBalance")}
                    </Button>

                    <Button
                        ghost
                        disabled={!record.isCheck || record.balance <= 0}
                        loading={withdrawGp === record.srno}
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
