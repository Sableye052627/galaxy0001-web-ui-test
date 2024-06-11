import { Col, Row, Spin, Table, message } from "antd";

import "./transaction-history.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useTransactionHistory } from "./hook/useTransactionHistory";
import { useEffect, useState } from "react";
import { formatNumber } from "../../../../function/Common";
import dayjs from "dayjs";
import { playerApi } from "../../../../service/CallApi";
import Cookies from "js-cookie";

interface IApiData {
    action: string;
    afterBalance: number;
    amount: number;
    beforeBalance: number;
    createDate: Date;
    playerID: string;
    remark: string;
    srno: number;
}
interface IApiDataPagination {
    currentPage: number;
    perPage: number;
    total: number;
    totalPage: number;
}

const TransactionHistory = () => {
    const { t, navigate, platformInfo, playerInfo, hostname } = useTransactionHistory();

    const [isLoading, setIsLoading] = useState(false);

    const [apiData, setApiData] = useState<IApiData[] | []>([]);
    const [apiDataPagination, setApiDataPagination] = useState<IApiDataPagination | undefined>(undefined);

    useEffect(() => {
        getTransactionHistory(1, 10);
    }, []);

    async function getTransactionHistory(page = 1, pageSize = 10) {
        setIsLoading(true);
        try {
            const object = {
                Hostname: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                Page: page,
                PageSize: pageSize,
            };
            const result = await playerApi("/wallet-log/list", object);
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

    const columns = [
        {
            title: "#",
            ellipsis: true,
            render: (text: string, record: any, index: number) => {
                return index + 1;
            },
        },
        {
            title: t("action"),
            dataIndex: "action",
            ellipsis: true,
        },
        {
            title: t("beforeBalance"),
            dataIndex: "beforeBalance",
            ellipsis: true,
            render: (text: string) => formatNumber(text),
        },
        {
            title: t("amount"),
            dataIndex: "amount",
            ellipsis: true,
            render: (text: string) => formatNumber(text),
        },
        {
            title: t("afterBalance"),
            dataIndex: "afterBalance",
            ellipsis: true,
            render: (text: string) => formatNumber(text),
        },
        {
            title: t("remark"),
            dataIndex: "remark",
            ellipsis: true,
        },
        {
            title: t("createDate"),
            dataIndex: "createDate",
            ellipsis: true,
            render: (text: string) => dayjs(text).format("DD-MM-YYYY HH:mm:ss"),
        },
    ];

    return (
        <div className="transaction-history">
            <Spin spinning={isLoading}>
                <Table
                    columns={columns}
                    dataSource={apiData}
                    rowKey="srno"
                    scroll={{ x: true }}
                    pagination={{
                        showLessItems: true,
                        current: apiDataPagination?.currentPage,
                        total: apiDataPagination?.total,
                        showSizeChanger: false,
                        pageSize: apiDataPagination?.perPage,
                        onChange: (page, pageSize) => getTransactionHistory(page, pageSize),
                    }}
                />
            </Spin>
        </div>
    );
};

export default TransactionHistory;
