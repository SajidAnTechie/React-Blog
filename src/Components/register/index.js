import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Container,
  CircularProgress,
} from "@material-ui/core/";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUserData = {
        username: Username,
        email: Email,
        passwordHash: Password,
        confirmPassword: ConfirmPassword,
      };
      //userRegister === response
      const userRegister = await axios.post(
        "http://localhost:5000/api/v1/user/post",
        newUserData
      );

      console.log(userRegister.data);
      setLoading(false);
      if (Error) {
        setError(null);
      }
      setSuccess(true);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {Success && <Redirect to="/login" />}
      <CssBaseline />
      <div className={classes.paper}>
        {Error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{Error}</strong>
          </Alert>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                type="text"
                required
                value={Username}
                fullWidth
                id="firstName"
                placeholder="John Doe"
                label="Username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={Email}
                type="text"
                id="email"
                label="Email Address"
                placeholder="Johndoe@gmail.com or .net"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={Password}
                name="password"
                label="Password"
                placeholder="***********"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={ConfirmPassword}
                name="ConfirmPassword"
                label="ConfrimPassword"
                placeholder="***********"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {Loading && <CircularProgress color="inherit" />}
            {!Loading && <React.Fragment>Sign Up</React.Fragment>}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Sajid Ansari
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
