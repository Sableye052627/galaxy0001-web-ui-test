import { Col, Row } from "antd";

import "./navigator-navbar";
import { gridSetting } from "../../MainLayout";
import { useNavigatorNavbar } from "./hook/useNavigatorNavbar";

const NavigatorNavbar = () => {
    const { t, gpCategory, do_path, handleNavigate } = useNavigatorNavbar();

    return (
        <Row justify="center" align="middle" className="navigator-navbar">
            <Col {...gridSetting}>
                <Row justify="space-around" align="middle">
                    <Col>
                        <div className="nav-item" onClick={() => handleNavigate("/")}>
                            <img src={do_path + "HOME.png"} alt="home" />
                        </div>
                    </Col>

                    {gpCategory?.map((item: any) => (
                        <Col>
                            <div className="nav-item" onClick={() => handleNavigate(`/${item.category}`)}>
                                <img src={do_path + item.category?.toUpperCase()} alt={item.category} />
                            </div>
                        </Col>
                    ))}

                    <Col>
                        <div className="nav-item">
                            <img src={do_path + "SUGGESTION.png"} alt="suggestion" />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default NavigatorNavbar;
