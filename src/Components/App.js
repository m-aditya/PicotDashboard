import React from "react";
import Websocket from "react-websocket";
import Device from "./Device";
import axios from "axios";
import styled from "styled-components";
import SideBar from "./Sidebar";
import "./App.css";

class App extends React.Component {
  state = {
    inReq: {},
    devices: {},
    connected: {
      count: 0
    },

    accessToken: {
      token: ""
    },

    authDev: {}
  };

  handleOpen = this.handleOpen.bind(this);
  sendMessage = this.sendMessage.bind(this);

  componentDidMount() {
    this.setState({devices:this.props.pState.devices})
  }

  addConnected(devID) {
    var con = { ...this.state.connected };
    con.count = con.count + 1;
    con[devID] = {};
    this.setState({ connected: con });
  }
  removeConnected(devID) {
    var con = { ...this.state.connected };
    con.count = con.count - 1;
    delete con.devID;
    this.setState({ connected: con });
  }

  handleData(rawData) {
    var dev = { ...this.state.devices };
    var data = JSON.parse(rawData);
    var id = data.id;
    var self = this;

    var token = this.state.accessToken.token;
    axios.defaults.headers.common["Authorization"] = token;
    axios({
      method: "get",
      url: "http://192.168.3.44:8080/graph/client_count",
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        var con = { ...self.state.connected };
        var count = response.data.count;
        con.count = count;
        self.setState({ connected: con });
      })
      .catch(function(error) {
        console.log(error);
      });

    if (typeof id !== "undefined") {
      if (!dev.hasOwnProperty(id)) {
        dev[id] = {
          status: true,
          authStat: false,
          blacklisted: false,
          inReq: {}
        };
      } else if (dev.hasOwnProperty(id)) {
        dev[id]["inReq"] = data;
        if (data.work === "disconnect") {
          dev[id]["status"] = false;
        } else {
          dev[id]["status"] = true;
        }
        /*if(dev[id]['inReq']['work']==='disconnect'){
            dev[id]['status']=false;
            this.removeConnected(id);
        }
        else if(dev[id]['inReq']['work']==='connect'){
          dev[id]['status']=true;
          this.addConnected(id);
      }*/
      }
    }
    this.setState({ devices: dev });
    this.props.updateDevices(dev);
    this.setState({ inReq: data });
    this.props.updateInReq(data);
  }

  handleOpen() {
    //alert("connected:)");

    var bodyFormData = new FormData();
    bodyFormData.set("username", "admin");
    bodyFormData.set("password", "admin");

    var self = this;
    axios({
      method: "post",
      url: "http://192.168.3.44:8080/api/login",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        var token = response.data.access_token;
        var accessToken = { ...self.state.accessToken };
        accessToken.token = token;
        self.props.updateToken(token);
        self.setState({ accessToken });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClose() {
    //alert("disconnected:)");
  }

  sendMessage() {
    var bodyFormData2 = new FormData();

    bodyFormData2.set("clientid", "JID01");
    bodyFormData2.set("topic", "Bulb_Con");

    bodyFormData2.set("message", "STOP");

    var token = this.state.accessToken.token;

    axios.defaults.headers.common["Authorization"] = token;
    axios({
      method: "post",
      url: "http://192.168.3.44:8080/clientsend",
      data: bodyFormData2
    })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const GridContainer = styled.div`
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(300px, 0.5fr));
    `;

    const Title = styled.h1`
      display: block;
      font-size: 2em;
      margin-top: 0.67em;
      margin-bottom: 0.67em;
      margin-left: 0;
      margin-right: 0;
      font-weight: 600;
      color: white;
    `;

    return (
      <div id="App">
        <Websocket
          url="ws://192.168.3.44:8081"
          onMessage={this.handleData.bind(this)}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          reconnect={true}
          ref={Websocket => {
            this.refWebSocket = Websocket;
          }}
        />
        <div id="outer-container">
          <Title>Dashboard</Title>
          <SideBar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            state={this.state}
          />
          <main id="page-wrap">
            {/*Data:{JSON.stringify(this.state.devices, null, 2)}
            <br />
            Connected:{JSON.stringify(this.state.connected, null, 2)}
            <br />
            <br />*/}
            <GridContainer>
              {Object.keys(this.state.devices).map(key =>
                this.state.devices[key].status &&
                this.state.devices[key].authStat ? (
                  <Device
                    key={key}
                    index={key}
                    details={this.state.devices[key]}
                    token={this.state.accessToken.token}
                  />
                ) : (
                  <div />
                )
              )}
            </GridContainer>
            <br />
            <br />
            {/*<button onClick={this.sendMessage}>SEND STOP MESSAGE</button>*/}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
