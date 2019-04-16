import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2698EF"
    },
    secondary: {
      main: "#ffffff"
    }
  }
});

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    background: "#2698EF",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: "#2698EF",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 5 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 7 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                PICOT
              </Typography>
              <div align="right">
                {/*<Avatar className={classes.purpleAvatar}>AM</Avatar>*/}
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            onKeyDown={this.handleDrawerClose}
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose} color={"secondary"}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {["Dashboard", "Authorize Devices"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <Link className="menu-item" to="/">
                        <Icon color={"secondary"}>home</Icon>
                      </Link>
                    ) : (
                      <Link className="menu-item" to="/AuthoriseDevices">
                        <Icon color={"secondary"}>check_circle</Icon>
                      </Link>
                    )}
                  </ListItemIcon>
                  {index % 2 === 0 ? (
                    <Link
                      className="menu-item"
                      to="/"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        primary={text}
                        disableTypography={true}
                        style={{ color: "white" }}
                      />
                    </Link>
                  ) : (
                    <Link
                      className="menu-item"
                      to="/AuthoriseDevices"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        disableTypography={true}
                        style={{ color: "white" }}
                        primary={text}
                      />
                    </Link>
                  )}
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["Smart Contracts", "Settings"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <Link className="menu-item" to="/SmartContract">
                        <Icon color={"secondary"}>collections_bookmark</Icon>
                      </Link>
                    ) : (
                      <Link className="menu-item" to="/Settings">
                        <Icon color={"secondary"}>settings</Icon>
                      </Link>
                    )}
                  </ListItemIcon>
                  {index % 2 === 0 ? (
                    <Link
                      className="menu-item"
                      to="/SmartContract"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        disableTypography={true}
                        style={{ color: "white" }}
                        primary={text}
                      />
                    </Link>
                  ) : (
                    <Link
                      className="menu-item"
                      to="/Settings"
                      style={{ textDecoration: "none" }}
                    >
                      <ListItemText
                        disableTypography={true}
                        style={{ color: "white" }}
                        primary={text}
                      />
                    </Link>
                  )}
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
