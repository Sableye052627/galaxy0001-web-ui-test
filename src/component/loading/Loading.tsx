import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Api } from "../../context/ApiContext";

const Loading = () => {
  const apiContext = useContext(Api);
  const { platformInfo } = apiContext;

  const hasInfo = () => (
    <div className="">
      <img src={platformInfo?.logoImage_2} />
    </div>
  );

  const noInfo = () => (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Spin size="large" indicator={<LoadingOutlined />} />
    </Row>
  );

  return platformInfo ? hasInfo() : noInfo();
};

export default Loading;
