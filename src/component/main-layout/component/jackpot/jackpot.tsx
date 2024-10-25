import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import "./jackpot.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useJackpot } from "./hook/useJackpot";


const GameList = () => {
    const navigate = useNavigate();
    const { t, isVertical, jackpot, setJackpot } = useJackpot();
    // Initialize the jackpot value from cookies or with a random number if the cookie doesn't exist

    /*
    const [jackpot, setJackpot] = useState(() => {
      const savedJackpot = Cookies.get('galaxy0001-jackpot');
      return savedJackpot ? parseInt(savedJackpot, 10) : Math.floor(Math.random() * 50000) + 50000;
    });    
    */
    
    function formatNumber(value: number) {
      return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      }).format(value);
    }
  
    useEffect(() => {
      // Define an interval to update the jackpot state every second
      const intervalId = setInterval(() => {
        //const randomAddition = Math.floor(Math.random() * 50000); // Random number to add or subtract
        const randomDeduction = Math.floor(Math.random() * 5000); // Random number to add or subtract
        
        // Introduce a small chance (1 in 1000) to deduct instead of adding
        const shouldDeduct = Math.random() < 0.001; // 0.1% chance of deduction
  
        setJackpot(prevJackpot => {
          const newJackpot = shouldDeduct 
            ? Math.max(0, prevJackpot - randomDeduction) // Deduct the amount, ensuring jackpot doesn't go below 0
            : prevJackpot + 0.01; // randomAddition; // Add the amount
  
          // Update the cookie with the new jackpot value
          Cookies.set('jackpot', newJackpot.toString(), { expires: 7 }); // Cookie expires in 7 days
          return newJackpot;
        });
      }, 10); // Update every 1000ms (1 second)
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="ml-jackpot-container">
            <div className="ft-jackpot-container">
                <img className="ft-jackpot-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/common/jackpot.png" alt="" />
                <p className="ft-jackpot-text">{formatNumber(jackpot)}</p>
            </div>
        </div>
    );
};

export default GameList;

