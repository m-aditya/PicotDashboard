import React from "react";
import styled from "styled-components";
import SideBar from "./Sidebar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles, withTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import TargetForm from "./TargetForm";
import "./App.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  paperRoot: {
    margin: "auto",
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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SmartContracter extends React.Component {
  state = {
    inReq: {},
    devices: {},
    labelWidth: 0,
    TargetAction: [],
    count: 0
  };

  componentDidMount() {
    this.setState({ devices: this.props.pState.devices });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTargetDevice = key => {
    var count = this.state.count + 1;
    this.setState({ count });
    this.setState({ TargetDevice: key });
  };

  handleTargetAction = action => {
    var TargetAction = this.state.TargetAction;
    TargetAction.push(action);
    var count = this.state.count + 1;
    this.setState({ count });
    this.setState({ TargetAction });
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

    return (
      <div id="App">
        <div id="outer-container">
          <Title>Smart Contract</Title>
          <SideBar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <main id="page-wrap">
            <Paper className={classes.paperRoot} elevation={2}>
              <SubTitle>Root Device</SubTitle>

              <form className={classes.root} autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
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

                <FormControl variant="outlined" className={classes.formControl}>
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
              <TargetForm
                devices={this.state.devices}
                handleTargetAction={this.handleTargetAction}
                handleTargetDevice={this.handleTargetDevice}
              />
            </Paper>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SmartContracter);
