import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { Container, Button, Grid } from "@material-ui/core/";
import ErrorPage from "../../Error/Error";
import { SinglePageWrapper } from "./style";
import TableLoader from "../../loading/TableLoader";
import { Link } from "react-router-dom";

const SingleProject = (props) => {
  const [singleProjectData, setsingleProjectData] = useState({});
  const [Loading, setLoading] = useState(false);
  const [cleanUp, setCleanUp] = useState(true);
  const [Error, setError] = useState(null);

  useEffect(() => {
    const projectId = props.match.params.id;
    setLoading(true);
    const singleProjectdata = async () => {
      try {
        const { data } = await axios.get(`/${projectId}`);

        console.log(data);
        if (cleanUp) {
          setsingleProjectData(data.payload);
          setLoading(false);
        }
      } catch (error) {
        if (cleanUp) {
          setError(error.response.data.error);
        }
      }
    };

    singleProjectdata();
    return () => {
      console.log("cleanning up");

      setCleanUp(false);
    };
  }, [props.match.params.id]);

  return (
    <React.Fragment>
      {Error && <ErrorPage>{Error}</ErrorPage>}
      {Loading && <TableLoader />}
      {!Loading && (
        <Container component="main" maxWidth="md">
          <SinglePageWrapper>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {singleProjectData.projectImage ? (
                  <img
                    src={`http://localhost:5000/${singleProjectData.projectImage}`}
                    alt="ProjectImage"
                  />
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <h2>{singleProjectData.title}</h2>
                <p>{singleProjectData.description}</p>
                <p>
                  Posted By{" "}
                  <strong>
				  //{singleProjectData.userId && singleProjectData.userId.username}
                    {singleProjectData.userId
                      ? singleProjectData.userId.username
                      : ""}
                  </strong>
                </p>
                <Button
                  type="button"
                  component={Link}
                  to="/dashBoared"
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </SinglePageWrapper>
        </Container>
      )}
    </React.Fragment>
  );
};
export default SingleProject;
