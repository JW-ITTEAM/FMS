import cookie from 'cookie';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../components/Layout'
import { useRouter } from 'next/router';
import { Button, Col, Row } from 'reactstrap';

const Index = ({Cookie}) => {
   const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)
   const router = useRouter()
   
   function shuffle(emp) {
    var currentIndex = emp.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = emp[currentIndex];
      emp[currentIndex] = emp[randomIndex];
      emp[randomIndex] = temporaryValue;
    }
    return emp
  }
   var emp = [
     "JOSEPH",
     "JOANNE",
     "JAMES",
     "ROCKY",
     "SARAH",
     "JAMIE",
     "RYAN",
     "DANIEL",
     "MELISSA",
     "ABI",
     "KEVIN",
     "BRIAN",
     "JIMMY",
     "IAN",
     "SAM",
     "LEXI",
     "DAVID",
     "CHLOE",
     "ANNA",
     "HENRY",
     "LUKE",
   ];
   useEffect(()=>{
     !TOKEN && router.push("/login");
   }, [])
   if(TOKEN && TOKEN.group===1) {
     return (
       <>
         <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundRepeat: "no-repeat",
             backgroundSize: '100% 100%',
           }}
         >
           <Col className="py-0 px-0">
           <div className="neons" style={{top: '40%',left: '30%'}}>
             <h1
               className="text-center"
               style={{
                 textAlign: "center",
                 color: "white",
                 fontSize: "5rem",
               }}
             >
               <a href="#timetable" style={{textDecoration: 'none', color: 'white'}}>JW 크리스마스 연말파티</a>
             </h1>
           </div>
           </Col>
         </Row>
         <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundRepeat: "no-repeat",
             backgroundSize: '100% 100%',
           }}
         >
           <Col>
           <div id="timetable" className="neons" style={{position: 'absolute', left: '35%'}}>
            <a href="#santa" style={{textDecoration: 'none'}}><h1>TIME TABLE</h1></a>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>SECRTE SANTA</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>GAME</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>KARAOKE</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>PRICE</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>GIFT DRAW</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>COSTUME CONTEST</h2>
            <h2 style={{color: 'white', marginTop: '4rem', fontSize: '1.5rem'}}>RAFFLE</h2>
           </div>
           </Col>
           </Row>
           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundRepeat: "no-repeat",
             backgroundSize: '100% 100%',
           }}
         >
           <Col>
           <div id="santa" className="neons" style={{position: 'absolute', left: '35%'}}>
            <a href="#game1" style={{textDecoration: 'none'}}><h1>SECRTE SANTA</h1></a>
            <img style={{position: 'absolute', left: '0%', width: '80%'}} src='chris/sant.png' />
            <h2 style={{marginTop: '20rem', color: 'white'}}>사전에 선택하신 분에게 사랑이 듬뿍 담긴 선물을 전달하세요</h2>
            <h2 style={{color: 'white'}}>내용내용</h2>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game1" className="neons" style={{position: 'absolute', left: '35%'}}>
            <a href="#game2" style={{textDecoration: 'none'}}><h1>몸으로 말해요 게임</h1></a>
            <h2 style={{color: 'white', fontSize: '3rem'}}>표현하는 물체를 맞춰보세요</h2>
            <h2 style={{color: 'white', marginTop: '10%'}}>정답! 이름! 을 먼저 외쳐야 정답으로 인정합니다.</h2>
            <h2 style={{color: 'white', marginTop: '10%'}}>개인전으로 진행되며, 상금은 GIFT CARD 입니다.</h2>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundRepeat: "no-repeat",
             backgroundSize: '100% 100%',
           }}
         >
           <Col>
           <div id="game2" className="neons" style={{position: 'absolute', left: '35%'}}>
            <h1>맞춰보세요 게임</h1>
            <h2 style={{color: 'white', fontSize: '1.5rem'}}>RYAN과 MELISSA 의 대화를 듣고</h2>
            <h2 style={{color: 'white', fontSize: '1.5rem'}}>화면 근접 사진에 해당하는 음식을 맞춰보세요</h2>
            <a href="#game11"><h2 style={{textDecoration: 'none', color: 'white', fontSize: '1.5rem', marginTop: '5rem', color: 'blue'}}>게임 시작</h2></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture1.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game11" style={{position: 'absolute', left: '90%'}}>
            <a href="#game11a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer1.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game11a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game12"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture2.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game12" style={{position: 'absolute', left: '90%'}}>
            <a href="#game12a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer2.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game12a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game13"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture3.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game13" style={{position: 'absolute', left: '90%'}}>
            <a href="#game13a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer3.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game13a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game14"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture4.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game14" style={{position: 'absolute', left: '90%'}}>
            <a href="#game14a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer4.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game14a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game15"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture5.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game15" style={{position: 'absolute', left: '90%'}}>
            <a href="#game15a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer5.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game15a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game16"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture6.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game16" style={{position: 'absolute', left: '90%'}}>
            <a href="#game16a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer6.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game16a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game17"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture7.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game17" style={{position: 'absolute', left: '90%'}}>
            <a href="#game17a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer7.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game17a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game18"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture8.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game18" style={{position: 'absolute', left: '90%'}}>
            <a href="#game18a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer8.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game18a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game19"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture9.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game19" style={{position: 'absolute', left: '90%'}}>
            <a href="#game19a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer9.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game19a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game20"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture20.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game20" style={{position: 'absolute', left: '90%'}}>
            <a href="#game20a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer20.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game20a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game21"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture21.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game21" style={{position: 'absolute', left: '90%'}}>
            <a href="#game21a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer21.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game21a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game22"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture22.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game22" style={{position: 'absolute', left: '90%'}}>
            <a href="#game22a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer22.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game22a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game23"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture23.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game23" style={{position: 'absolute', left: '90%'}}>
            <a href="#game23a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer23.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game23a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game24"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture24.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game24" style={{position: 'absolute', left: '90%'}}>
            <a href="#game24a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer24.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game24a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game25"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture25.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game25" style={{position: 'absolute', left: '90%'}}>
            <a href="#game25a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>
           
           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer25.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game25a" style={{position: 'absolute', left: '90%'}}>
           <a href="#game26"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture26.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game26" style={{position: 'absolute', left: '90%'}}>
            <a href="#game26a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer26.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game26a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game27"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture27.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game27" style={{position: 'absolute', left: '90%'}}>
            <a href="#game27a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer27.jpeg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game27a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game28"><h1>다음</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture28.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game28" style={{position: 'absolute', left: '90%'}}>
            <a href="#game28a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer28.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game28a" style={{position: 'absolute', left: '90%'}}>
            <a href="#game29"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Picture29.png)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game29" style={{position: 'absolute', left: '90%'}}>
            <a href="#game29a"><h1>정답</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/Answer29.jpg)",
             backgroundSize: '100% 100%',
             backgroundRepeat: "no-repeat",
           }}
         >
           <Col>
           <div id="game29a" style={{position: 'absolute', left: '90%'}}>
            <a><h1>끝</h1></a>
           </div>
           </Col>
           </Row>

           <Row
           style={{
             height: "100vh",
             backgroundImage: "url(chris/bg.jpg)",
             backgroundRepeat: "no-repeat",
             backgroundSize: '100% 100%',
           }}
         >
           <Col>
           
           <div id="random" className="neons" style={{position: 'absolute', left: '30%'}}>
            <a href="#raffle" style={{textDecoration: 'none'}}><h1>크리스마스 선물 뽑기</h1></a>
           </div>
           </Col>
           <Col>
            <h2 style={{position: 'absolute',marginTop: '20%', color: 'white', textAlign: 'center', left: '5%'}}>{shuffle(emp).toString()}</h2>
            <Button onClick={()=>router.reload()} style={{position: 'absolute',marginTop: '30%', textAlign: 'center', left: '43%', padding: '1rem'}}>SHUFFLE</Button>
           </Col>
           </Row>
         <style global jsx>
           {`
             body {
               margin: 0 !important;
             }
             @font-face {
               font-family: "NEXON Lv2 Gothic";
               src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff")
                 format("woff");
               font-weight: normal;
               font-style: normal;
             }
             h1,
             h2,
             h3,
             h4,
             h5,
             p {
               font-family: "NEXON Lv2 Gothic";
             }
             .neons {
               text-align: center;
               position: absolute;
             }

             .neons h1 {
               font-size: 5rem;
               text-align: center;
               font-weight: bold;
               -webkit-animation: glow 2s ease-in-out infinite alternate;
               -moz-animation: glow 2s ease-in-out infinite alternate;
               animation: glow 2s ease-in-out infinite alternate;
             }

             @-webkit-keyframes glow {
               from {
                 color: #fff;
                 text-shadow: 0 0 10px #00fff2, 0 0 20px #00fff2,
                   0 0 30px #00fff2, 0 0 40px #00fff2, 0 0 50px #00fff2,
                   0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 90px #00fff2;
               }

               to {
                 color: gray;
                 text-shadow: 0 0 20px #00fff2, 0 0 30px #00fff2,
                   0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2,
                   0 0 70px #00fff2, 0 0 80px #00fff2, 0 1 90px #00fff2;
               }
             }
           `}
         </style>
       </>
     );
   } else {
      return(<p>Redirecting...</p>)
   }
}

export async function getServerSideProps({req}) {
    const cookies = cookie.parse(req? req.headers.cookie || "" : window.document.cookie)

    console.log(jwt.decode(cookies.jamesworldwidetoken).username+' LOADED CRHISTMAS')
    // Pass data to the page via props
    return { props: { Cookie: cookies } };
  }

export default Index;