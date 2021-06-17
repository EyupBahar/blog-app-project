import React, { useState } from "react";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createUser } from "../auth/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    padding: "5px",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "50%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
// const handleProvider = () => {
//   SignUpProvider();
//   history.push("/");
// };
export default function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  console.log({ email, password });

  const handleRegister = () => {
    createUser(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <button
        onClick={() =>
          createUser("ad@gmail.com", "1234567", "John Doe", "xxx", "sdasd")
        }
      >
        test
      </button> */}
      <CssBaseline />
      <div className={classes.paper}>
        <SaveOutlinedIcon className={classes.avatar}>
          <LockOutlinedIcon />
        </SaveOutlinedIcon>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={() =>
            createUser(email, password, "John Doe", "xxx", "sdasd")
          }
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="register"
            onClick={handleRegister}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
