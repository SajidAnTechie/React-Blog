import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core/";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import axios from "../../../axios/axios";

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

export default function NewProject() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [projectImage, setprojectImage] = useState("");
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("projectImage", projectImage);

      //userRegister === response
      const userRegister = await axios.post(
        "http://localhost:5000/api/v1/project/post",
        data
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
      {Success && <Redirect to="/dashBoared" />}
      <CssBaseline />

      <div className={classes.paper}>
        {Error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{Error}</strong>
          </Alert>
        )}
        <Typography component="h1" variant="h5">
          New Project
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                value={title}
                type="text"
                fullWidth
                id="title"
                placeholder="John Doe"
                label="Title"
                autoFocus
                onChange={(e) => settitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                type="file"
                id="file"
                name="projectImage"
                placeholder="Chosse file"
                autoComplete="file"
                //onChange={handleFile}
                onChange={(e) => setprojectImage(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="description"
                placeholder="Write a description"
                required
                name="description"
                autoComplete="description"
                fullWidth
                value={description}
                type="text"
                multiline
                rows={4}
                onChange={(e) => setdescription(e.target.value)}
                variant="outlined"
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
            {!Loading && <React.Fragment>Create</React.Fragment>}
          </Button>
        </form>

        <Button
          type="button"
          component={RouterLink}
          to="/dashBoared"
          variant="contained"
          color="primary"
        >
          Back
        </Button>
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
