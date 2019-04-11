import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles, withTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./App.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
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

class TargetForm extends React.Component {
  state = {};

  handleAction = event => {
    this.setState({ targetAction: event.target.value });
    this.props.handleTargetAction(event.target.value);
  };

  handleDevice = event => {
    this.setState({ targetDevice: event.target.value });
    this.props.handleTargetDevice(event.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
            shrink
          >
            Target Device
          </InputLabel>
          <Select
            style={{ margin: 10, minWidth: 150 }}
            value={this.state.targetDevice}
            onChange={this.props.handleTargetDevice}
            input={
              <OutlinedInput
                //labelWidth={this.state.labelWidth}
                name="targetDevice"
                id="outlined-age-simple"
              />
            }
          >
            {Object.keys(this.props.devices).map(key =>
              this.props.devices[key].authStat ? (
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
            value={this.state.targetAction}
            onChange={this.handleAction}
            input={
              <OutlinedInput
                //labelWidth={this.state.labelWidth}
                name="targetAction"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="on">On</MenuItem>
            <MenuItem value="off">Off</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(TargetForm);
