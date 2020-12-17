import { Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, InputGroup, Input, InputGroupAddon, InputGroupText, Alert, FormGroup, Label, CustomInput } from "reactstrap";
import classnames from 'classnames';
import { useRouter } from 'next/router';

export const Activity = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    return (
      <>
        <hr />
        <Row className="mb-4">
          <Col sm="3">
            <span className="text-warning">
              <span className="fa-stack">
                <i className="fa fa-circle fa-stack-2x text-warning"></i>
                <i className="fa fa-cloud fa-stack-1x fa-inverse"></i>
              </span>
              ACTIVITY
            </span>
          </Col>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Comment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Status
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row style={{ display: "block", marginLeft: "5px" }}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row style={{ display: "block", width: "100%" }}>
                <Card body style={{ borderRadius: "0" }}>
                  <div
                    style={{
                      margin: ".5em 0 0",
                      border: "none",
                      lineHeight: "1.2",
                    }}
                  >
                    <div
                      className="avatar"
                      style={{
                        display: "block",
                        width: "2.5em",
                        height: "auto",
                        float: "left",
                        margin: ".2em 0 0 ",
                      }}
                    >
                      <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"></img>
                    </div>
                    <div
                      className="content"
                      style={{
                        marginLeft: "4.2em",
                        marginTop: "0.2rem",
                        fontSize: "0.8em",
                      }}
                    >
                      <a
                        className="author"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Matt
                      </a>
                      <div
                        className="metadata"
                        style={{
                          display: "inline-block",
                          marginLeft: "0.5em",
                          color: "gray",
                        }}
                      >
                        <div>Today at 5:42PM</div>
                      </div>
                      <div className="text" style={{ marginTop: "0.6em" }}>
                        How artistic!
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: ".5em 0 0",
                      border: "none",
                      lineHeight: "1.2",
                    }}
                  >
                    <div
                      className="avatar"
                      style={{
                        display: "block",
                        width: "2.5em",
                        height: "auto",
                        float: "left",
                        margin: ".2em 0 0 ",
                      }}
                    >
                      <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"></img>
                    </div>
                    <div
                      className="content"
                      style={{ marginLeft: "4.2em", fontSize: "0.8em" }}
                    >
                      <a
                        className="author"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Matt
                      </a>
                      <div
                        className="metadata"
                        style={{
                          display: "inline-block",
                          marginLeft: "0.5em",
                          color: "gray",
                        }}
                      >
                        <div>Today at 5:42PM</div>
                      </div>
                      <div className="text" style={{ marginTop: "0.8em" }}>
                        This has been very useful for my research. Thanks as
                        well! This has been very useful for my research. Thanks
                        as well!
                      </div>
                    </div>
                  </div>
                  <InputGroup className="pt-4">
                    <Input />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-edit mr-1"></i>
                        <a
                          href="#"
                          style={{ fontSize: "0.8rem", color: "black" }}
                        >
                          Add Reply{" "}
                        </a>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Card>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row style={{ width: "100%" }}>
                <Col sm="6">
                  <Card body style={{ borderRadius: "0" }}>
                      <span className="text-success">
                        <span className="fa-stack">
                          <i className="fa fa-circle fa-stack-2x text-success"></i>
                          <i className="fa fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        CALENDAR
                      </span>
                    <InputGroup size="sm" className="mt-4 mb-2">
                      <InputGroupAddon addonType="prepend">
                        Last Free Day
                      </InputGroupAddon>
                      <Input
                        type="date"
                        name="date"
                        id="lastfree"
                        placeholder="date placeholder"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="my-2">
                      <InputGroupAddon addonType="prepend">
                        Picked Up Date
                      </InputGroupAddon>
                      <Input
                        type="date"
                        name="date"
                        id="picked"
                        placeholder="date placeholder"
                      />
                    </InputGroup>
                    <InputGroup size="sm" className="my-2">
                      <InputGroupAddon addonType="prepend">
                        Empty Return Date
                      </InputGroupAddon>
                      <Input
                        type="date"
                        name="date"
                        id="empty"
                        placeholder="date placeholder"
                      />
                    </InputGroup>
                    <Button
                      outline
                      color="primary"
                      className="mt-2"
                      style={{ borderRadius: "0" }}
                    >
                      Submit
                    </Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body style={{ borderRadius: "0" }}>
                    <FormGroup>
                      <span className="text-success">
                        <span className="fa-stack">
                          <i className="fa fa-circle fa-stack-2x text-success"></i>
                          <i className="fa fa-tasks fa-stack-1x fa-inverse"></i>
                        </span>
                        STATUS
                      </span>
                      <div className="mt-4">
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch"
                          name="customSwitch"
                          label="PRE ALERT"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch2"
                          name="customSwitch"
                          label="ISF"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch3"
                          name="customSwitch"
                          label="OBL"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch4"
                          name="customSwitch"
                          label="O/F"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch5"
                          name="customSwitch"
                          label="A/N"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch6"
                          name="customSwitch"
                          label="C/B"
                          className="mb-2"
                        />
                        <CustomInput
                          type="switch"
                          id="exampleCustomSwitch7"
                          name="customSwitch"
                          label="ARRIVAL"
                        />
                      </div>
                    </FormGroup>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Row>
      </>
    );}
export default Activity;