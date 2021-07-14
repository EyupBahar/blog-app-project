import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";
import blog from "../assets/blog.png";
import { updateHandler, getSingle } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  img: {
    backgroundColor: "darkcyan",
    borderRadius: "50%",
    padding: "20px",
  },
  submit: {
    backgroundColor: "Darkcyan",
  },
}));

const UpdateBlog = () => {
  const [post, setPost] = React.useState({
    title: "",
    author: "",
    imgUrl: "",
    content: "",
  });
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const { id } = useParams();

  const handleForSubmit = (e) => {
    e.preventDefault();
    post.id = id;
    updateHandler(post);

    console.log(post);
  };

  useEffect(() => {
    getSingle(id, setPost);
  }, []);

  return (
    <form
      className={classes.paper}
      noValidate
      autoComplete="off"
      onSubmit={handleForSubmit}
    >
      <img src={blog} alt="blog" className={classes.img} />
      <br />
      <TextField
        value={post.title}
        placeholder="Title"
        id="standard-basic"
        label="Title"
        variant="outlined"
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <br />
      <TextField
        value={post.imgUrl}
        placeholder="Img URL"
        id="filled-basic"
        label="Image URL"
        variant="outlined"
        onChange={(e) => setPost({ ...post, imgUrl: e.target.value })}
      />
      <br />
      <TextField
        value={post.content}
        placeholder="Content"
        id="outlined-basic"
        label="Content "
        variant="outlined"
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        value="Login"
        onSubmit={handleForSubmit}
      >
        Update Blog
      </Button>
    </form>
  );
};
export default UpdateBlog;
