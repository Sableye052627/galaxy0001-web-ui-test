import { Button, Card, Col, Input, Row, Spin, message, Upload, UploadFile } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

import { checkImage, getFile } from "../../function/UploadFunction";

import "./suggestion.scss";
import { useState } from "react";
import { playerApi } from "../../service/CallApi";
import { useSuggestion } from "./hook/useSuggestion";
import Cookies from "js-cookie";

const Suggestion = () => {
    const { t, navigate, platformInfo, windowWidth, playerInfo, setPlayerInfo, hostname, setImagePreview, handlePreviewImage } = useSuggestion();

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("gameProblem");
    const [userInput, setUserInput] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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

    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
    };

    const handleRemove = (file: UploadFile) => {
        // Filter out the removed file from the fileList
        setFileList((prevList) => prevList.filter(item => item.uid !== file.uid));
    };

    const handleRemoveAll = () => {
        // Clear all files by setting fileList to an empty array
        setFileList([]);
    };

    function handleClear() {
        setType("gameProblem");
        setUserInput("");
        handleRemoveAll();
    }

    async function handleSubmit() {
        if (!type || !userInput || userInput.trim() == "") {
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
                FeedImage: fileList?.[0]?.originFileObj ?? null
            };
            const result = await playerApi("/add-suggestion", object);
            if (result.status) {
                message.success(result.message);
                setType("gameProblem");
                setUserInput("");
                handleRemoveAll();
            }
        } catch (error: any) {
            message.error({ content: error?.response?.data?.message, key: error?.response?.data?.message });
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
                                        <div className={`item ${type === items.label}`} onClick={() => setType(items.label)}>
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
                                    onChange={(e) => setUserInput(e.target.value)} // This line is now active
                                />
                            </div>
                        </div>
                        {/* 
                        <div className="suggestion-attachment">
                            <div className="title">{t("attachment")}</div>
                            <div className="content">
                                <Upload
                                    maxCount={1}
                                    listType="picture"
                                    beforeUpload={checkImage}
                                    onPreview={handlePreviewImage}
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onRemove={handleRemove}
                                >
                                    <Button icon={<CloudUploadOutlined />}>{t("clickToUpload")}</Button>
                                </Upload>
                            </div>
                        </div>
                        */}

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
