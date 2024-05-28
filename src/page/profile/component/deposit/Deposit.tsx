import { Button, Col, Form, Input, InputNumber, Row, Spin, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import "./deposit.scss";
import { gridSetting } from "../../../../component/main-layout/MainLayout";
import { useDeposit } from "./hook/useDeposit";
import { useState } from "react";
import Swal from "sweetalert2";

const Deposit = () => {
    const { t, navigate, platformInfo, playerInfo } = useDeposit();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState();
    const [telco, setTelco] = useState();
    const [bank, setBank] = useState();

    const [agent, setAgent] = useState();
    const [agentBank, setAgentBank] = useState();

    const [imgPreview, setImgPreview] = useState();
    const [isPreview, setIsPreview] = useState(false);

    function confirmMsg(values: any) {
        if (!type) {
            return message.warning(t("pleaseSelectDepositType"));
        }

        if (type === "TelcoDeposit" && !telco) {
            return message.warning(t("pleaseSelectTelcoProvider"));
        }

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
            }
        });
    }

    return (
        <Row gutter={[16, 10]}>
            <Col xs={24} lg={11} xl={12}>
                <Spin spinning={isLoading}>
                    <div className="deposit">
                        <div className="deposit-type-title">{t("depositType")}</div>
                        <div className="deposit-type-item">
                            {/* {depositType.map((items) => (
                                <span key={items.key} onClick={() => handleType(items)}>
                                    <div disabled={items.disabled} className={`item ${type === items.key}`}>
                                        {items.icon}
                                        {t(items.label)}
                                    </div>
                                </span>
                            ))} */}
                        </div>

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

                        <div className="cdm" hidden={type !== "CDM"}>
                            <div className="cdm-title">{t("agentBank")}</div>
                            <Row className="cdm-item" gutter={[9, 9]}>
                                {/* {agentBank?.map((items) => (
                                    <Col xs={12} sm={8} md={6} key={items.srno} onClick={() => handleBank(items)}>
                                        <div className={`item ${bank?.srno === items.srno}`}>
                                            <img src={items.image + items.bankCode + ".png"} alt={items.bankCode} />
                                        </div>
                                    </Col>
                                ))} */}
                            </Row>
                        </div>

                        <Form layout="vertical" form={form} onFinish={confirmMsg}>
                            {type === "CDM" && (
                                <Form.Item
                                    label={t("bankAccountNo")}
                                    name="bankAccountNo"
                                    rules={[{ required: true, message: t("pleaseSelectBank") }]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            )}

                            {type === "CDM" && (
                                <Form.Item
                                    label={t("bankAccountName")}
                                    name="bankAccountName"
                                    rules={[{ required: true, message: t("pleaseSelectBank") }]}
                                >
                                    <Input disabled />
                                </Form.Item>
                            )}

                            {type !== "TelcoDeposit" && (
                                <Form.Item label={t("amount")} name="amount" rules={[{ required: true, message: t("pleaseInsertAmount") }]}>
                                    <InputNumber controls={false} style={{ width: "100%" }} />
                                </Form.Item>
                            )}

                            {type === "TelcoDeposit" && (
                                <Form.Item label={t("pinNumber")} name="note" rules={[{ required: true, message: t("pleaseInsertPinNumber") }]}>
                                    <InputNumber controls={false} style={{ width: "100%" }} />
                                </Form.Item>
                            )}

                            {type === "CDM" && (
                                <>
                                    <Form.Item
                                        label={t("attachment")}
                                        name="attachment"
                                        valuePropName="fileList"
                                        // getValueFromEvent={getFile}
                                        rules={[{ required: true, message: t("pleaseUploadAttachment") }]}
                                    >
                                        {/* <Upload listType="picture" maxCount={1} beforeUpload={checkImage} onPreview={handlePreview}> */}
                                        <Upload listType="picture" maxCount={1}>
                                            <Button icon={<CloudUploadOutlined />}>{t("clickToUpload")}</Button>
                                        </Upload>
                                    </Form.Item>
                                    {/* {isPreview && <PreviewImage imgPreview={imgPreview} isPreview={isPreview} setIsPreview={setIsPreview} />} */}
                                </>
                            )}

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
                        <li className="item">{t("depositDesc2")}</li>
                        <li className="item">{t("depositDesc3")}</li>
                        <li className="item">{t("depositDesc4")}</li>
                        <li className="item">{t("depositDesc5")}</li>
                        <li className="item">{t("depositDesc6")}</li>
                    </ul>
                </div>
            </Col>
        </Row>
    );
};

export default Deposit;
