import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./jackpot.scss";
import { useNavigate } from "react-router-dom";
import { useJackpot } from "./hook/useJackpot";


const GameList = () => {
    const navigate = useNavigate();
    const { t, isVertical } = useJackpot();

    return (
        <div className="ml-jackpot-container">
            <div className="ft-jackpot-container">
                <img className="ft-jackpot-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/common/jackpot.png" alt="" />
                <p className="ft-jackpot-text">123123123</p>
            </div>
        </div>
    );
};

export default GameList;

