import { Button, Card, Col, Input, Row, Spin, message } from "antd";

import "./suggestion.scss";
import { useState } from "react";
import { playerApi } from "../../service/CallApi";
import { useSuggestion } from "./hook/useSuggestion";
import Cookies from "js-cookie";

const Suggestion = () => {
    const { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, hostname } = useSuggestion();

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState(1);
    const [userInput, setUserInput] = useState();

    const suggestionType = [
        {
            key: 1,
            label: "gameProblem",
        },
        {
            key: 2,
            label: "dealerCheat",
        },
        {
            key: 3,
            label: "dealerComplaints",
        },
        {
            key: 4,
            label: "others",
        },
    ];

    function handleClear() {
        setType(1);
        setUserInput(undefined);
    }

    async function handleSubmit() {
        if (!type || !userInput) {
            message.warning(t("pleaseSelectSuggestionTypeAndInsertMessage"));
            return;
        }

        setIsLoading(true);
        try {
            const object = {
                HostName: hostname,
                PlayerID: Cookies.get("PlayerID"),
                PlayerToken: Cookies.get("PlayerToken"),
                SuggestionType: type,
                Message: userInput,
            };
            const result = await playerApi("/add-suggestion", object);
            if (result.status) {
                message.success(result.message);
                setType(1);
                setUserInput(undefined);
            }
        } catch (error: any) {
            // message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
        }
        setIsLoading(false);
    }

    return (
        <Row className="suggestion" justify="center">
            <Col xs={23} xl={12} xxl={8}>
                <div className="header">{t("suggestion")}</div>
                <Spin spinning={isLoading}>
                    <Card>
                        <div className="suggestion-type">
                            <div className="title">{t("suggestionType")}</div>
                            <Row className="content" gutter={[16, 10]}>
                                {suggestionType.map((items, index) => (
                                    <Col key={index} xs={12} xl={8}>
                                        <div className={`item ${type === items.key}`} onClick={() => setType(items.key)}>
                                            {t(items.label)}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <div className="suggestion-message">
                            <div className="title">{t("message")}</div>
                            <div className="content">
                                <Input.TextArea
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                    value={userInput}
                                    // onChange={(e) => setUserInput(e.target.value)}
                                />
                            </div>
                        </div>

                        <Row className="clear-submit" gutter={10}>
                            <Col xs={12}>
                                <Button block danger type="primary" onClick={() => handleClear()}>
                                    {t("clear")}
                                </Button>
                            </Col>

                            <Col xs={12}>
                                <Button block type="primary" onClick={() => handleSubmit()}>
                                    {t("submit")}
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </Col>
        </Row>
    );
};

export default Suggestion;
