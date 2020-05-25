import React, { useState } from "react";
import NotificationList from "./NotificationList";
import ConnectionList from "../connections/ConnectionList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Dashboard(props) {
  const [term, setTerm] = useState("");

  const classes = useStyles();

  function searchBar(e) {
    setTerm(e.target.value);
  }

  const conn_list = [];
  const notify_list = [];
  const { profiles, auth, current_user, notification } = props;
  if (!auth.uid) return <Redirect to="/login" />;

  if (current_user.pNo === 0) return <Redirect to="/create" />;

  if (current_user.status) return <Redirect to="/admin" />;
  profiles &&
    profiles.map((user) => {
      if (current_user.conn != null) {
        for (var i = 0; i < current_user.conn.length; i++) {
          if (current_user.conn[i] === user.id) {
            conn_list.push(user);
          }
        }
      }
      return null;
    });

  notification &&
    notification.map((user) => {
      if (current_user.conn != null) {
        for (var i = 0; i < current_user.conn.length; i++) {
          if (current_user.conn[i] === user.id) {
            notify_list.push(user);
          }
        }
      }
      return null;
    });
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.paper}>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              onChange={searchBar}
              style={{ width: "80%" }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div style={{ overflow: "auto", height: "400px" }}>
            {conn_list.filter(searchingFor(term)).map((person) => (
              <ul key={person.id}>
                <ConnectionList profiles={person} />
                {/* Display the list of connection the user has */}
              </ul>
            ))}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              paddingTop: "15px",
              margin: "auto",
              width: "50%",
            }}
          >
            <Card>
              <Typography
                variant="h6"
                style={{ paddingLeft: "15px", paddingBottom: "5px" }}
              >
                {" "}
                Notifications{" "}
              </Typography>
              <Card
                style={{ paddingLeft: "25px", paddingBottom: "10px" }}
                elevation={0}
              >
                <NotificationList notification={notify_list} />
              </Card>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function searchingFor(term) {
  return function (x) {
    return x.fN.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
    notification: state.firestore.ordered.notify,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }, { collection: "notify", limit: 5 }])
)(Dashboard);
