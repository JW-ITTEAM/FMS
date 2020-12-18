import cookie from "cookie";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import Layout from "../../components/Layout";
import Header from "../../components/Index/Header";
import YearChart from "../../components/Index/YearChart";
import OIM from "../../components/Index/OIM";
import AIM from "../../components/Index/AIM";
import { Badge, Button, Card, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from "reactstrap";
import { useRouter } from "next/router";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment";

const Index = ({ Cookie, Re }) => {
  const TOKEN = jwt.decode(Cookie.jamesworldwidetoken);
  const router = useRouter();
  const [Year, setYear] = useState({});
  const [Ocean, setOcean] = useState([]);
  const [Air, setAir] = useState([]);

  const [search, setSearch] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

  function indication() {
    return (
      <span>
        {loading ? (
          <Spinner color="primary" size="sm" />
        ) : result ? (
          `Your search ${search} did not match any documents.`
        ) : (
          `Please search`
        )}
      </span>
    );
  }

  const getResult = async () => {
    setResult([]);
    setLoading(true);
    // V_JWI_SERACH - COLUMNS: MASTER_TABLE / MASTER_ID / RefNO / MASTER_BLNO / HOUSE_BLNO / CUSTOMER / CONSINGEE / SHIPPER / ETD / ETA / PIC
    const fetchs = await fetch("/api/forwarding/freightStreamSearch", {
      headers: {
        query: search,
        name: TOKEN.username,
        options: [
          "CUSTOMER",
          "CONSIGNEE",
          "SHIPPER",
          "MASTER_BLNO",
          "HOUSE_BLNO",
          "RefNO",
        ],
      },
    });
    router.push({ pathname: `/forwarding`, query: { search } });
    if (fetchs.status === 200) {
      const ocean = await fetchs.json();
      if (ocean.result) {
        setResult(ocean.ocean);
      } else {
        setLoading(false)
        console.log("NO RESULT");
      }
    } else {
      alert("ERROR");
    }
  };

  async function GET() {
    const year = await fetch("/api/chart/TotalYear").then((t) => t.json());
    setYear(year[0]);
    const ocean = await fetch("/api/chart/ocean").then((t) => t.json());
    setOcean(ocean);
    const air = await fetch("/api/chart/AIM").then((t) => t.json());
    setAir(air);
  }
  useEffect(() => {
    !TOKEN && router.push("/login");
    GET();
  }, []);

  const columnStyle = {
    fontSize: "0.8em",
    textAlign: "left",
    verticalAlign: "middle",
    wordWrap: "break-word",
  };
  const column = [
    {
      dataField: "RefNO",
      text: "REF",
      formatter: (cell) => <a href="#" style={{fontSize: '0.9em'}}>{cell}</a>,
      events: {
        onClick: (e, columns, columnIndex, row) => {
          console.log(row.MASTER_TABLE);
          row.MASTER_TABLE == "T_OIMMAIN" &&
            router.push(
              `/forwarding/oim/[Detail]`,
              `/forwarding/oim/${row.RefNO}`
            );
          row.MASTER_TABLE == "T_OOMMAIN" &&
            router.push(
              `/forwarding/oex/[Detail]`,
              `/forwarding/oex/${row.RefNO}`
            );
          row.MASTER_TABLE == "T_AIMMAIN" &&
            router.push(
              `/forwarding/aim/[Detail]`,
              `/forwarding/aim/${row.RefNO}`
            );
          row.MASTER_TABLE == "T_AOMMAIN" &&
            router.push(
              `/forwarding/aex/[Detail]`,
              `/forwarding/aex/${row.RefNO}`
            );
          row.MASTER_TABLE == "T_GENMAIN" &&
            router.push(
              `/forwarding/other/[Detail]`,
              `/forwarding/other/${row.RefNO}`
            );
        },
      },
      style: { textAlign: "center", width: "10%" },
      headerStyle: { fontSize: "0.8rem", width: "10%", textAlign: "center" },
      sort: true,
    },
    {
      dataField: "MASTER_BLNO",
      text: "MBL",
      style: columnStyle,
      headerStyle: { fontSize: "0.8rem", textAlign: "center" },
      sort: true,
    },
    {
      dataField: "HOUSE_BLNO",
      text: "HBL",
      style: columnStyle,
      headerStyle: { fontSize: "0.8rem", textAlign: "center" },
      sort: true,
    },
    {
      dataField: "CUSTOMER",
      text: "CUSTOMER",
      style: columnStyle,
      headerStyle: { fontSize: "0.8rem", textAlign: "center" },
      sort: true,
    },
    {
      dataField: "SHIPPER",
      text: "SHIPPER",
      style: columnStyle,
      headerStyle: { fontSize: "0.8rem", textAlign: "center" },
      sort: true,
    },
    {
      dataField: "POSTDATE",
      text: "POST",
      style: columnStyle,
      sort: true,
      headerStyle: { width: "7%", fontSize: "0.8em", textAlign: "center" },
      formatter: (cell) => {
        if (moment(cell).isSameOrBefore(moment())) {
          return (
            <div style={{ color: "gray" }}>{moment(cell).format("L")}</div>
          );
        } else {
          return (
            <div style={{ color: "blue" }}>{moment(cell).format("L")}</div>
          );
        }
      },
    },
    {
      dataField: "ETD",
      text: "ETD",
      style: columnStyle,
      sort: true,
      headerStyle: { width: "7%", fontSize: "0.8em", textAlign: "center" },
      formatter: (cell) => {
        if (moment(cell).isSameOrBefore(moment())) {
          return (
            <div style={{ color: "gray" }}>{moment(cell).format("L")}</div>
          );
        } else {
          return (
            <div style={{ color: "blue" }}>{moment(cell).format("L")}</div>
          );
        }
      },
    },
    {
      dataField: "ETA",
      text: "ETA",
      style: columnStyle,
      sort: true,
      headerStyle: { width: "7%", fontSize: "0.8em", textAlign: "center" },
      formatter: (cell) => {
        if (moment(cell).isSameOrBefore(moment())) {
          return (
            <div style={{ color: "gray" }}>{moment(cell).format("L")}</div>
          );
        } else {
          return (
            <div style={{ color: "blue" }}>{moment(cell).format("L")}</div>
          );
        }
      },
    },
    {
      dataField: "U1ID",
      text: "PIC",
      style: columnStyle,
      headerStyle: { fontSize: "0.8rem", width: "6%", textAlign: "center" },
      sort: true,
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2 text-secondary">
      Showing { from } to { to } of { size } Results
    </span>
  );

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => (
    <div className="btn-group" role="group">
      {
        options.map((option) => {
          const isSelect = currSizePerPage === `${option.page}`;
          return (
            <Button
              key={ option.text }
              type="button"
              onClick={ () => onSizePerPageChange(option.page) }
              style={{borderRadius: '0'}}
              size="sm"
              className={ `btn mb-2 ${isSelect ? 'btn-secondary' : 'btn-info'}` }
            >
              { option.text }
            </Button>
          );
        })
      }
    </div>
  );

  if (TOKEN && TOKEN.group) {
    return (
      <Layout TOKEN={TOKEN} TITLE="FORWARDING">
        <h3
          className="mb-4"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: "700" }}
        >
          Forwarding
        </h3>
        {/* SERACH BAR */}
        <Row className="mb-4">
          <Col>
            <Input
              title="search"
              placeholder="SEARCH OCEAN, AIR, OTHERS"
              bsSize="sm"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key == "Enter") getResult();
              }}
              style={{
                width: "100%",
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
              disabled={!search}
              className="search-button"
              outline
            >
              Search
            </Button>
          </Col>
        </Row>
        {/* SEARCH BAR END */}
        <Row>
          {/* DISPLAY SEARCH RESULT */}
          <ToolkitProvider
            keyField="RefNO"
            bordered={false}
            columns={column}
            wrapperClasses="table-responsive"
            data={result || Re.ocean || []}
            exportCSV
            search
          >
            {(props) => (
              <Col>
                <BootstrapTable
                  {...props.baseProps}
                  hover
                  striped
                  condensed
                  noDataIndication={indication}
                  pagination={paginationFactory({
                    showTotal: true,
                    paginationTotalRenderer: customTotal,
                    sizePerPageRenderer
                  })}
                />
              </Col>
            )}
          </ToolkitProvider>
        </Row>

        {/* <BootstrapTable
          hover
          striped
          condensed
          keyField="RefNO"
          bordered={false}
          columns={column}
          noDataIndication={indication}
          wrapperClasses="table-responsive"
          data={result || Re.ocean || []}
        /> */}

        {/* <ul>
                {result && result.map(ga=> <li key={ga.RefNO}>{ga.CUSTOMER}</li>)}
           </ul> */}
        {/* <Row className="mb-4">
           <Col>
             <Card style={{ padding: "5rem" }}>
               <Button
                 className="mr-2"
                 style={{ borderRadius: 0 }}
                 color="primary"
                 onClick={() => router.push("/forwarding/ocean")}
               >
                 <i className="fa fa-ship"></i> OCEAN
               </Button>
               <h4 className="mt-4">Features</h4>
               <p className="mb-2">
                 모든 필드 검색 기능 - Search by keyword instead of columns
               </p>
               <p className="mb-2">
                 수입 수출 - Ocean Import and Export available
               </p>
               <p className="mb-2">
                 창고 배송 알람 이메일 전송 - Send ASN via E-mail
               </p>
               <p className="mb-2">
                 폴더 커버 페이지 프린트 - Folder cover print
               </p>
               <p className="mb-2">
                 AP 프린트 기능 - AP print with various type
               </p>
               <span className="mb-2">
                 아시아 데이터 파일 입력중 - Asia excel file data imported{" "}
                 <Spinner color="primary" size="sm" />
               </span>
               <span className="mb-2">
                 고객과 직원들에게 보여지는 정보 조율{" "}
                 <Spinner color="primary" size="sm" />
               </span>
             </Card>
           </Col>
           <Col>
             <Card style={{ padding: "5rem" }}>
               <Button
                 className="mr-2"
                 style={{ borderRadius: 0 }}
                 color="primary"
                 onClick={() => router.push("/forwarding/air")}
                 disabled
               >
                 <i className="fa fa-plane"></i> AIR
               </Button>
               <h4 className="mt-4">Features</h4>
               <span className="mb-2">
                 데이터 베이스 정리 준비중 - Database Sorting{" "}
                 <Spinner color="primary" size="sm" />
               </span>
             </Card>
           </Col>
           <Col>
             <Card style={{ padding: "5rem" }}>
               <Button
                 style={{ borderRadius: 0 }}
                 color="primary"
                 onClick={() => router.push("/forwarding/trucking")}
               >
                 <i className="fa fa-truck"></i> TRUCK
               </Button>
               <h4 className="mt-4">Features</h4>
               <p className="mb-2">
                 Pricing Team 이상 관리자만 수정 가능할 수 있는 기능 -
                 Authentication
               </p>
               <p className="mb-2">
                 여러 트럭 업체 견적 전송 기능 - Send quotation to companies via
                 E-mail
               </p>
               <p className="mb-2">업체 수정 기능 - EDIT trucking company</p>
               <span className="mb-2">
                 업체 추가 기능 - ADD trucking company{" "}
                 <Spinner color="primary" size="sm" />
               </span>
             </Card>
           </Col>
         </Row> */}
        <Row>
          {Year && <YearChart Data={Year} />}
          {Ocean && <OIM Data={Ocean} />}
          {Air && <AIM Data={Air} />}
        </Row>
        <style global jsx>
          {`
            @font-face {
              font-family: "NEXON Lv2 Gothic";
              src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff")
                format("woff");
              font-weight: normal;
              font-style: normal;
            }
            h4,
            p,
            span {
              font-family: "NEXON Lv2 Gothic";
              font-size: 0.9rem;
            }
            .page-link {
              border-radius: 0;
            }
            .fa-search {
              position: absolute;
              top: 12px;
              left: 30px;
            }
            .search-button {
              padding-top: 10px !important;
              padding-bottom: 10px !important;
            }
            .react-bootstrap-table table {
              table-layout: auto !important;
            }
          `}
        </style>
      </Layout>
    );
  } else {
    return <p>Redirecting...</p>;
  }
};

export async function getServerSideProps({ req, query }) {
  // Fetch data from external API
  const cookies = cookie.parse(
    req ? req.headers.cookie || "" : window.document.cookie
  );
  const fetchs = await fetch(
    `${process.env.BASE_URL}api/forwarding/freightStreamSearch`,
    {
      headers: {
        query: query.search || false,
        name:
          cookies.jamesworldwidetoken &&
          jwt.decode(cookies.jamesworldwidetoken).username,
        options: ["CUSTOMER", "MASTER_BLNO","CUSTOMER", "CONSIGNEE","SHIPPER","MASTER_BLNO","HOUSE_BLNO","RefNO",],
      },
    }
  );
  const result = await fetchs.json();
  // console.log(result)
  // Pass data to the page via props
  return { props: { Cookie: cookies, Re: result } };
}

export default Index;
