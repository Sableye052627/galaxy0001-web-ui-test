import { Button, Col, Form, Input, InputNumber, Row, Spin, Upload, message } from "antd";
import { CloudUploadOutlined, QrcodeOutlined, BankOutlined, BarcodeOutlined, DollarOutlined } from "@ant-design/icons";

import "./topupbalance.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useTopUpBalance } from "./hook/useTopUpBalance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { paymentGatewayApi } from "../../../../service/CallApi";
import { checkImage, previewImage } from "../../../../function/UploadFunction";
import Cookies from "js-cookie";

const TopUpBalance = () => {
    const { t, navigate, platformInfo, playerInfo, hostname } = useTopUpBalance();
    const [form] = Form.useForm();
    const [firstLoad, setIsFirstLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState();
    const [telco, setTelco] = useState();
    const [bank, setBank] = useState();

    const [agent, setAgent] = useState();
    const [agentBank, setAgentBank] = useState();

    const [imgPreview, setImgPreview] = useState();
    const [isPreview, setIsPreview] = useState(false);


    useEffect(() => {
    }, []);

    function confirmMsg(values: any) {

        Swal.fire({
            text: t("confirmToDepositBalance"),
            icon: "warning",
            showCancelButton: true,
            color: "#fff",
            background: "#434343",
        }).then((result) => {
            if (result.isConfirmed) {
                // if (type === "CDM") {
                //     hanleCdmDeposit(values);
                // } else {
                //     handleDeposit(values);
                // }
                handleDeposit(values);
            }
        });
    }

    async function handleDeposit(values: any) {
        setIsLoading(true);
        try {
             const object = {
                 HostName: hostname,
                 PlayerID: Cookies.get("PlayerID"),
                 PlayerToken: Cookies.get("PlayerToken"),
                 Amount: values.amount,
             };
             const result = await paymentGatewayApi("/RequestRapidPayDeposit", object);
             if (result.status) {
                window.open(result.data.redirect_url, 
                    "winname", 
                    "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,width=800,height=600"
                    );
             }
         } catch (error: any) {
             console.log(error);
             message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
         }
        setIsLoading(false);
    }

    return (
        <Row gutter={[16, 10]}>
            <Col xs={24} lg={11} xl={12}>
                <Spin spinning={isLoading}>
                    <div className="deposit-wrapper">
                        <div className="telco-provider" hidden={type !== "TelcoDeposit"}>
                            <div className="telco-provider-title">{t("provider")}</div>
                            <Row className="telco-provider-item" gutter={[9, 9]}>
                                {/* {telcoLogo.map((items) => (
                                    <Col xs={12} sm={8} md={6} key={items.key}>
                                        <div className={`item ${telco === items.key}`} onClick={() => setTelco(items.key)}>
                                            <img src={items.image} alt={items.key} />
                                        </div>
                                    </Col>
                                ))} */}
                            </Row>
                        </div>

                        <Form layout="vertical" form={form} onFinish={confirmMsg}>

                                <Form.Item label={t("amount")} name="amount" rules={[{ required: true, message: t("pleaseInsertAmount") }]}>
                                    <InputNumber controls={false} style={{ width: "100%" }} />
                                </Form.Item>

                            <Form.Item>
                                <Button block size="large" type="primary" htmlType="submit">
                                    {t("submit")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Col>

            <Col xs={24} lg={13} xl={12}>
                <div className="deposit-desc">
                    <div className="title">
                        {/* <IoIosWarning style={{ color: "red", fontSize: 20 }} /> */}
                        {t("importantNotice")}
                    </div>

                    <ul className="content">
                        <li className="item">{t("depositDesc1")}</li>
                        <li className="item">{t("depositDesc4")}</li>
                    </ul>
                </div>
            </Col>
        </Row>
    );
};

export default TopUpBalance;
