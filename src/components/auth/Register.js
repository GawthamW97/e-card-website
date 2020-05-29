import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/authAction";
import * as validator from "./Validation";
import {
  Button,
  Container,
  Typography,
  TextField,
  CardContent,
  Card,
} from "@material-ui/core";

function Register(props) {
  const initState = {
    eM: "",
    pwd: "",
    repwd: "",
    errors: {
      pwd: "",
      eM: "",
    },
  };

  const [state, setState] = useState(initState);
  const validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, state.errors);
    setState({ errors, [id]: value });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    validateInputAndSetState(id, value);
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(state)) {
      validateInputAndSetState(id, value);
    }

    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(state.errors);
    console.log(state);
    // submit if the form is valid
    if (isFormValid && state.repwd === state.pwd) {
      console.log("Form is valid");
      props.register(state);
      props.history.push(state, "/create"); // After the registration is completed, create page will be loaded.
    } else {
      console.log("Form is invalid. Are errors displayed?");
    }
  };
  const { auth, authError } = props;
  if (auth.uid) return <Redirect to="/create" />;
  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit} noValidate>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <hr />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              required
              id="eM"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <Typography color="secondary">{state.errors.eM}</Typography>
            <br />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="pwd"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography color="secondary">{state.errors.pwd}</Typography>
            <br />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              required
              name="password"
              label="Re-Enter Password"
              type="password"
              id="repwd"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography color="secondary">{state.errors.pwd}</Typography>
            <br />
            <br />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>

            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
            </Snackbar> */}


            <div className="red-text center">
              {authError ? <p> {authError} </p> : null}
            </div>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => dispatch(register(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
