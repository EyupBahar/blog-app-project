import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import joker from "../assets/joker.png";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  paper: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  joker: {
    borderRadius: "50%",
  },
}));

const Profile = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <form className={classes.paper} noValidate autoComplete="off">
      <img src={joker} alt="joker" className={classes.joker} />
      <br />
      <TextField id="standard-basic" label="*Firstname" variant="outlined" />
      <br />
      <TextField id="filled-basic" label="*Email" variant="outlined" />
      <br />
      <TextField
        id="outlined-basic"
        label="*Profile Photo Url"
        variant="outlined"
      />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        value="Login"
      >
        Submit
      </Button>
    </form>
  );
};

export default Profile;
