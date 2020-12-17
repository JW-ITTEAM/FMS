import cookie from 'cookie'
import Layout from "../../../components/Layout";
import { Container, Row, Col, Button, Input, ButtonGroup, Alert, Card } from "reactstrap";
import { useRouter } from "next/router";
import fetch from "node-fetch";
import { useEffect, useState } from "react";


import jwt from 'jsonwebtoken'

import moment from 'moment';
import Head from "../../../components/Forwarding/Head";
import HEAD from "../../../components/Ocean/HEAD";
import ROUTE from "../../../components/Ocean/ROUTE";
import MAIN from "../../../components/Ocean/MAIN";

const Detail = ({ Cookie, Detail, OCEAN }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const [Selected, setSelected] = useState(false);

  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)

  useEffect(() => {
    setIsClient(true)
    !TOKEN && router.push("/login");
    isClient && console.log(OCEAN)
    console.log(router)
  });
  if(TOKEN && TOKEN.group) {
  return (
    <>
      <Layout TOKEN={TOKEN} TITLE={OCEAN.status ? OCEAN.OCEAN[0].REF : "NOT FOUND"}>
        {OCEAN.status ? (
          <Container fluid={true}>
            {/* <Head REF={AIM.F_RefNo}/> */}
            <HEAD REF={OCEAN.OCEAN[0].REF} />
            <Row>
              <Col lg={8}>
                <MAIN DATA={OCEAN || false} ADD={Detail} />
              </Col>
              <Col lg={4}>
                <ROUTE DATA={OCEAN.OCEAN[0]} />
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
                  onClick={() => router.back()}
                >
                  Return To Page
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Layout>
    </>
  )} else {
    return (<p>Redirecting...</p>)
  }
};

export async function getServerSideProps({req, query}) {
  const cookies = cookie.parse(req? req.headers.cookie || "" : window.document.cookie)
  // Fetch data from FREIGHT STREAM
  const FETCH = await fetch(`${process.env.BASE_URL}api/forwarding/oimsrc`, {headers: {reference: query.Detail}})
  const FJSON = await FETCH.json();
  
  // Fetch data from external-FMS
  const DetailFetch = await fetch(`${process.env.BASE_URL}api/forwarding/fmsDetail`, {headers: {reference: query.Detail}})
  const Details = await DetailFetch.json();
  //LOG
  if(cookies.jamesworldwidetoken) {
  console.log(jwt.decode(cookies.jamesworldwidetoken).username+' LOADED FORWARDING/OCEAN/'+query.Detail)
  }
  // Pass data to the page via props
  return { props: { Cookie: cookies, OCEAN: FJSON, Detail: Details || false } };
}

export default Detail;