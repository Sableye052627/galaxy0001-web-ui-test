import { Button, Col, Form, Input, InputNumber, Row, Select, Spin, message } from "antd";

import "./withdraw.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useWithdraw } from "./hook/useWithdraw";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { playerApi } from "../../../../service/CallApi";
import { bankList } from "../../../../asset/Asset";
import Cookies from "js-cookie";
import { LazyLoad } from "../../../loading/lazy-load/LazyLoad";

const { Option } = Select;

const Withdraw = () => {
    const { t, navigate, platformInfo, playerInfo, hostname } = useWithdraw();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [playerBank, setPlayerBank] = useState([]);
    const [bank, setBank] = useState();
    const [addBank, setAddBank] = useState(false);

    useEffect(() => {
        if (platformInfo?.cdM_Withdrawal === 0) {
            navigate("/player-info/my-profile");
            return;
        }
        getPlayerBank();
    }, []);

    async function getPlayerBank() {
        try {
            const object = {
                HostName: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
            };
            const result = await playerApi("bank-account/list", object);
            if (result.status) {
                setPlayerBank(result.data);
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
            // navigate(-1);
        }
        setIsFirstLoad(false);
    }

    function handleBank(item: any) {
        setBank(item.srno);
        form.setFieldValue("bankAccountNo", item.bankAccountNo);
        form.setFieldValue("bankAccountName", item.bankAccountName);
    }

    function confirmWithdraw(values: any) {
        Swal.fire({
            text: t("confirmToWithdrawBalance"),
            icon: "info",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
                handleWithdraw(values);
            }
        });
    }

    async function handleWithdraw(values: any) {
        setIsLoading(true);
        // try {
        //     const object = {
        //         HostName: hostname,
        //         PlayerID: Cookies.get("PlayerID"),
        //         PlayerToken: Cookies.get("PlayerToken"),
        //         BankSrno: bank,
        //         Currency: "MYR",
        //         Amount: values.amount,
        //     };
        //     const result = await playerApi("/withdraw-request", object);
        //     if (result.status) {
        //         setPlayerInfo(result.data);
        //         message.success(result.message);
        //         setBank();

        //         form.setFieldValue("bankAccountNo", "");
        //         form.setFieldValue("bankAccountName", "");
        //         form.resetFields();
        //     }
        // } catch (error) {
        //     console.log(error);
        //     // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        // }
        setIsLoading(false);
    }

    function confirmAddBank(values: any) {
        Swal.fire({
            text: t("confirmToAddBank"),
            icon: "info",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddBank(values);
            }
        });
    }

    async function handleAddBank(values: any) {
        setIsLoading(true);
        try {
            const object = {
                HostName: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                BankSrno: values.bankCode,
                BankAccountNo: values.bankAccountNo.toString(),
                BankAccountName: values.bankAccountName,
            };
            const result = await playerApi("bank-account/add", object);
            if (result.status) {
                message.success(result.message);
                form2.resetFields();
                setAddBank(false);
                getPlayerBank();
            }
        } catch (error) {
            console.log(error);
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    if (isFirstLoad) {
        return <LazyLoad />;
    }

    return (
        <Spin spinning={isLoading}>
            <Row gutter={[16, 10]}>
                <Col xs={24} lg={12}>
                    <div className="withdraw" hidden={playerBank && playerBank[0] === undefined}>
                        <div className="player-bank">
                            <div className="player-bank-title">{t("bankCode")}</div>
                            <Row className="player-bank-item" gutter={[9, 9]}>
                                {/* {playerBank?.map((items) => (
                                    <Col xs={12} sm={8} md={6} key={items.srno} onClick={() => handleBank(items)}>
                                        <div className={`item ${bank === items.srno}`}>
                                            <img src={items.image + items.bankCode?.toUpperCase() + ".png"} alt={items.bankCode} />
                                        </div>
                                    </Col>
                                ))} */}
                            </Row>
                        </div>

                        <Form layout="vertical" form={form} onFinish={confirmWithdraw}>
                            <Form.Item
                                label={t("bankAccountName")}
                                name="bankAccountName"
                                rules={[{ required: true, message: t("pleaseSelectBank") }]}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item label={t("bankAccountNo")} name="bankAccountNo" rules={[{ required: true, message: t("pleaseSelectBank") }]}>
                                <Input disabled />
                            </Form.Item>

                            <Form.Item label={t("amount")} name="amount" rules={[{ required: true, message: t("pleaseInsertAmount") }]}>
                                <InputNumber controls={false} style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item>
                                <Button block danger size="large" type="primary" htmlType="submit">
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="withdraw no-bank" hidden={!playerBank || playerBank[0] !== undefined}>
                        {t("haventRegisterWithdrawalBankYet")}
                    </div>
                </Col>

                <Col xs={24} lg={12}>
                    <div className="add-bank" hidden={addBank}>
                        <div className="title">{playerBank[0] === undefined ? t("addBankDesc1") : t("addBankDesc2")}</div>
                        <div className="btn-add-bank" onClick={() => setAddBank(true)}>
                            {t("addBank")}
                        </div>
                    </div>

                    <div className="add-bank-form" hidden={!addBank}>
                        <div className="title">{t("addNewBank")}</div>
                        <Form layout="vertical" onFinish={confirmAddBank} form={form2}>
                            <Form.Item label={t("bankCode")} name="bankCode" rules={[{ required: true, message: t("pleaseSelectBankCode") }]}>
                                <Select placeholder={t("pleaseSelectBankCode")}>
                                    {bankList.map((items: any) => (
                                        <Option value={items.value}>{items.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label={t("bankAccountName")}
                                name="bankAccountName"
                                rules={[{ required: true, message: t("pleaseInsertBankAccountName") }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>

                            <Form.Item
                                label={t("bankAccountNo")}
                                name="bankAccountNo"
                                rules={[{ required: true, message: t("pleaseInsertBankAccountNo") }]}
                            >
                                <InputNumber autoComplete="off" style={{ width: "100%" }} controls={false} />
                            </Form.Item>

                            <Form.Item>
                                <Button block size="large" type="primary" htmlType="submit">
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default Withdraw;
