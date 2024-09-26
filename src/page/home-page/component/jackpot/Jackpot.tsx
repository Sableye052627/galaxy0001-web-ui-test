import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./jackpot.scss";
import { useNavigate } from "react-router-dom";
import { useJackpot } from "./hook/useJackpot";


const GameList = () => {
    const navigate = useNavigate();
    const { t, isVertical } = useJackpot();
    const [jackpot, setJackpot] = useState(() => Math.floor(Math.random() * 50000000) + 100000000);

    function navigateToSuggestionPage(){
        navigate(`/suggestion`);
    }

    function navigateToTransactionPage(){
        navigate(`/player-info/transaction-history`);
    }
    
    useEffect(() => {
      // Define an interval to update the jackpot state every second
      const intervalId = setInterval(() => {
        const randomAddition = Math.floor(Math.random() * 1000000); // Random number to add
        setJackpot(prevJackpot => prevJackpot + randomAddition);
      }, 1000); // Update every 1000ms (1 second)
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
  

    return (
        <div className="hp-jackpot-container">
            <div className="ft-suggestion-container">
            <img className="ft-suggestion-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/suggestion-icon.png" alt="" onClick={navigateToSuggestionPage} />
            </div>
            <div className="ft-jackpot-container">
                <img className="ft-jackpot-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/common/jackpot.png" alt="" />
                <p className="ft-jackpot-text">{jackpot}</p>
            </div>
            <div className="ft-transaction-container">
            <img className="ft-transaction-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/transaction-icon.png" alt="" onClick={navigateToTransactionPage}/>
            </div>
        </div>
    );
};

export default GameList;

