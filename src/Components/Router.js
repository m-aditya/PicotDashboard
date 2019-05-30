import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import AuthDevice from "./AuthDevice";
import SmartContracter from "./SmartContracter";
import Settings from "./Settings";
import axios from "axios";

class Router extends React.Component {
  state = {
    inReq: {},
    devices: {},
    connected: {
      count: 0
    },

    accessToken: {
      token: ""
    },

    authDev: []
  };

  componentWillMount() {
    var AuthList = JSON.parse(localStorage.getItem("AuthList"));
    this.state.authDev = AuthList;
  }

  updateToken = token => {
    const accessToken = this.state.accessToken;
    accessToken.token = token;
    this.setState({ accessToken });
    var authSocket = new WebSocket("ws://192.168.3.43:8000");
    authSocket.onopen = () => {
      authSocket.send(JSON.stringify(this.state.accessToken.token));
    };
  };

  updateDevices = newDevices => {
    var devices = newDevices;
    this.setState({ devices });
  };

  updateInReq = req => {
    var inReq = req;
    this.setState({ inReq });
  };

  updateAuthDev = devices => {
    var authDev = devices;
    this.setState({ authDev });
    localStorage.setItem("AuthList", JSON.stringify(devices));

    /*
    var authSocket = new WebSocket("ws://192.168.3.43:8000");
    authSocket.onopen = () => {
      authSocket.send(JSON.stringify(this.state.authDev));
    };
    */

    var bodyFormData = new FormData();

    bodyFormData.set("clientid", "AuthDevice");
    bodyFormData.set("topic", "AuthList");
    var authorizationList = JSON.stringify(devices);
    bodyFormData.set("message", authorizationList);

    var token = this.state.accessToken.token;

    axios.defaults.headers.common["Authorization"] = token;
    axios({
      method: "post",
      url: "http://192.168.3.44:8080/clientsend",
      data: bodyFormData
    })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <App
                {...props}
                pState={this.state}
                updateInReq={this.updateInReq}
                updateDevices={this.updateDevices}
                updateToken={this.updateToken}
              />
            )}
          />
          <Route
            exact
            path="/AuthoriseDevices"
            render={props => (
              <AuthDevice
                {...props}
                pState={this.state}
                updateAuthDev={this.updateAuthDev}
                updateDevices={this.updateDevices}
              />
            )}
          />
          <Route
            exact
            path="/SmartContract"
            render={props => <SmartContracter {...props} pState={this.state} />}
          />
          <Route
            exact
            path="/Settings"
            render={props => <Settings {...props} pState={this.state} />}
          />
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
