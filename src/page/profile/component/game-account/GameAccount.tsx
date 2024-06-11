import { Button, Space, Spin, Table, message } from "antd";

import "./game-account.scss";
import { useGameAccount } from "./hook/useGameAccount";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../../function/Common";
import { playerApi, theOneApi } from "../../../../service/CallApi";
import Cookies from "js-cookie";

interface IApiData {
    category: string;
    gameCode: string;
    gameLoginID: string;
    gameLoginPassword: string;
    srno: number;
    balance: number;
    isCheck: boolean;
    updateBy: string;
    updateDate: Date;
}
interface IApiDataPagination {
    currentPage: number;
    perPage: number;
    total: number;
    totalPage: number;
}

interface ICurrentGp {}
interface IWithdrawGp {}

const GameAccount = () => {
    const { t, navigate, platformInfo, playerInfo, setPlayerInfo, hostname } = useGameAccount();

    const [isLoading, setIsLoading] = useState(true);

    const [apiData, setApiData] = useState<IApiData[] | []>([]);
    const [apiDataPagination, setApiDataPagination] = useState<IApiDataPagination | undefined>(undefined);
    const [currentGp, setCurrentGp] = useState<ICurrentGp | undefined>(undefined);
    const [withdrawGp, setWithdrawGp] = useState<IWithdrawGp | undefined>(undefined);

    useEffect(() => {
        getPlayerGameAcc(1, 10);
    }, []);

    async function getPlayerGameAcc(page = 1, pageSize = 10) {
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Category: "all",
                GameCode: "all",
                Page: page,
                PageSize: pageSize,
            };
            const result = await playerApi("/get-game-account", object);
            if (result.status) {
                setApiData(result.data);
                setApiDataPagination(result.data3);
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
                Category: record.category.split("/")[0],
                AgentGpSrno: record.srno,
                GameLoginID: record.gameLoginID,
            };
            const result = await theOneApi("/get-balance", object);
            if (result.status) {
                // let tmp = apiData;
                // tmp.filter((item: any) => {
                //     if (item.srno === record.srno) {
                //         item.balance = result.data.balance;
                //         item.isCheck = true;
                //     }
                // });
                // setApiData(tmp);
                apiData.filter(function (item) {
                    if (item.srno === record.srno) {
                        item.balance = result.data.balance;
                        item.isCheck = true;
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
                AgentGpSrno: record.srno,
                Category: record.category,
            };
            const result = await theOneApi("/withdraw-balance", object);
            if (result.status) {
                setPlayerInfo(result.data);
                // apiData.filter((item: any) => {
                //     if (item.srno === record.srno) {
                //         item.balance = 0;
                //         item.isCheck = false;
                //     }
                // });
                // let tmp = apiData;
                // tmp.filter((item: any) => {
                //     if (item.srno === record.srno) {
                //         item.balance = 0;
                //         item.isCheck = false;
                //     }
                // });
                // setApiData(tmp);
                apiData.filter(function (item) {
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
            title: t("gameCode"),
            dataIndex: "gameCode",
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
            render: (record: any) => (record?.isCheck ? formatNumber(record.balance) : "-"),
        },
        {
            title: t("action"),
            ellipsis: true,
            render: (record: any) => (
                <Space>
                    <Button ghost disabled={record?.isCheck} loading={currentGp === record.srno} onClick={() => handleCheck(record)}>
                        {t("checkBalance")}
                    </Button>

                    <Button
                        ghost
                        disabled={!record?.isCheck || record?.balance <= 0}
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
                <Table dataSource={apiData} columns={columns} rowKey="srno" scroll={{ x: true }} />
            </Spin>
        </div>
    );
};

export default GameAccount;
