import cookie from 'cookie';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import Layout from "../../../components/Layout";
import moment from 'moment';
import { useRouter } from "next/router";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Jumbotron, Container, Row, Col, Table, Button, Card, CardBody, InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";

const Account = ({Cookie, Account}) => {
  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)
  const router = useRouter();
  useEffect(()=>{
    !TOKEN && router.push("/login");
    console.log(Account)
  }, [])
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;

  const columns = [{
    dataField: 'REF',
    text: 'REF',
    sort: true,
    formatter: (cell)=>(<a href='#' onClick={()=>router.push(`/forwarding/ocean/${cell}`)}>{cell}</a>)
  }, {
    dataField: 'SHIPPER',
    text: 'SHIPPER',
    sort: true,
  }, {
    dataField: 'MBL',
    text: 'MBL'
  }, {
    dataField: 'HBL',
    text: 'HBL',
  }, {
    dataField: 'VESSEL',
    text: 'VESSEL',
  } , {
    dataField: 'VOYAGE',
    text: 'VOYAGE',
    sort: true,
  } , {
    dataField: 'CONTAINER',
    text: 'CONTAINER',
    sort: true,
  } , {
    dataField: 'MARKPKG',
    text: 'MARKPKG',
    sort: true,
  } , {
    dataField: 'LOADING',
    text: 'LOADING',
    sort: true,
  } , {
    dataField: 'DISCHARGE',
    text: 'DISCHARGE',
    sort: true,
  } , {
    dataField: 'DEST',
    text: 'DEST',
    sort: true,
  } , {
    dataField: 'ETD',
    text: 'ETD',
    sort: true,
  } , {
    dataField: 'ETA',
    text: 'ETA',
    sort: true,
  } , {
    dataField: 'CUSTREF',
    text: 'CUSTREF',
    sort: true,
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
              <h1>MD DIRECT</h1>
              {/* <h5>SHIPPER / MBL / HBL / VESSEL VOYGE # / CNTR / VOLUME / ORIGIN / POD / FINAL DEST / ETD / ETA / REF# / ARRIVAL / STATUS</h5> */}
              <h5>MISSING: ARRIVAL / STATUS</h5>
            </Col>
          </Row>
          <Row>
          <ToolkitProvider
            hover
            keyField="REF"
            data={Account}
            columns={columns}
            defaultSorted={defaultSorted}
            exportCSV
            search
          >
            {(props) => (
                <Col>
                <div style={{ borderRadius: '0.25em', textAlign: 'right', color: 'purple'}}>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend" style={{marginBottom: '0.5rem'}}>
                  <InputGroupText>🔍</InputGroupText>
                  </InputGroupAddon>
                  <SearchBar {...props.searchProps}/>
                  <ClearSearchButton {...props.searchProps}/>
                  <ExportCSVButton { ...props.csvProps }>Export</ExportCSVButton>
                  </InputGroup>
                </div>
                  <hr />
                  <BootstrapTable {...props.baseProps} pagination={paginationFactory()} />
                </Col>
            )}
          </ToolkitProvider>
          </Row>
        </Container>
        <style jsx>
            {`
            .input-group .search-label {
                margin-bottom: 0 !important;
            }
            `}
        </style>
      </Layout>
    );
  } else {
    return(<p>Redirecting...</p>)
  }
}

export async function getServerSideProps({req}) {
  // Fetch data from external API
  const cookies = cookie.parse(req? req.headers.cookie || "" : window.document.cookie)
  var Accounts;
  const getAccount = await fetch(`${process.env.BASE_URL}api/forwarding/md`);
  Accounts = await getAccount.json();
  // Pass data to the page via props
  return { props: { Cookie: cookies, Account: Accounts } };
}

export default Account;