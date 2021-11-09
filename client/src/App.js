import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./actions/postAction";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import { CssBaseline, Container, Grid, AppBar, Toolbar, Typography, Button,} from "@material-ui/core";
import PenIcon from "@material-ui/icons/NoteOutlined";
import PostsList from "./components/PostsList";
import AddPost from "./components/AddPost";
import PostDetails from "./components/PostDetails";
import logo from "./images/icon.png";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  }
}));

const App = () => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Router>
              <Link>
                <img alt='value' src={logo} style={{ width: 45, marginRight: 5 }} />
              </Link>
            </Router>
            <Typography
              variant="h6"
              className={classes.title}
            >
              <a href="http://localhost:3000/posts">Contenting</a>
            </Typography>
            <Router>
              <Button
                style={{
                  border: '3px solid',
                  borderWidth: '3px',
                  padding: "6px 15px",
                  borderRadius: "16px 16px 16px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }} startIcon={<PenIcon />} onClick={handleOpen}>
                New Content
              </Button>
            </Router>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            <Router>
              <Switch>
                <Route exact path="/posts" component={PostsList} />
                <Route exact path="/posts/:id" component={PostDetails} />
              </Switch>
              <Redirect from="/" to="/posts" />
            </Router>
          </Grid>
        </Grid>
        <AddPost open={open} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default App;
