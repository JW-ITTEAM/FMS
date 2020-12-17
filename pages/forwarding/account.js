import cookie from 'cookie';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import Layout from "../../components/Layout";
import moment from 'moment';
import { useRouter } from "next/router";
import BootstrapTable from 'react-bootstrap-table-next';
import { Jumbotron, Container, Row, Col, Table, Button } from "reactstrap";

const Account = ({Cookie, Account}) => {
  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)
  const router = useRouter();
  useEffect(()=>{
    !TOKEN && router.push("/login");
  }, [])

  const columns = [{
    dataField: 'REF',
    text: 'Reference',
    sort: true,
    formatter: (cell)=>(<a href='#' onClick={()=>router.push(`/forwarding/ocean/${cell}`)}>{cell}</a>)
  }, {
    dataField: 'Customer',
    text: 'Customer'
  }, {
    dataField: 'MBL',
    text: 'MBL',
  }, {
    dataField: 'HBL',
    text: 'HBL',
  } , {
    dataField: 'ETD',
    text: 'ETD',
    sort: true,
    formatter: (cell)=> (moment(cell).format('L'))
  }, {
    dataField: 'ETA',
    text: 'ETA',
    sort: true,
    formatter: (cell)=> (moment(cell).format('L'))
  }];

  const defaultSorted = [{
    dataField: 'REF',
    order: 'desc'
  }];
  
  if(TOKEN && TOKEN.group) {
    return (
      <Layout TOKEN={TOKEN}>
        <Container fluid={true}>
          <Row>
            <Col>
              <h1>Customer</h1>
            </Col>
          </Row>
          {Account ? (
            <Row>
              <Col>
                <BootstrapTable
                  hover
                  keyField="F_ID"
                  columns={columns}
                  data={Account}
                  rowStyle={{ height: "30px" }}
                  defaultSorted={defaultSorted}
                />
              </Col>
            </Row>
          ) : (
            <h1>YOU HAVE NO ACCOUNTS AT THE MOMENT</h1>
          )}
        </Container>
      </Layout>
    )
  } else {
    return(<p>Redirecting...</p>)
  }
}

export async function getServerSideProps({req}) {
  // Fetch data from external API
  const cookies = cookie.parse(req? req.headers.cookie || "" : window.document.cookie)
  var Accounts;
  const getAccount = await fetch(`${process.env.BASE_URL}api/forwarding/getAccount`, {headers: {token: cookies.jamesworldwidetoken}});
  Accounts = await getAccount.json();

  // Pass data to the page via props
  return { props: { Cookie: cookies, Account: Accounts } };
}

export default Account;