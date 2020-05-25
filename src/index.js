import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/firestore";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducer/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import fbConfig from "./config/fbConfig";
import throttle from "lodash/throttle";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  circular: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const rrfConfig = { userProfile: "user", useFirestoreForProfile: true }; // react-redux-firebase config
// Initialize firebase instance
if (!firebase.apps.length) {
  firebase.initializeApp({ fbConfig });
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const peristedState = loadState();

const store = createStore(
  rootReducer,
  peristedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ firebase })) // to add other middleware
  )
);

// store.subscribe(() => {
//   saveState(store.getState());
// });

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000)
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

function AuthIsLoaded({ children }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div>
        <Grid container spcing={6}>
          <Grid item xs={12}>
            {" "}
            <div>
              <p></p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Card
              style={{
                width: "60%",
                height: "300px",
                margin: "auto",
              }}
            >
              <div
                className={classes.circlular}
                style={{
                  margin: "auto",
                  paddingTop: "120px",
                  width: "15%",
                }}
              >
                <CircularProgress />
                <Typography>Loading... </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
