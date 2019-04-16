import React from "react";
import styled from "styled-components";
//import SideBar from "./Sidebar";
import AppBar from "./AppBar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles, withTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import TargetForm from "./TargetForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Tooltip from "@material-ui/core/Tooltip";
import "./App.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  paperRoot: {
    margin: "auto",
    marginTop: "0",
    width: "50%",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    alignItems: "center",
    justifyContent: "center"
  },
  paperTarget: {
    margin: "auto",
    width: "60%",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    alignItems: "center",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  fab1: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    position: "fixed",
    color: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  toolbar: theme.mixins.toolbar
});

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

class SmartContracter extends React.Component {
  state = {
    inReq: {},
    devices: {},
    labelWidth: 0,
    TargetAction: [],
    TargetDevice: [],
    count: 1,
    show: new Array(10).fill(false),
    open: false,
  };

  componentDidMount() {
    var show = this.state.show;
    show[0] = true;
    this.setState({ show });
    this.setState({ devices: this.props.pState.devices });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTargetDevice = (key, id) => {
    var TargetDevice = this.state.TargetDevice;
    TargetDevice[id] = key;
    this.setState({ TargetDevice });
  };

  handleTargetAction = (action, id) => {
    var TargetAction = this.state.TargetAction;
    TargetAction[id] = action;
    this.setState({ TargetAction });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addTargetDevice = count => {
    var count = this.state.count;
    var show = this.state.show;
    show[count] = true;
    this.setState({ show });
    count = count + 1;
    this.setState({ count });
  };

  createContract = () => {
    var contract = new Object();
    var Events = new Object();
    var index;
    contract.RootDevice = this.state.rootDevice;
    contract.RootAction = this.state.action;
    if (contract.RootAction === "off") {
      contract.RootAction = "STOP";
    }
    var devs = this.state.TargetDevice;
    var len = devs.length;
    for (index = 0; index < len; index++) {
      var device = this.state.TargetDevice[index];
      var action = this.state.TargetAction[index];
      if (action === "off") {
        action = "STOP";
      }
      Events[device] = action;
    }
    contract.Events = Events;
    //console.log(JSON.stringify(contract))
    var authSocket = new WebSocket("ws://192.168.3.44:8000");
    authSocket.onopen = () => {
      authSocket.send(JSON.stringify(contract));
    };
    this.setState({ open: true });
  };

  generateTargets = () => {
    let targets = [];
    for (let i = 0; i < 10; i++) {
      targets.push(
        this.state.show[i] ? (
          <TargetForm
            devices={this.state.devices}
            handleTargetAction={this.handleTargetAction}
            handleTargetDevice={this.handleTargetDevice}
            id={i}
          />
        ) : null
      );
    }
    return targets;
  };

  render() {
    const { classes } = this.props;
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
    const SubTitle = styled.h2`
      display: block;
      margin: auto;
      margin-bottom: 0.67em;
      font-weight: 600;
      color: #4dabf5;
    `;

    const ButTitle = styled.h2`
      display: block;
      margin: auto;
      margin-bottom: 0.67em;
      font-weight: 600;
      color: #ffffff;
    `;

    return (
      <MuiThemeProvider theme={theme}>
        <div id="App">
          <div id="outer-container">
            <AppBar />
            <div className={classes.toolbar} />
            <Title>Smart Contract</Title>
            <main id="page-wrap2">
              <Paper className={classes.paperRoot} elevation={2}>
                <SubTitle>Root Device</SubTitle>

                <form className={classes.root} autoComplete="off">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                      shrink
                    >
                      Root Device
                    </InputLabel>
                    <Select
                      style={{ margin: 10, minWidth: 150 }}
                      value={this.state.rootDevice}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="rootDevice"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      {Object.keys(this.state.devices).map(key =>
                        this.state.devices[key].authStat ? (
                          <MenuItem value={key}>{key}</MenuItem>
                        ) : null
                      )}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                      shrink
                    >
                      Action
                    </InputLabel>
                    <Select
                      style={{ margin: 10, minWidth: 150 }}
                      value={this.state.action}
                      onChange={this.handleChange}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="action"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value="on">On</MenuItem>
                      <MenuItem value="off">Off</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </Paper>

              <br />

              <Paper className={classes.paperTarget} elevation={4}>
                <SubTitle>Target Devices</SubTitle>
                {this.generateTargets()}
                <Tooltip title="Add Another Target Device">
                  <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.addTargetDevice}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Paper>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Smart Contract has been created!"}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
              </Dialog>
            </main>
            <Fab
              color="primary"
              variant="extended"
              aria-label="Add Contract"
              className={classes.fab1}
              onClick={this.createContract}
            >
              Create
            </Fab>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(SmartContracter);
