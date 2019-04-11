import React from "react";

import { BrowserRouter as Route, Link } from "react-router-dom";
import { push as Menu } from "react-burger-menu";

class Sidebar extends React.Component {
  render() {
    return (
      <Menu>
        <Link className="menu-item" to="/">
          Home
        </Link>
        <Link className="menu-item" to="/AuthoriseDevices">
          Authorise Devices
        </Link>
        <Link className="menu-item" to="/SmartContract">
          Smart Contract
        </Link>
        <Link className="menu-item" to="/Settings">
          Settings
        </Link>
      </Menu>
    );
  }
}

export default Sidebar;
