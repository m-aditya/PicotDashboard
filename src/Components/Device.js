import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";

class Device extends React.Component {
  sendMessage = this.sendMessage.bind(this);

  sendMessage() {
    var bodyFormData = new FormData();

    bodyFormData.set("clientid", this.props.index);
    bodyFormData.set("topic", this.props.topic);

    bodyFormData.set("message", "STOP");

    var token = this.props.token;

    axios.defaults.headers.common["Authorization"] = token;
    axios({
      method: "post",
      url: "http://192.168.3.44:8080/clientsend",
      data: bodyFormData
    })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  }

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
        <Tooltip title="Switch Off Device">
          <IconButton size="small" color="primary" onClick={this.sendMessage}>
            <Icon>power_settings_new</Icon>
          </IconButton>
        </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default Device;
