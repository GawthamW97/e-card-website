import React, { Component } from "react";
import {
  Typography,
  Card,
  Grid,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

console.log('homepage');

class HomePage extends Component {

  render() {
    // const { authError, auth } = this.props;
    // if (!auth.isEmpty) return <Redirect to="/" />;
    return (
      <Grid container height="100%">
        <Grid
          style={{ height: "91vh" }}
          direction="column"
          alignContent="space-between"
          container
          item
          xs={6}
          spacing={1}
        >
          <Grid item xs={4}>
            <Card>
              <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            style={{ flexGrow: 1 }}
            direction="column"
            justify="flex-end"
            container
            item
            xs={4}
          >
            <Grid item>
            <Card>
              <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid justify="flex-end" container item xs={6}>
          <Grid item xs={4}>
          <Card>
              <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     authError: state.auth.authError,
//     auth: state.firebase.auth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (creds) => dispatch(login(creds)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default HomePage;
