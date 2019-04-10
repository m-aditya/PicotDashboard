import React from "react";
import Websocket from "react-websocket";
import Card2 from "./Card2";
import SideBar from "./Sidebar";
import styled from "styled-components";
import Divider from '@material-ui/core/Divider';
import "./App.css";

class AuthDevice extends React.Component {
  state = {
    inReq: {},
    devices:{},
  };

  componentDidMount() {
    this.setState({devices:this.props.pState.devices})
  }

  componentDidUpdate() {
    
  };

  authList=dev=>{
  }

  authDev=key=>{
    this.state.devices[key].authStat=true;
    const dev=this.state.devices;
    this.props.updateDevices(dev);

    var auth={}
    for (key in this.state.devices){
      if(this.state.devices[key].authStat){
        auth[key]=true;
      }
    }
    this.props.updateAuthDev(auth);
  };

  blacklistDevice=key=>{
    this.state.devices[key].blacklisted=true;
    const dev=this.state.devices;
    this.props.updateDevices(dev);
  };

  handleOpen = this.handleOpen.bind(this);

  handleData(rawData) {
    var dev = { ...this.state.devices };
    var data = JSON.parse(rawData);
    var id = data.id;

    if (typeof id !== "undefined") {
      if (!dev.hasOwnProperty(id)) {
        dev[id] = {
          status: true,
          authStat:false,
          blacklisted:false,
          inReq: {}
        };
      } else if (dev.hasOwnProperty(id)) {
        dev[id]["inReq"] = data;
        if (data.work === "disconnect") {
          dev[id]["status"] = false;
        } else {
          dev[id]["status"] = true;
        }
      }
    }
    this.setState({ devices: dev });
    this.setState({ inReq: data });
  }

  handleOpen() {
    //alert("connected:)");

  }

  handleClose() {
    //alert("disconnected:)");
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
      color:white;
    `;

    const SubTitle = styled.h3`
      display: block;
      font-size: 2em;
      margin-top: 0.67em;
      margin-bottom: 0.67em;
      margin-left: 0;
      margin-right: 0;
      font-weight: 600;
      color:white;
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
        <Title>Authorise Devices</Title>
          <SideBar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <main id="page-wrap">
          
            <GridContainer>
              {Object.keys(this.state.devices).map(key =>
                this.state.devices[key].status && !this.state.devices[key].blacklisted && !this.state.devices[key].authStat ? (
                  <Card2
                    key={key}
                    index={key}
                    details={this.state.devices[key]}
                    token={this.props.pState.accessToken.token}
                    authDev={this.authDev} 
                    blacklistDevice={this.blacklistDevice}
                  />
                ) : (
                  <div />
                )
              )}
            </GridContainer>
            <br />
            <SubTitle>Blacklisted Devices</SubTitle>
            <br />
          </main>
        </div>
      </div>
    );
  }
}

export default AuthDevice;
