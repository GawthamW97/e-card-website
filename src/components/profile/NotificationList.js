import React from "react";
import Notification from "./Notification";
import { Link } from "react-router-dom";

const NotificationList = ({ notification }) => {
  return (
    <div>
      {notification &&
        notification.map((item) => {
          return (
            <div key={item.id}> 
              <Link
                to={"/profile/" + item.id}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <Notification notification={item} key={item.id} />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default NotificationList;
