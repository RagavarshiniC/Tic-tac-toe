import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import styles from './Home.module.css';
import x from'./Vector (2).svg';
import o from './Vector (3).svg';
import px from './Vector.png';
import py from './Vector (5).svg';
import quoteimg from './Group 3 (1).svg';
import {Link} from 'react-router-dom'
const H3 = styled.h3`
color: #32C4C3;
 display: flex;
  justify-content: center;`
  
function Home() {
  const [selectedChoice, setSelectedChoice] = useState();
  const [quote, setQuote] = useState('');
  let [quoteno, setQuoteno] = useState(1);
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
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);

    
  };
 
  const handleCopyLink = () => {
    const url = 'http://localhost:5173/';
  

    toast.info('Invite link copied', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { width:"17vw", height:"7vh",backgroundColor: '#192A32', color: '#F2B237' },
    });
  };
  
  
  return (
    <>
      <div className={styles.gamehome}>
        <div className={styles.hdiv}>
          
          <img src={x} width = "20vw" height = "20vh"alt="X Image" />
          <img src={o} width = "20vw" height = "20vh"alt="X Image" />
        </div>  
   
          <div className = {styles.pickplayerbox}>

        
            <div className={styles.pckplyr}>PICK PLAYER
            <div style = {{
            width:"17vw",
            height:"6vh",
            display:"flex", 
            flexDirection:"row", 
            backgroundColor: "#192A32", 
            marginLeft:"1vw", 
            marginTop:"2vh", 
            justifyContent:"center", 
            alignItems:"center", 
            gap:"4vw" }}>
             
             <div className="player-choice" data-choice="x" onClick={ ()=>{handleChoiceClick('x')}} style = {{width:"9vw", height:"4vh"}}>
                <img  src = {px} style={{height: "3vh", width: "1.5vw", marginLeft:"-2vw", marginBottom:"-1.5vh"}} />
            </div>
            
              
            
              <div className="player-choice" data-choice="o" onClick={()=>{handleChoiceClick('o')}} style = {{width:"7.5vw", height:"4vh", marginLeft:"-5vw"}}>
                <img style={{
                height: "4vh",
                width: "8.5vw",
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                
              }} src={py} width="15vw" height="15vh" />
              </div>
             
     
    
        </div>
        </div>
        </div>
        <Link to= "/checklist2" state={{from:selectedChoice}} style={{ textDecoration: 'none',color:"black" }}>
        <div onClick={() => {resetGameAndScores}}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '19vw',
          height: '4vh',
          fontFamily: 'sans-serif',
          fontSize: '13px',
          fontWeight: '600',
          marginTop: '3vh',
          alignItems: 'center',
          backgroundColor: '#F2B237',
          borderRadius: '5px'
        }}>NEW GAME (VS CPU)</div>
         </Link>
       
        <div style={{
          display: "flex",
          justifyContent: "center",

          width:"19vw",
          height:"4vh",
          fontFamily: "sans-serif",
          fontSize: "13px",
          fontWeight: "600",
          marginTop: "3vh",
          alignItems: 'center',
          backgroundColor: "#32C4C3",
          borderRadius:"5px"}}>NEW GAME ( VS HUMAN ) Coming soon</div>

          <CopyToClipboard text="http://localhost:5173/" >
          <div style={{
          display: "flex",
          justifyContent: "center",

          width:"14vw",
          height:"4vh",
          fontFamily: "sans-serif",
          fontSize: "13px",
          fontWeight: "600",
          marginTop: "7vh",
          alignItems: 'center',
          backgroundColor: "#F2B237",
          borderRadius:"5px",
          cursor: 'pointer'}} onClick={handleCopyLink}>Invite your friend</div>
        </CopyToClipboard>
       
        </div>
        <div className={styles.quotehome}>
          <H3>Quote #{quoteno}</H3>
          <p style={{display:"flex", justifyContent:"center", alignItems:"center", color:"#F2B237", width:"9vw", marginTop:"-2.5vh", marginLeft:"3vw",  fontWeight: "600"}}>{quote}</p>
          <div style={{height:"4vh", width:"2vw", borderRadius: "50%", backgroundColor:"#32C4C3", marginLeft:"6vw", position:"fixed", marginTop:"21vh" }}>
              <img style={{marginTop:"1vh"}} src = {quoteimg}/>
          </div>
          <ToastContainer style={{height:"2vh",width:"16vw",backgroundColor:"#ffff"}}/>
        </div>
        </>
    
);
}
export default Home;
