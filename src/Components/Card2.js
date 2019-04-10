import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from '@material-ui/core/Tooltip';
//import { CardMedia } from "@material-ui/core";

class Card2 extends React.Component {
  handleAuth = () => {
    this.props.authDev(this.props.details.inReq.id);
  };

  handleBlack = () => {
    this.props.blacklistDevice(this.props.details.inReq.id);
  };

  render() {
    const state = this.props.details;

    return (
      <Card>
        <CardContent>
          <Typography component="h5" variant="h5">
            {state.inReq.id}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Device
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Tooltip title="Authorise Device">
            <IconButton size="small" color="primary" onClick={this.handleAuth}>
              <Icon>check_circle</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Blacklist Device">
            <IconButton size="small" color="primary" onClick={this.handleBlack}>
              <Icon>cancel</Icon>
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default Card2;
