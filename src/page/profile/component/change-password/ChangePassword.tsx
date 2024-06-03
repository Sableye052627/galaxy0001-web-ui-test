import { Button, Card, Col, Form, Input, Row, Spin, message } from "antd";

import "./change-password.scss";
import { useChangePassword } from "./hook/useChangePassword";
import { useState } from "react";
import { playerApi } from "../../../../service/CallApi";

const ChangePassword = () => {
    const { t, navigate, platformInfo, playerInfo } = useChangePassword();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    async function updatePassword(values: any) {
        setIsLoading(true);
        try {
            const object = {
                HostName: platformInfo?.platformName,
                PlayerID: localStorage.getItem("PlayerID"),
                PlayerToken: localStorage.getItem("PlayerToken"),
                CurrentPassword: values.currentPassword,
                NewPassword: values.newPassword,
            };
            const result = await playerApi("/update-password", object);
            if (result.status) {
                message.success(result.message);
                form.resetFields();
            }
        } catch (error) {
            console.log(error);
            //   message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    return (
        <Row className="change-password-wrapper" justify="center" gutter={[16, 10]}>
            <Col xs={24} sm={16} md={14} lg={11} xl={8}>
                <Spin spinning={isLoading}>
                    <Card>
                        <Form layout="vertical" initialValues={playerInfo} form={form} onFinish={updatePassword}>
                            <Form.Item label={t("playerID")} name="playerID">
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label={t("currentPassword")}
                                name="currentPassword"
                                rules={[{ required: true, message: t("pleaseInsertCurrentPassword") }]}
                            >
                                <Input.Password autoComplete="off" />
                            </Form.Item>

                            <Form.Item
                                label={t("newPassword")}
                                name="newPassword"
                                rules={[{ required: true, message: t("pleaseInsertNewPassword") }]}
                            >
                                <Input.Password autoComplete="off" />
                            </Form.Item>

                            <Form.Item>
                                <Row gutter={16}>
                                    <Col xs={12}>
                                        <Button danger block type="primary" htmlType="reset">
                                            {t("clear")}
                                        </Button>
                                    </Col>

                                    <Col xs={12}>
                                        <Button block type="primary" htmlType="submit">
                                            {t("update")}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Card>
                </Spin>
            </Col>

            <Col xs={0} xl={16}>
                <Card>
                    {/* <Carousel autoplay dots={false}>
                        {banner?.map((items, index) => (
                            <div key={index} className="banner-img">
                                <img src={items.image} alt={items.title} />
                            </div>
                        ))}
                    </Carousel> */}

                    <hr />
                    <div className="description">{t("infoContent2")}</div>
                </Card>
            </Col>
        </Row>
    );
};

export default ChangePassword;
