import { useNavbarSec } from "./hook/useNavbarSec";
import { Col, Row } from "antd";

import "./navbar-sec.scss";
import { gridSetting } from "../../MainLayout";

const NavbarSec = () => {
    const { t, navigate, platformInfo, gpCategory } = useNavbarSec();
    const pathname = window.location.pathname.split("/");

    function handleRedirect(path: string) {
        navigate(`/play-game/${path?.toLocaleLowerCase()}`);
    }

    function handleRedirect2(path: string) {
        navigate(`${path?.toLocaleLowerCase()}`);
    }

    return (
        <Row className="navbar-sec" justify="center" align="middle">
            <Col {...gridSetting}>
                <Row justify="space-around" align="middle">
                    <Col>
                        <div className={`item ${pathname[1] === ""}`} onClick={() => handleRedirect2("/")}>
                            {/* <img src={homeIcon} alt="home" /> */}
                            {t("home")}
                        </div>
                    </Col>

                    {gpCategory?.map((items: any, index: number) => (
                        <Col key={index}>
                            <div
                                className={`item ${pathname[2] === items.category.toLocaleLowerCase()}`}
                                onClick={() => handleRedirect(items.category)}
                            >
                                {/* <img
                                    src={`https://game-platform.sgp1.digitaloceanspaces.com/${platformInfo?.uniqueID}/${items.category}.png`}
                                    alt={items.category}
                                /> */}
                                {t(items.category.toLocaleLowerCase())} 
                            </div>
                        </Col>
                    ))}

                    <Col>
                        <div className={`item ${pathname[1] === "suggestion"}`} onClick={() => handleRedirect2("/suggestion")}>
                            {/* <img src={suggestionIcon} alt="suggestion" /> */}
                            {t("suggestion")}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default NavbarSec;
