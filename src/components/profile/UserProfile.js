import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import { updateProfile } from "../../store/actions/adminAction";
import { makeStyles } from "@material-ui/core/styles";
import {Avatar, Typography, Button, Card, Grid, TextField} from "@material-ui/core";
import * as validator from "../auth/Validation";

function UserProfile(props) {
  const initState = {
    fN: "",
    lN: "",
    cmp: "",
    adr: "",
    pNo: 0,
    wNo: 0,
    pos: "",
    eM: "",
    pPic: "",
    front: "",
    back: "",
    status: false,
    errors:{
      fN: "",
      lN: "",
      cmp: "",
      adr: "",
      pNo: "",
      wNo: "",
      pos: "",
      eM: "",
      pPic: "",
      front: "",
      back: "",
    // status: false,
    },
  };

  const [valid, setValid] = useState(true);
  
  const [doc, setDoc] = useState(initState);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("current_user_profile"));
    if (profile) {
      setDoc({
        ...doc,
        fN: profile.fN || "",
        lN: profile.lN || "",
        cmp: profile.cmp || "",
        adr: profile.adr || "",
        pNo: profile.pNo || 0,
        wNo: profile.wNo || 0,
        pos: profile.pos || "",
        eM: profile.eM || "",
        pPic: profile.pPic || "",
        front: profile.front || "",
        back: profile.back || "",
        conn: profile.conn || [],
        status: profile.status || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.removeItem("current_user_profile");
    localStorage.setItem("current_user_profile", JSON.stringify(props.profile));
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    tField: {
      padding: 10,
    },
  }));

  const validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, doc.errors);
    setDoc({ ...doc, errors, [id]: value });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    validateInputAndSetState(id, value);
    setValid(validator.isErrorObjectEmpty(doc.errors)); //if the error state is empty then valid become true
    // setDoc({ ...doc, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doc);
    props.updateProfile(doc);
  

  // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(doc)) {
      validateInputAndSetState(id, value);
    }
    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(doc.errors);
    // submit if the form is valid

    if (isFormValid) {
      setValid(true); // set the valid state to true since the form is valid
      console.log("Form is Valid.");
      delete doc.errors; // delete error state from the final object.
      // props.createProfile(doc);
      // props.history.push("/");
    } else {
      console.log("Form is INVALID. Are all errors displayed?");
      setValid(false);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({
        pPic: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // const constrontView = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setState({
  //       front: URL.createObjectURL(event.target.files[0]),
  //     });
  //   }
  // };

  const backView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({
        back: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const frontView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({
        front: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const fileUploadHandler = (e) => {
    const ref = firebase.storage().ref();
    const file = document.getElementById("pPic").files[0];
    try {
      const name = new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          setDoc({
            pPic: url,
          });
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  };

  function renderProfile(profile) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{ margin: "auto", width: "80%", padding: "10px" }}
      >
        <Card style={{ width: "auto" }}>
          <Grid container spcing={1}>
            <Grid item xs={6}>
              <Typography variant="h4" style={{ padding: "10px" }}>
                Profile
              </Typography>
              <Avatar
                className={classes.large}
                alt={doc.fN}
                src={
                  doc.pPic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                style={{ margin: "10px" }}
              />
              <div style={{ margin: "10px" }}>
                <div>
                  <span style={{ fontSize: "10px" }}>Upload</span>
                  <input
                    type="file"
                    id="pPic"
                    onChange={onImageChange}
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  />
                </div>
              </div>
              <div>
                <div style={{ clear: "left", position: "relative" }}>
                  <div>
                    <TextField
                    error={!valid}
                    className={classes.tField}
                    id="fN"
                    label={valid ? "First Name" : "Error"}
                    value={doc.fN}
                    helperText={valid ? null : doc.errors.fN}
                    onChange={handleChange}
                    variant="outlined"
                  />
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="lN"
                      label={valid ? "Last Name" : "Error"}
                      value={doc.lN}
                      helperText={valid ? null : doc.errors.lN}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="cmp"
                      label={valid ? "Company" : "Error"}
                      value={doc.cmp}
                      helperText={valid ? null : doc.errors.cmp}
                      onChange={handleChange}
                      variant="outlined" 
                    />
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="pos"
                      label={valid ? "Position" : "Error"}
                      value={doc.pos}
                      helperText={valid ? null : doc.errors.pos}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="eM"
                      label={valid ? "E-Mail" : "Error"}
                      value={doc.eM}
                      helperText={valid ? null : doc.errors.eM}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="pNo"
                      label={valid ? "Personal Number" : "Error"}
                      value={doc.pNo}
                      helperText={valid ? null : doc.errors.pNo}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="wNo"
                      label={valid ? "Work Phone Number" : "Error"}
                      value={doc.wNo}
                      helperText={valid ? null : doc.errors.wNo}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      error={!valid}
                      className={classes.tField}
                      id="adr"
                      label={valid ? "Address" : "Error"}
                      value={doc.adr}
                      helperText={valid ? null : doc.errors.adr}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <Typography variant="h6" style={{ padding: "10px" }}>
                Card Images
              </Typography>
              <div
                className="CenterImage"
                style={{
                  paddingTop: "15px",
                  margin: "auto",
                  width: "50%",
                }}
              >
                <div style={{ position: "relative", margin: "5px" }}>
                  <img
                    src={
                      profile.front ||
                      "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                    }
                    height="160"
                    width="250"
                    alt="Card Front View"
                  />
                  <br />
                  <div style={{ margin: "10px" }}>
                    <div>
                      <span style={{ fontSize: "10px" }}>Upload</span>
                      <input
                        type="file"
                        id="front"
                        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ position: "relative", margin: "5px" }}>
                  <img
                    src={
                      profile.back ||
                      "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                    }
                    height="160"
                    width="250"
                    alt="Card Back View"
                  />
                  <br />
                  <div style={{ margin: "10px" }}>
                    <div>
                      <span style={{ fontSize: "10px" }}>Upload</span>
                      <input type="file" id="back" />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
            <div style={{ clear: "right" }}></div>
          </Grid>
        </Card>
      </form>
    );
  }

  const { auth } = props;
  const classes = useStyles();
  if (!auth.uid) return <Redirect to="/login" />;

  const profileView = doc === null ? <Redirect to="/" /> : renderProfile(doc);
  if (profileView) {
    return <div>{profileView}</div>;
  } else {
    return (
      <div className="container center">
        <p>Loading Profile...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //for id receive from selecting an item from the list
  var curr_user = state.firebase.profile;

  if (!curr_user.isEmpty) {
    localStorage.setItem("current_user_profile", JSON.stringify(curr_user));
  }
  if (curr_user.isEmpty) {
    curr_user = JSON.parse(localStorage.getItem("current_user_profile"));
  }

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile) => dispatch(updateProfile(profile)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "user" }])
)(UserProfile);
