/*
FILE: [DETAIL].JS

OCEAN IMPORT AND EXPORT DETAIL PAGE

CONSIST WITH THREE PART - HEAD, ROUTE, MAIN

HEAD - HEADER / BACK, SHARE BUTTONS
MAIN - [LEFT] OVERALL INFO WITH HOUSE, CONTAINER INFO
ROUTE - DISCHARGE, ARRIVAL
*/
import cookie from 'cookie'
import Layout from "../../../components/Layout";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import Head from "../../../components/Forwarding/Head";
import Main from "../../../components/Forwarding/Main";
import Route from "../../../components/Forwarding/Route";

import jwt from 'jsonwebtoken'

const Detail = ({ Cookie, OCEAN, FILE }) => {
  const router = useRouter()
  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)
  const [Master, setMaster] = useState(false)
  const [House, setHouse] = useState(false)
  const [Containers, setContainer] = useState(false)
  const [AP, setAP] = useState(false)
  
  useEffect(() => {
    !TOKEN && router.push("/login");
    if(OCEAN.status) {
        setMaster(OCEAN.M)
        setHouse(OCEAN.H)
        setContainer(OCEAN.C)
        setAP(OCEAN.A)
        console.log(OCEAN)
    } else {
        setMaster(false)
    }
  });
  if(TOKEN && TOKEN.group) {
  return (
    <>
      <Layout TOKEN={TOKEN} TITLE={Master.F_RefNo}>
        {Master ? (<Container fluid={true}>
            <Head REF={Master.F_RefNo} POST={Master.F_PostDate} PIC={Master.F_U2ID}/>
            <Row>
              <Col lg={10}>
                  <Main TYPE="OCEAN" Master={Master} House={House} Containers={Containers} AP={AP} FILES={FILE} />
              </Col>
              <Col lg={2}>
                  <Route ETA={Master.F_ETA} ETD={Master.F_ETD} DISCHARGE={Master.F_Discharge||Master.F_DisCharge} LOADING={Master.F_LoadingPort} DEST={Master.F_FinalDest}/>
              </Col>
            </Row>
            </Container>
        ) : (
            <Container fluid={true}>
            <Row>
              <Col className="text-center">
                <Alert color="danger">
                  ERROR: {router.query.Detail} NOT FOUND!
                </Alert>
                <Button
                  color="secondary"
                  style={{borderRadius: '0'}}
                  onClick={() => router.back()}
                >
                  Return To Page
                </Button>
              </Col>
            </Row>
          </Container>
        )
        }
        {/* IF THE REFERENCE NUMBER IS NOT FOUND, DISPLAY ERROR PAGE */}
      </Layout>
    </>
  )} else {
    return (<p>Redirecting...</p>)
  }
};

export async function getServerSideProps({req, query}) {
  const cookies = cookie.parse(req? req.headers.cookie || "" : window.document.cookie)
  
  // FETCH FROM ** FREIGHT STREAM
  const FETCH = await fetch(`${process.env.BASE_URL}api/forwarding/oceanDetail`, {headers: {reference: query.Detail, import: 0}})
  const FJSON = await FETCH.json();

  const Fetch = await fetch(`http://localhost:3000/api/files/FORWARDING/${query.Detail}`)
  var Files=null;
  if(Fetch.status===200) {
    Files = await Fetch.json()
  }

  //LOG
  if(cookies.jamesworldwidetoken) {
    console.log(jwt.decode(cookies.jamesworldwidetoken).username+' LOADED FORWARDING/OCEAN/'+query.Detail)
  }
  return { props: { Cookie: cookies, OCEAN: FJSON, FILE: Files } };
}

export default Detail;