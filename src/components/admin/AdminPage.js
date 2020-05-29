import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridView from "../admin/GridView";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  circlular: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Admin(props) {
  // Declare a new state variable, which we'll call "count"

  const classes = useStyles();

  window.addEventListener("loadeddata", console.log("LOADED"));

  const { profiles, auth, current_user } = props;
  if (!auth.uid) return <Redirect to="/login" />;

  if (current_user.pNo === 0) return <Redirect to="/create" />;

  // if (!current_user.status) return <Redirect to="/" />;
  const conn_list = [];
  localStorage.removeItem("profile");
  localStorage.removeItem("create");
  profiles &&
    profiles.map((user) => {
      return conn_list.push(user);
    });
  return (
    <div className={classes.root}>
      <Grid container spcing={3}>
        <Grid item xs={12}>
          <div>
            <p></p>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ width: "80%", margin: "auto" }}>
            <GridView profiles={conn_list} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the firestore
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }])
)(Admin);
