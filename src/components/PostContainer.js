import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFetch } from "../auth/firebase";
import PostCard from "./PostCard";
import loading from "../assets/loading.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  blogContainer: {
    marginLeft: 170,
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    marginLeft: "30%",
  },
}));

const PostContainer = () => {

  const { blogList, isLoading } = useFetch();
  const classes = useStyles();

  return (
    <div>
      <h1 style={{ color: "purple" }}> DASHBOARD </h1>
      <div className={classes.blogContainer}>
        {isLoading ? (
          <img className={classes.image} src={loading} alt="loading" />
        ) : (
          <>
            {blogList?.map((item, index) => (
              <PostCard post={item} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
