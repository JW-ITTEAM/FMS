import { Badge, Button, Col, Row } from "reactstrap";
import { useRouter } from 'next/router';
import moment from 'moment'
import { Body } from "node-fetch";

const Head = ({ REF, POST, PIC }) => {
    const router = useRouter();

    const Clipboard = () => {
        var tempInput = document.createElement('INPUT');
        document.getElementsByTagName('body')[0].appendChild(tempInput)
        tempInput.setAttribute('value',process.env.BASE_URL.substring(0, process.env.BASE_URL.length-1)+router.asPath)
        tempInput.select();
        document.execCommand('copy');
        document.getElementsByTagName('body')[0].removeChild(tempInput)
        alert("Copied to your Clipboard")
    }

    return(
    <>
    <Row>
        <Col>
            <h2>{REF}</h2>
    <Button className="mr-2" size="sm" color="primary" style={{borderRadius: 0}} onClick={Clipboard}><i className="fa fa-share"></i> Share</Button>
            <Button className="mr-2" size="sm" color="primary" style={{borderRadius: 0}}><i className="fa fa-share"></i> Edit</Button>
            <Button className="mr-2" size="sm" color="danger" style={{borderRadius: 0}} onClick={()=>router.back()}><i className="fa fa-reply"></i> Back</Button>
        </Col>
        <Col className="text-right">
            {POST&&<Badge style={{fontSize: '0.8em', color: 'gray', backgroundColor: '#FFE4B5', marginRight: '0.5rem', marginBottom: '0.5rem'}}><a target="__blank" href={`http://www.google.com/calendar/event?action=TEMPLATE&text=${REF}&dates=${moment(POST).utc().format('YYYYMMDD')}T080000Z/${moment(POST).utc().format('YYYYMMDD')}T090000Z&details=${REF}${PIC}&location=JAMES WORLDWIDE INC.`}>POST DATE: {moment(POST).utc().format('ll')}</a></Badge>}
            {PIC&&<Badge style={{fontSize: '0.8em', color: 'gray', backgroundColor: '#FFE4B5', marginRight: '0.5rem', marginBottom: '0.5rem'}}>PIC: {PIC}</Badge>}
            <p style={{fontSize: '0.7em'}}>Function - Send data to Google Calendar</p>
        </Col>
    </Row>
    <hr />
    </>
)}
export default Head;