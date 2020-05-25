import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    margin: "auto",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Connection = ({ profile }) => {
  const classes = useStyles();
  //set the profile prop object values
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Avatar
                alt={profile.fN}
                src={
                  profile.pPic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                className={classes.large}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos}>
                <label style={{ fontWeight: "bold" }}>Name :</label>
                {profile.fN} {profile.lN}
              </Typography>
              <Typography className={classes.pos}>
                <label style={{ fontWeight: "bold" }}>Company:</label>{" "}
                {profile.cmp}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
export default Connection;
