import React from "react";
import styled from "styled-components";
import SideBar from "./Sidebar";
import "./App.css";

class SmartContracter extends React.Component {
  state = {
    inReq: {},
    devices: {},
  };

  componentDidMount() {
    this.setState({ devices: this.props.pState.devices });
  }

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
   
   return (
      <div id="App">
       <div id="outer-container">
          <Title>Smart Contract</Title>
          <SideBar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <main id="page-wrap">
          </main>
        </div>
      </div>
    );
  }
}

export default SmartContracter;
