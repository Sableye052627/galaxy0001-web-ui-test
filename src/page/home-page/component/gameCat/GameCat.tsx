import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./game-cat.scss";
import { useNavigate } from "react-router-dom";
import { useGameCat } from "./hook/useGameCat";
import { downloadApp } from "../../../../asset/Asset";

const GameCat = () => {
    const navigate = useNavigate();
    const { t, platformInfo, gpCategory, isVertical, handleRedirect } = useGameCat();

    return (
        <div className={`${isVertical ? "v" : "h"}-game-cat-container`}>
            <div className="cat-title">
                <img className="cat-img" src="https://game-platform.sgp1.digitaloceanspaces.com/bwg/common/category.png" alt="" />
            </div>
            {gpCategory?.map((items: any, index: number) => (
                                <div className="cat">
                                    {/* 
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/${
                                            platformInfo?.uniqueID
                                        }/home-game-btn/${items.category.toLocaleUpperCase()}.png`}
                                        alt={items.category}
                                        onClick={() => handleRedirect(items.category)}
                                    />
                                    */}
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/${items.category.toLocaleUpperCase()}.png`}
                                        alt={items.category}
                                        onClick={() => handleRedirect(items.category)}
                                    />
                                </div>
            ))}
        </div>
    );
};

export default GameCat;

