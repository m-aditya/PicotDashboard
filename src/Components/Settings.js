import React from "react";
import AppBar from "./AppBar";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

class settings extends React.Component {
  state = {};

  render() {
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

    const { classes } = this.props;

    return (
      <div id="App">
        <div id="outer-container">
          <AppBar />
          <div className={classes.toolbar} />
          <Title>Settings</Title>
          <main id="page-wrap" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(settings);
