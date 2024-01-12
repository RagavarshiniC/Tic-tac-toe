import React, { useRef, useState, useEffect } from 'react';
import styles from './Home.module.css';
import styled from 'styled-components'
import x from './Vector (2).svg';
import o from './Vector (3).svg';
import retry from './pajamas_retry.svg';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import quoteimg from './Group 3 (1).svg';
const H3 = styled.h3`
color: #32C4C3;
 display: flex;
  justify-content: center;`
export default function Checklist2(props) {
  const location = useLocation();
  const { from } = location.state;

  let selectedChoice = from;
  let pcChoice = selectedChoice === 'x' ? 'o' : 'x';

  let initialPlayerScore = JSON.parse(localStorage.getItem("playerScore")) || 0;
  let initialComputerScore = JSON.parse(localStorage.getItem("computerScore")) || 0;
  let initialTies = JSON.parse(localStorage.getItem("ties")) || 0;
  
  const [currentTurn, setCurrentTurn] = useState(selectedChoice);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winnerVisible, setWinnerVisibility] = useState('hidden');
  const [refreshVisible, setrefreshVisible] = useState('hidden');
  let [playerScore, setPlayerScore] = useState(initialPlayerScore);
  let [computerScore, setComputerScore] = useState(initialComputerScore);
  let [ties, setTies] = useState(initialTies);
  const [quote, setQuote] = useState('');
  let [quoteno, setQuoteno] = useState(1);
  let winref1 = useRef(null);
  let winref2 = useRef(null);
  let refreshref = useRef(null);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  useEffect(() => {
    if (count % 2 === 0 && !lock) {
      setCurrentTurn(selectedChoice);
      checkwin(board);
    } else if (count % 2 === 1 && !lock) {
      const timeoutId = setTimeout(() => {
        computerTurn();
        setCurrentTurn(pcChoice);
        checkwin(board); 
      }, ); 
  
      return () => clearTimeout(timeoutId); 
    }
  }, [count, board, lock, selectedChoice, pcChoice]);

  const toggle = (e, num) => {
    if (lock) {
      return;
    }

    const data = [...board];
    if (data[num] === "") {
      data[num] = selectedChoice;
    
      setCount((prevCount) => prevCount + 1);
      e.target.innerHTML = `<img src='${selectedChoice === 'x' ? x : o}'>`;
      setBoard([...data]);
    }
  };

  const computerTurn = () => {
    const emptyIndexes = board.reduce((acc, value, index) => {
      if (value === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptyIndexes.length === 0 || lock) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    const chosenIndex = emptyIndexes[randomIndex];

    const data = [...board];
    data[chosenIndex] = pcChoice;
    setCount((prevCount) => prevCount + 1);

    const boxes = document.getElementsByClassName(styles.boxes);
    boxes[chosenIndex].innerHTML = `<img src='${pcChoice === 'x' ? x : o}'>`;
    setBoard([...data]);
    checkwin(data);
  };

  const checkwin = (data) => {
    if (lock) {
      return;
    }

    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
    }
    else if (data.includes("x") && data.includes("o") &&  !data.includes("")) {
      setLock(true);
      setWinnerVisibility("visible");
      winref1.current.innerHTML = "IT'S A TIE!";
      winref2.current.innerHTML = "NO ONE WINS THIS ROUND";

      setTies(ties = ties+1);
  
      localStorage.setItem("playerScore", JSON.stringify(playerScore));
      localStorage.setItem("computerScore", JSON.stringify(computerScore));
      localStorage.setItem("ties", JSON.stringify(ties));
    }
  };

  const won = (winner) => {
    setLock(true);

    if (winner === selectedChoice) {
      
      setPlayerScore(playerScore = playerScore+1);
      if(selectedChoice === "x"){
      winref1.current.innerHTML = "YOU WON!";
      winref2.current.innerHTML = "X TAKES THE ROUND";}
      else{
        winref1.current.innerHTML = "YOU WON!";
      winref2.current.innerHTML = "O TAKES THE ROUND";
      }
    } else {
      setComputerScore(computerScore = computerScore + 1);
      if(selectedChoice === "o"){
        winref1.current.innerHTML = "YOU LOSE!";
        winref2.current.innerHTML = "X TAKES THE ROUND";}
        else{
          winref1.current.innerHTML = "YOU LOSE!";
        winref2.current.innerHTML = "O TAKES THE ROUND";
        }
    }
    
    localStorage.setItem("playerScore", JSON.stringify(playerScore));
    localStorage.setItem("computerScore", JSON.stringify(computerScore));
    setWinnerVisibility("visible");
  };
  const handleButtonClick = (e) => {

    setBoard(["", "", "", "", "", "", "", "", ""]);
    setLock(false);
    let boxes = document.getElementsByClassName(styles.boxes);
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
    }
    winref1.current.innerHTML = "";
    winref2.current.innerHTML = "";
    setWinnerVisibility("hidden");
    setrefreshVisible('hidden');
      if (!board.includes("") && !board.includes("x") && !board.includes("o")) {
      setTies(ties + 1);
    }

    setCurrentTurn(selectedChoice);
      setCount(0);
  };
 
  const resetGameAndScores = () => {
  setLock(false);
  setWinnerVisibility('hidden');
  setrefreshVisible('hidden');
  setCount(0);
  setBoard(["", "", "", "", "", "", "", "", ""]);
  setCurrentTurn(selectedChoice);
  setPlayerScore(0);
  setComputerScore(0);
  setTies(0);
  localStorage.removeItem("playerScore");
  localStorage.removeItem("computerScore");
  localStorage.removeItem("ties");
};
const handlerefresh=()=>{
  refreshref.current.innerHTML = "Do you want to quit ?";
  setrefreshVisible("visible");
};
const fetchQuote = async () => {
  
  try {
    
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setQuoteno((prevQuoteno) => prevQuoteno + 1);
    setQuote(data.slip.advice);
  } catch (error) {
    console.error('Error fetching quote:', error);
  }

}
useEffect(() => {
 
  fetchQuote();

  const intervalId = setInterval(() => {
    fetchQuote();
  }, 60000);

  return () => clearInterval(intervalId);
  
}, []);
  return (
    
    <div>
      <div className="transparent-box"styles={{opacity: "0.1", backgroundColor: "#192A32", margin: "0", padding: "0", width: "25vw", height: "79vh", marginLeft:"37vw", marginTop: "5vh", borderRadius: "27px"}}>
      <div className={styles.checklist2home}>
        
        <div style={{ display: 'flex', height: '2vh', width: '4vw', marginTop: '-46vh', marginLeft: '-14.7vw', marginBottom: '3vh', position:"fixed" }}>
        <img style={{ height: '3vh', width: '2.6vw' }} src={x} alt="X" />
        <img style={{ height: '3vh', width: '2.6vw' }} src={o} alt="O" />

        </div>
        <div style={{position:"fixed", display: 'flex', justifyContent:"center", textAlign: 'center', alignItems: 'center', height: '4vh', width: '5vw', backgroundColor: '#1F3540', marginTop: '-45vh', marginBottom: '3vh', borderRadius: '7px', boxShadow: '0px 4px 4px 0px #00000040', fontSize: '10px', fontFamily: 'sans-serif', color: '#A8BEC9', fontWeight: '500' }}>
          <div style={{ height: '2vh', width: '4vw', marginLeft: '0.2vw' }}>{currentTurn === 'x' ? 'X' : 'O'} TURN</div> 
        </div>
        <div style={{position:"fixed",display: 'flex', justifyContent:"center", alignItems:"center", flexDirection:"row",width:"2vw", height:"3.4vh", marginRight:"-16vw", marginTop: '-45vh', borderRadius:"6px",backgroundColor:"#A8BEC9"}}onClick={handlerefresh}>
          <img src = {retry} style={{width:"2vw", height:"2vh",backgroundColor:"#A8BEC9", borderRadius:"3px"}}/>
        </div>
        
        <div className={styles.boxhead}>
          <div className={styles.boxhead1}>
            <div className={styles.boxes} onClick={(e) => toggle(e, 0)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 1)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 2)}></div>
          </div>
          <div className={styles.boxhead2}>
            <div className={styles.boxes} onClick={(e) => toggle(e, 3)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 4)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 5)}></div>
          </div>
          <div className={styles.boxhead3}>
            <div className={styles.boxes} onClick={(e) => toggle(e, 6)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 7)}></div>
            <div className={styles.boxes} onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>
        <div className='winner'style = {{display:"flex", flexDirection:"column", justifyContent:"center",height: '22vh', width: '25vw', backgroundColor: "#1F3540", marginTop:"-10vh", visibility:winnerVisible}} >
          <h6 ref={winref1} style = {{ display:"flex", justifyContent:"center",color:"#ffff", fontFamily:"sans-serif",marginTop:"-4vh"}}></h6>
          <h3 ref={winref2} style = {{display:"flex", justifyContent:"center", color: "#F2B237", marginLeft:"0vw", fontFamily:"sans-serif", marginTop:"-1vh"}}></h3>
          <Link to= "/" style={{ textDecoration: 'none',color:"black" }} ><Button style={{display:"flex",justifyContent:"center",width:"6vw",height:"4vh",backgroundColor:"#F2B237", color:"#192A32", marginLeft:"3vw", borderRadius:"5px", marginBottom:"-5vh", fontSize:"11px"}} onClick={resetGameAndScores}>QUIT</Button></Link>
          <Button style={{display:"flex",justifyContent:"center",width:"6vw",height:"4vh",backgroundColor:"#32C4C3", color:"#192A32", borderRadius:"5px", marginLeft:"16vw", marginTop:"1vh", fontSize:"11px"}}   onClick={(e) => handleButtonClick(e) }>NEXT ROUND</Button>

        </div>
        <div className='refresh' style = {{position:"fixed",display:"flex", flexDirection:"column", justifyContent:"center",height: '22vh', width: '25vw', backgroundColor: "#1F3540", marginTop:"0vh", visibility:refreshVisible}} >
          <h6 ref={refreshref} style = {{display:"flex", justifyContent:"center", color: "#F2B237", marginLeft:"0vw", fontSize:"18px", fontFamily:"sans-serif", marginTop:"-1vh"}}></h6>
          <Button style={{display:"flex",justifyContent:"center",width:"6vw",height:"4vh",backgroundColor:"#32C4C3", color:"#192A32", marginLeft:"3vw", borderRadius:"5px", marginBottom:"-5vh", fontSize:"11px"}} onClick={() => handleButtonClick() }>PLAY AGAIN</Button>
          <Link to= "/" style={{ textDecoration: 'none',color:"black" }}><Button style={{display:"flex",justifyContent:"center",width:"6vw",height:"4vh",backgroundColor:"#F2B237", color:"#192A32", borderRadius:"5px", marginLeft:"16vw", marginTop:"1vh", fontSize:"11px"}} onClick={resetGameAndScores}>QUIT</Button></Link>

        </div>
        <div style= {{display:"flex", width:"18vw", height:"4vh", marginBottom:"-43vh", gap:'2.5vw', position:"fixed" }}>
        <div className = "UserScore"style= {{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center",width:"6.3vw", height:"5.5vh", backgroundColor:"#32C4C3", color:"black", fontFamily:"sans-serif", fontSize:"10px",fontWeight:"700", borderRadius:"7px"}}>{selectedChoice=== 'x' ? 'X' : 'O'} (YOU)<br/>{playerScore}</div>
        <div className = "UserScore"style= {{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center",width:"6.3vw", height:"5.5vh", backgroundColor:'#A8BEC9', color:"black", fontFamily:"sans-serif", fontSize:"10px", fontWeight:"700", borderRadius:"7px"}}>TIES<br/>{ties}</div>
        <div className = "UserScore"style= {{display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center",width:"6.3vw", height:"5.5vh", color:"black", fontFamily:"sans-serif", fontSize:"10px", fontWeight:"700",borderRadius:"7px", backgroundColor:"#F2B237"}}>{pcChoice=== 'x' ? 'X' : 'O'} (CPU)<br/>{computerScore}</div>
      </div>
      </div>
      <div className={styles.quotehome}>
          <H3>Quote #{quoteno}</H3>
          <p style={{color:"#F2B237", width:"9vw", marginTop:"-2.5vh", marginLeft:"3vw",  fontWeight: "600"}}>{quote}</p>
          <div style={{height:"4vh", width:"2vw", borderRadius: "50%", backgroundColor:"#32C4C3", marginLeft:"6vw" }}>
              <img style={{marginTop:"1vh"}} src = {quoteimg}/>
          </div>
        </div>
        </div>
    </div>
  );
}
