import React, { useState } from "react";
import NotificationList from "../profile/NotificationList";
import ConnectionList from "../connections/ConnectionList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { Check, Clear, DeleteOutline, Edit, FirstPage, SaveAlt, 
  Remove, FilterList, ViewColumn, LastPage, ChevronRight, 
  ChevronLeft, Search, ArrowDownward } from '@material-ui/icons';

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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

function Admin(props) {
  // Declare a new state variable, which we'll call "count"
  const [term, setTerm] = useState("");

  const classes = useStyles();

  const { profiles, auth, current_user, notification } = props;
  if (!auth.uid) return <Redirect to="/login" />;

  if (current_user.pNo === 0) return <Redirect to="/create" />;

  //if (!current_user.status) return <Redirect to="/" />;
  const conn_list = [];
  localStorage.removeItem("profile");
  localStorage.removeItem("create");
  profiles &&
    profiles.map((user) => {
      return conn_list.push(user);
    });
  
    if (profiles !== undefined) {
      console.log(profiles);
      // console.log(profiles.map(p => ({fN: p.fN})));
    }
    return (
      <div>
      <div style={{ maxWidth: "90%" }}>
        <br/>
        <MaterialTable
          icons = {tableIcons}
          title = "Contacts"
          conststyles = {useStyles}
          columns = {[
            
            { title: "First Name", field: "firstname", cellStyle: {
              backgroundColor: '#039be5',
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: '#039be5',
              fontSize: 22
            }},

            { title: "Last Name", field: "lastname", cellStyle: {
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: '#039be5',
              fontSize: 22
            }},

            { title: "Company", field: "cmp", cellStyle: {
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: '#01579b',
              fontSize: 22
            }},

            { title: "Position", field: "pos", cellStyle: {
              fontSize: 18
            },
            headerStyle: {
              backgroundColor: '#01579b',
              fontSize: 22
            }}

          ]}
              
          data = {
            (profiles !== undefined)
              ? profiles.map(p => ({key:p.id, firstname:p.fN, lastname:p.lN, cmp:p.cmp, pos:p.pos}))
              : []
            }
            

        editable={{
        
        onRowUpdate: (newData, oldData) =>
             new Promise((resolve, reject) => {
                setTimeout(() => {
                    {
                        /* const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;                
                        this.setState({ data }, () => resolve()); */
                    }
                    resolve();
                }, 1000);
             }),

        onRowDelete: oldData =>
             new Promise((resolve, reject) => {
                 setTimeout(() => {
                    {
                        /* let data = this.state.data;
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve()); */
                    }
                    resolve();
                }, 1000);
            })
            }}

            /> {/* end material table */}
            </div>

         {/* {conn_list.filter(searchingFor(term)).map((person) => (
              <List key={person.id}>
                <ConnectionList profiles={person} />
                {/*Display all users that are registered in the E-Card system
              </List> 
          ))} */}

          <div
            style={{
              paddingTop: "15px",
              margin: "auto",
              width: "50%",
            }}
          >
            <Card>
              <Typography
                variant={"h5"}
                style={{ textAlign: "center", paddingLeft: "15px", paddingBottom: "5px" }}
              >
              <br/>
              {" "}
              Notifications{" "}
              </Typography>
              <Card
                style={{ paddingLeft: "25px", paddingBottom: "10px" }}
                elevation={0}
              >
                <NotificationList notification={notification} />
              </Card>
            </Card>
          </div>
          </div>
    );
  }

function searchingFor(term) {
  return function (x) {
    if (x !== null) {
      return x.fN.toLowerCase().includes(term.toLowerCase()) || !term;
    }
    return "";
  };
}

const mapStateToProps = (state) => {
  // firebase.firestore().collection("notify").doc()
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the firestore
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
    notification: state.firestore.ordered.notify,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }, { collection: "notify", limit: 5 }])
)(Admin)