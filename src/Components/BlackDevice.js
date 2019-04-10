import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
//import { CardMedia } from "@material-ui/core";

class BlackDevice extends React.Component {
  handleUnBlack = () => {
    this.props.unBlacklistDevice(this.props.details.inReq.id);
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
          <IconButton size="small" color="primary" onClick={this.handleUnBlack}>
            <Icon>check</Icon>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default BlackDevice;