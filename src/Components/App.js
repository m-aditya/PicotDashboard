import React from "react";
import Websocket from "react-websocket";
import Device from "./Device";
import axios from "axios";
import styled from "styled-components";
//import SideBar from "./Sidebar";
import AppBar from "./AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

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

    authDev: {},
    open: false,
    vertical: "top",
    horizontal: "right"
  };

  handleOpen = this.handleOpen.bind(this);
  sendMessage = this.sendMessage.bind(this);

  componentWillMount() {
    this.setState({ devices: this.props.pState.devices });
    this.setState({ authDev: this.props.pState.authDev });
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
    var auth = { ...this.state.authDev };
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
        if (auth[id]) {
          dev[id] = {
            authStat: true
          };
        }
        this.setState({ open: true });
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
    this.props.updateDevices(dev);
    this.setState({ inReq: data });
    this.props.updateInReq(data);
  }

  handleOpen() {
    //alert("connected:)");

    var bodyFormData = new FormData();
    bodyFormData.set("username", "admin");
    bodyFormData.set("password", "admin");
    var at = this.props.pState.accessToken.token;
    if (at.length === 0) {
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
    } else {
      var accessToken = this.state.accessToken;
      this.setState({ accessToken: this.props.pState.accessToken });
    }
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

  handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

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
    const { vertical, horizontal, open } = this.state;
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
          <AppBar />
          <div className={classes.toolbar} />
          <Title>Dashboard</Title>
          <main id="page-wrap">
            <GridContainer>
              {Object.keys(this.state.devices).map(key =>
                this.state.devices[key].status &&
                this.state.devices[key].authStat ? (
                  <Device
                    key={key}
                    index={key}
                    topic={this.state.devices[key].inReq.topic}
                    details={this.state.devices[key]}
                    token={this.state.accessToken.token}
                  />
                ) : (
                  <div />
                )
              )}
            </GridContainer>
            <br />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleSnackClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">New Device Connected!</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleSnackClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
            <br />
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
