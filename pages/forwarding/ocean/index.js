import cookie from 'cookie';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router';
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
// PAGE COMPONENT
import { Alert, Button, ButtonGroup, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';

const About = ({Cookie, Ocean}) => { 
  const router = useRouter() 
  const [Search, setSearch] = useState();
  const [Result, setResult] = useState(false);
  const [FontSize, setFontSize] = useState(12);
  const [cSelected, setCSelected] = useState(['MBL', 'REF', 'HBL', 'LOADING', 'DISCHARGE', 'PIC', 'ACCOUNT', 'SHIPPER']);

  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken)
   useEffect(()=>{
    !TOKEN && router.push("/login");
    setResult(Ocean)
   }, [])

   async function getResult() {
    const fetchs = await fetch("/api/forwarding/search", {headers: {query: Search, name: TOKEN.username, options: cSelected}});
    const ocean = await fetchs.json();
    setResult(ocean)
   }

   const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }
   const Options = [{
     name: 'MBL',
     number: 1
   }, {
    name: 'REF',
    number: 2
   }, {
     name: 'HBL',
     number: 3
   }, {
    name: 'LOADING',
    number: 4
  }, {
    name: 'DISCHARGE',
    number: 5
  }, {
    name: 'PIC',
    number: 6
  }, {
    name: 'ACCOUNT',
    number: 7
  }, {
    name: 'SHIPPER',
    number: 8
  }]

  const columnStyle = {
    fontSize: FontSize, textAlign: 'center', wordWrap: 'break-word'
  }

  const Acolumns = [
    {
      dataField: "REF",
      text: "REF",
      formatter: (cell) => (
        <a href="#" onClick={() => router.push(`/forwarding/ocean/${cell}`)}>
          {cell}
        </a>
      ),
      style: { fontSize: FontSize, fontWeight: "bold", textAlign: "center", width: '10%' },
      headerStyle: {width: '5%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "ACCOUNT",
      text: "ACCOUNT",
      style: columnStyle,
      headerStyle: {fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "SHIPPER",
      text: "SHIPPER",
      style: columnStyle,
      headerStyle: {fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "MBL",
      text: "MBL",
      style: columnStyle,
      headerStyle: {width: '9%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "HBL",
      text: "HBL",
      style: columnStyle,
      headerStyle: {width: '9%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "LOADING",
      text: "LOADING",
      style: columnStyle,
      headerStyle: {width: '8%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "DISCHARGE",
      text: "DISCHARGE",
      style: columnStyle,
      headerStyle: {width: '8%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "DEST",
      text: "DEST",
      style: columnStyle,
      headerStyle: {width: '8%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "PIC",
      text: "PIC",
      style: columnStyle,
      headerStyle: {width: '5%', fontSize: FontSize, textAlign: 'center'},
      sort: true,
    },
    {
      dataField: "ETA",
      text: "ETA",
      style: columnStyle,
      sort: true,
      headerStyle: {width: '5%', fontSize: FontSize, textAlign: 'center'},
      formatter: (cell) => {
        if (moment(cell).isSameOrBefore(moment())) {
          return (
            <span style={{ color: "red" }}>
              {moment(cell).endOf("day").fromNow()}
            </span>
          );
        } else {
          return (
            <span style={{ color: "blue" }}>
              {moment(cell).endOf("day").fromNow()}
            </span>
          );
        }
      },
    },
    {
      dataField: "ETD",
      text: "ETD",
      style: columnStyle,
      sort: true,
      headerStyle: {width: '5%', fontSize: FontSize, textAlign: 'center'},
      formatter: (cell) => {
        if (moment(cell).isSameOrBefore(moment())) {
          return (
            <span style={{ color: "red" }}>
              {moment(cell).endOf("day").fromNow()}
            </span>
          );
        } else {
          return (
            <span style={{ color: "blue" }}>
              {moment(cell).endOf("day").fromNow()}
            </span>
          );
        }
      },
    }
  ];

   if(TOKEN && TOKEN.group) {
     return (
       <Layout TOKEN={TOKEN} TITLE="OCEAN">
         <Container fluid>
         <h3 style={{ fontFamily: "Roboto, sans-serif", fontWeight: "700" }}>
           Ocean
         </h3>
         {/* TOP 1 SERACH OPTION BUTTONS */}
         <h6
           style={{ display: "inline", marginRight: "2rem", marginTop: "1rem" }}
           className="text-primary"
         >
           Search Options:
         </h6>
         <ButtonGroup>
           {Options.map((ga) => {
             return (
               <Button
                 size="sm"
                 outline={!cSelected.includes(ga.name)}
                 color="primary"
                 onClick={() => onCheckboxBtnClick(ga.name)}
                 active={cSelected.includes(ga.number)}
                 key={ga.number}
                 style={{ borderRadius: 0 }}
               >
                 {cSelected.includes(ga.name) && (
                   <i className="fa fa-fw fa-check"></i>
                 )}
                 <span>{ga.name}</span>
               </Button>
             );
           })}
         </ButtonGroup>
           
           {/* FONT SIZE CONTROL */}
           <Row>
             <Col className="text-right">
               <ButtonGroup>
                 <Button outline color="success" style={{ borderRadius: 0 }}>
                   <span
                     style={{ fontSize: "10px" }}
                     onClick={() => setFontSize(FontSize - 1)}
                   >
                     A
                   </span>
                 </Button>
                 <Button outline color="success" style={{ borderRadius: 0 }}>
                   <span
                     style={{ fontSize: "17px" }}
                     onClick={() => setFontSize(FontSize + 1)}
                   >
                     A
                   </span>
                 </Button>
               </ButtonGroup>
             </Col>
           </Row>
           {/* TOP 2 - SERCH BAR */}
           <Row className="justify-content-md-center">
             <Col>
               <Input
                 title="search"
                 placeholder="SEARCH OCEAN IMPORT AND EXPORT"
                 bsSize="sm"
                 onChange={(e) => setSearch(e.target.value)}
                 onKeyPress={(e) => {
                   if (e.key == "Enter") getResult();
                 }}
                 style={{
                  borderRadius: "24px",
                  paddingLeft: "38px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                 }}
                 autoFocus={true}
               />
               <i className="fa fa-search"></i>
             </Col>
             <Col>
               <Button
                 color="primary"
                 onClick={getResult}
                 disabled={!Search}
                 className="search-button"
                 outline
               >
                 Search
               </Button>
             </Col>
           </Row>
           {/* TOP 3 - SHOW RESULT AS TABLE */}
           <Row className="mt-4">
             {Result &&
               (Result.result ? (
                 <Col sm={12}>
                   <Card className="mb-4">
                     <CardHeader className="py-2" style={{fontSize: '13px'}}>
                       {Result.ocean.length} RESULT FOUND
                     </CardHeader>
                     <CardBody>
                       <BootstrapTable
                         hover
                         striped
                         condensed
                         keyField="F_ID"
                         columns={Acolumns}
                         data={Result.ocean}
                       />
                     </CardBody>
                   </Card>
                 </Col>
               ) : (
                 <Col className="mb-4">
                   <Alert color="danger">No result found</Alert>
                 </Col>
               ))}
           </Row>
         </Container>
         <style global jsx>
           {`
             .fa-search {
               position: absolute;
               top: 12px;
               left: 30px;
             }
             .search-button {
               padding-top: 10px !important;
               padding-bottom: 10px !important;
             }
           `}
         </style>
       </Layout>
     );
   } else {
     return (
       <p>Redirecting...</p>
     )
   }
}

export async function getServerSideProps({req}) {
  // Fetch data from external API
  const cookies = cookie.parse(
    req ? req.headers.cookie || "" : window.document.cookie
  );

  const fetchs = await fetch(`${process.env.BASE_URL}api/forwarding/search`, {
    headers: { name: cookies.jamesworldwidetoken && jwt.decode(cookies.jamesworldwidetoken).username },
  });
  const ocean = await fetchs.json();

  // Pass data to the page via props
  return { props: { Cookie: cookies, Ocean: ocean } };
}

export default About;

