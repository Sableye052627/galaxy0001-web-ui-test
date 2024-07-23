import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import "./footer.scss";
import { useNavigate } from "react-router-dom";
import { useFooter } from "./hook/useFooter";


const GameList = () => {
    const navigate = useNavigate();
    const { t, isVertical } = useFooter();

    return (
        <div className="footer-container">
            <div className="ft-jackpot-container">
                <img className="ft-jackpot-img" src="https://game-platform.sgp1.digitaloceanspaces.com/bwg/common/jackpot.png" alt="" />
                <p className="ft-jackpot-text">123123123</p>
            </div>
        </div>
    );
};

export default GameList;

