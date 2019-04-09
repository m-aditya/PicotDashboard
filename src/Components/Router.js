import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from './App';
import AuthDevice from "./AuthDevice"


class Router extends React.Component{

    state = {
        inReq: {},
        devices: {
        },
        connected: {
          count: 0
        },
    
        accessToken: {
          token: ""
        },
    
        authDev:[]
      };

    updateToken = token => {
        const accessToken=this.state.accessToken;
        accessToken.token=token;
        this.setState({accessToken});
    };

    updateDevices = newDevices => {
        var devices=newDevices;
        this.setState({devices});
    }

    updateInReq = req =>{
        var inReq=req;
        this.setState({inReq});
    }

    updateAuthDev = devices => {
        var authDev=devices;
        this.setState({authDev});
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/" render={(props) => <App {...props} pState={this.state} updateInReq={this.updateInReq} updateDevices={this.updateDevices} updateToken={this.updateToken}/>}/>
                    <Route exact path = "/AuthoriseDevices" render={(props) => <AuthDevice {...props} pState={this.state} updateAuthDev={this.updateAuthDev} updateDevices={this.updateDevices} />}/>
                    <Route path = "/" component={App}/>
                </Switch>
            </BrowserRouter>
        )
    }
}




export default Router;