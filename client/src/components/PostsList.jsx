import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));

const PostsList = () => {

  const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts);

  return (
    <>
      {/* Layout Shifter */}
      <div className={classes.layoutShifter}>
        
      </div>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={4}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;
