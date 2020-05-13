import React, { Component } from "react";
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

class Register extends Component {
  state = {
    eM: "",
    pwd: "",
    fN: "",
    lN: "",
    pNo: 0,
    errors: {
      fN: "",
      lN: "",
      pwd: "",
      eM: "",
    },
  };
  
  validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, this.state.errors);
    this.setState({ errors, [id]: value });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.validateInputAndSetState(id, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(this.state)) {
      this.validateInputAndSetState(id, value);
    }

    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(this.state.errors);
    // submit if the form is valid
    if (isFormValid) {
      console.log("Form is valid");
      this.props.register(this.state);
      this.props.history.push(this.state, "/create"); // After the registration is completed, create page will be loaded.
    } else {
      console.log("Form is invalid. Are errors displayed?");
    }
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/create" />;
    return (
      <Container component="main" maxWidth="xs">
        <form onSubmit={this.handleSubmit} noValidate>
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
                id="fN"
                label="First Name"
                name="First Name"
                onChange={this.handleChange}
              />
              <Typography color="secondary">{this.state.errors.fN}</Typography>
              <br />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id="lN"
                label="Last Name"
                name="Last Name"
                onChange={this.handleChange}
              />
              <Typography color="secondary">{this.state.errors.lN}</Typography>
              <br />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id="em"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
              />
              <Typography color="secondary">{this.state.errors.eM}</Typography>
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
                onChange={this.handleChange}
              />
              <Typography color="secondary">{this.state.errors.pwd}</Typography>
              <br />
              <br />

              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>

              <div className="red-text center">
                {authError ? <p> {authError} </p> : null}
              </div>
            </CardContent>
          </Card>
        </form>
      </Container>
    );
  }
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
