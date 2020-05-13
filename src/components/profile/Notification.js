import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';

const Notification = ({ notification }) => {
  // const { notification } = props;
  return (
    <div className="notify">
      <Typography
        style={{ display: "inline", padding: "5px" }}
        component="span"
      >
        <span style={{ fontWeight: "bold", color: "#3f51b5" }}>
          {notification.user}
        </span>
        <span style={{ color: "black" }}> {notification.content}</span>
      </Typography>
      <Typography
        style={{
          color: "#546e7a",
          fontSize: "13px",
          clear: "left",
          paddingLeft: "5px",
        }}
      >
        {moment(notification.time.toDate()).fromNow()}
      </Typography>
    </div>
  );
};

export default Notification;
