import { Col, Row, Spin, Table } from "antd";

import "./transaction-history.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useTransactionHistory } from "./hook/useTransactionHistory";
import { useState } from "react";
import { formatNumber } from "../../../../function/Common";
import dayjs from "dayjs";

const TransactionHistory = () => {
    const { t, navigate, platformInfo, playerInfo } = useTransactionHistory();
    const [isLoading, setIsLoading] = useState(false);

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
            dataIndex: "currentBalance",
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
            dataIndex: "finalBalance",
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
                    // dataSource={apiData}
                    rowKey="srno"
                    scroll={{ x: true }}
                    // pagination={{
                    //     showLessItems: true,
                    //     current: apiDataPagination?.currentPage,
                    //     total: apiDataPagination?.total,
                    //     showSizeChanger: false,
                    //     pageSize: apiDataPagination?.perPage,
                    //     onChange: (page, pageSize) => getTransactionHistory(page, pageSize),
                    // }}
                />
            </Spin>
        </div>
    );
};

export default TransactionHistory;
