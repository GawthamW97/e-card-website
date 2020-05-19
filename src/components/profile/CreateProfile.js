import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../store/actions/profileAction";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as validator from "../auth/Validation";

function CreateProfile(props) {
  const initState = {
    fN: "",
    lN: "",
    cmp: "",
    adr: "",
    pNo: 0,
    wNo: 0,
    pos: "",
    eM: "",
    conn: [],
    pPic: "",
    front: "",
    back: "",
    status: false,
    errors: {
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
    const profile = JSON.parse(localStorage.getItem("create"));
    if (profile) {
      setDoc({
        ...doc,
        fN: "",
        lN: "",
        cmp: "",
        adr: "",
        pNo: 0,
        wNo: 0,
        pos: "",
        eM: "",
        pPic: "",
        conn: [],
        front: "",
        back: "",
        status: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.removeItem("create");
    localStorage.setItem("create", JSON.stringify(props.profile));
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
    console.log("in handle submit");

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
        ...doc,
        pPic: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const frontView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({
        ...doc,
        front: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const backView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({
        ...doc,
        back: URL.createObjectURL(event.target.files[0]),
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
            ...doc,
            pPic: url,
          });
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  };
  const { auth } = props;
  const classes = useStyles();
  if (!auth.uid) return <Redirect to="/login" />;
  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", width: "80%", padding: "10px" }}
    >
      <Card style={{ width: "auto" }}>
        <Typography variant="h4" style={{ padding: "10px" }}>
          Create Profile
        </Typography>
        <Grid container spcing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Personal Information
            </Typography>
            <div style={{ position: "relative" }}>
              <Avatar
                className={classes.large}
                alt={doc.fN}
                src={
                  doc.pPic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                style={{ margin: "10px" }}
              />
              <Typography color="secondary">{doc.errors.pPic}</Typography>
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
            </div>
            <div style={{ clear: "left", position: "relative" }}>
              <div>
                {/* <TextField
                  className={classes.tField}
                  id="fN"
                  label="First Name"
                  value={doc.fN}
                  onChange={handleChange}
                  variant="outlined"
                /> */}

                {/* Material UI built in error message is used in this textfield */}
                {/* vlaid is a state object that returns true or false on validation*/}
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
                {/* No need for seperate field for the error msg */}
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
            </div>
            <div style={{ clear: "left" }}>
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
            <Typography variant="h6" style={{ padding: "10px" }}>
              Work Information
            </Typography>
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
                    doc.front ||
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
                      onChange={frontView}
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    />
                  </div>
                  <Typography color="secondary">{doc.errors.front}</Typography>
                </div>
              </div>
              <div style={{ position: "relative", margin: "5px" }}>
                <img
                  src={
                    doc.back ||
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
                    <input 
                    type="file" 
                    id="back" 
                    onChange={backView} />
                  </div>
                  <Typography color="secondary">{doc.errors.back}</Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ clear: "left" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={fileUploadHandler}
              type="submit"
              style={{ float: "right", margin: "10px" }}
            >
              Create
            </Button>
          </div>
        </Grid>
      </Card>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => dispatch(createProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);