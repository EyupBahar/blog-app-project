import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import blog from "../assets/blog.png";
import { addInfo } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";
import { toastSuccessNotify } from "../auth/Toastify.";

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

const Newblog = () => {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [content, setContent] = useState();
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleForSubmit = (e) => {
    e.preventDefault();
    addInfo({
      title: title,
      imgUrl: imgUrl,
      content: content,
      author: currentUser.email,
    });
    setTitle("");
    setImgUrl("");
    setContent("");
    history.push("/");
    toastSuccessNotify("Newblog added successfully!");
  };
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
        value={title}
        placeholder="Title"
        id="standard-basic"
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <TextField
        value={imgUrl}
        placeholder="Img URL"
        id="filled-basic"
        label="Image URL"
        variant="outlined"
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <br />
      <TextField
        value={content}
        placeholder="Content"
        id="outlined-basic"
        label="Content "
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
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
        Add New Blog
      </Button>
    </form>
  );
};

export default Newblog;
