import { Col, Form, Input, Modal, Row, message } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./jackpot.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useJackpot } from "./hook/useJackpot";


const GameList = () => {
    const navigate = useNavigate();
    const { t, isVertical, playerInfo, jackpot,setJackpot } = useJackpot();
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

    function navigateToSuggestionPage(){
        navigate(`/feedback`);
    }

    function navigateToTransactionPage(){
        navigate(`/player-info/transaction-history`);
    }
  
    return (
        <div className="hp-jackpot-container">
            <div className="ft-suggestion-container">
            {/* <img className="ft-suggestion-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/suggestion-icon.png" alt="" onClick={navigateToSuggestionPage} /> */}
            
            <img
              src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/twitter/MB3.0_Complain%20Box-03.png"
              alt="Twitter"
              className="ft-suggestion-img" 
              onClick={() => {

                if(window.location.hostname.split('.')[0] == "apph5")
                {
                  fetch('https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/apk/version.json')
                  .then(response => response.json())
                  .then(data => {
                    const telegramLink = data[0].telegramLink;
                    window.location.href = `${window.location.protocol}//${window.location.host}/telegram?url=${telegramLink}`
                  })
                  .catch(error => console.error('Error fetching data:', error));
                }
                else
                {
                  fetch('https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/apk/version.json')
                  .then(response => response.json())
                  .then(data => {
                    const webFallbackUrl = data[0].telegramWebLink; // Fallback if Telegram isn't installed
                    window.open(webFallbackUrl, '_blank');
                  })
                  .catch(error => console.error('Error fetching data:', error));
                }
              }}
            />
            </div>
            <div className="ft-jackpot-container">
                <img className="ft-jackpot-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/common/jackpot.png" alt="" />
                <p className="ft-jackpot-text">{formatNumber(jackpot)}</p>
            </div>
            <div className="ft-transaction-container">
            <img className="ft-transaction-img" src="https://game-platform.sgp1.digitaloceanspaces.com/GALAXY0001/navbar-player-icon/transaction-icon.png" alt="" onClick={navigateToTransactionPage}/>
            </div>
        </div>
    );
};

export default GameList;

