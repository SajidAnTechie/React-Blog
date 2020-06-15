import React from "react";
import { Container } from "@material-ui/core/";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ErrorWrapper } from "./style";

const ErrorPage = (props) => {
  return (
    <Container component="main" maxWidth="md">
      <ErrorWrapper>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{props.children}</strong>
        </Alert>
      </ErrorWrapper>
    </Container>
  );
};
export default ErrorPage;
