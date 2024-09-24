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
                <img className="cat-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/common/categories.png" alt="" />
            </div>
            {/* 
            {gpCategory?.map((items: any, index: number) => (
                                <div className="cat">
                                    <img
                                        src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/${items.category.toLocaleUpperCase()}.png`}
                                        alt={items.category}
                                        onClick={() => handleRedirect(items.category)}
                                    />
                                </div>
            ))}
            */}
            <div className="cat">
                <img
                    src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/LIVE.png`}
                    alt="Live"
                    onClick={() => handleRedirect("Live")}
                 />
            </div>
            <div className="cat">
                <img
                    src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/FISHING.png`}
                    alt="Lottery"
                    onClick={() => handleRedirect("Fishing")}
                 />
            </div>
            <div className="cat">
                <img
                    src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/SLOT.png`}
                    alt="Slot"
                    onClick={() => handleRedirect("Slot")}
                 />
            </div>
            <div className="cat">
                <img
                    src={`https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/home-game-btn/SPORT.png`}
                    alt="Sport"
                    onClick={() => handleRedirect("Sport")}
                 />
            </div>
        </div>
    );
};

export default GameCat;

