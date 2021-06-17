import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { makeStyles } from "@material-ui/core/styles";
import { useFetch } from "../auth/firebase";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
    margin: "0 auto",
  },
}));

const PostContainer = () => {
  const { blogList, isLoading } = useFetch();
  // console.log(blogList);
  const classes = useStyles();
  return (
    <div>
      <h1 style={{ color: "purple" }}>~ DASHBOARD ~</h1>
      <div className={classes.blogContainer}>
        {isLoading ? (
          <img className={classes.image} src={loading} alt="loading" />
        ) : (
          <>
            {blogList?.map((item, index) => (
              <PostCard post={item} key={index} />
              // console.log(item);
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
