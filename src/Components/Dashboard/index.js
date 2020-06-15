import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  CssBaseline,
  Button,
} from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import AuthProjectTable from "./TableData";
import axios from "../../axios/axios";
import ErrorPage from "../Error/Error";
import { Link } from "react-router-dom";
import TableLoader from "../loading/TableLoader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  alertDiv: {
    width: "100%",
    margin: "0 auto",
    justifyContent: "center",
  },
}));
const DashBoared = () => {
  const [Timeout, setTimeout] = useState(true);
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [AuthProjectData, setAuthProjectData] = useState([]);
  const [cleanUp, setCleanUp] = useState(true);
  const username = useSelector((state) => state.username);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(false);
    }, 5000);

    return () => {
      console.log("cleaning");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchauthPorject = async () => {
      try {
        //authProject === response
        const authProject = await axios.get("/auth/project");
        console.log(authProject.data);
        if (cleanUp) {
          setAuthProjectData(authProject.data.payload);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        if (cleanUp) {
          setError(error.response.data.error);
        }
      }
    };

    fetchauthPorject();
    return () => {
      console.log("cleanning up");
      setCleanUp(false);
    };
  }, [token]);

  const classes = useStyles();
  return (
    <React.Fragment>
      {Error && <ErrorPage>{Error}</ErrorPage>}

      {Loading && <TableLoader />}
      {!Loading && (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            {Timeout && (
              <Alert severity="success" className={classes.alertDiv}>
                Welcome Back <strong>{username}</strong>
              </Alert>
            )}
            <Button
              type="button"
              component={Link}
              to="/Create-project"
              variant="contained"
              color="primary"
            >
              Create
            </Button>
            <Box component="div">
              {AuthProjectData.length === 0 && <p>No Projects</p>}
              {AuthProjectData.length > 0 && (
                <p>
                  <strong>{AuthProjectData.length}</strong> Projects found
                </p>
              )}
            </Box>
            <AuthProjectTable authProject={AuthProjectData} />
          </div>
        </Container>
      )}
    </React.Fragment>
  );
};

export default DashBoared;
