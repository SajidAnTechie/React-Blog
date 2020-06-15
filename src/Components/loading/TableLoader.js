import React from "react";
import styled from "styled-components";
import {
  makeStyles,
  Container,
  CssBaseline,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  TableBody,
} from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  table: {
    minWidth: 500,
  },
}));
const WelcomeMessageWrapper = styled.div`
  width: 100%;
`;
const TableWrapper = styled.div`
  width: 100%;
`;

const TableLoader = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <WelcomeMessageWrapper>
          <Skeleton variant="text" />
        </WelcomeMessageWrapper>

        <TableWrapper>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Skeleton variant="text" animation="wave" height={50} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" animation="wave" height={50} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" animation="wave" height={50} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(5)
                  .fill()
                  .map((data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton variant="text" animation="wave" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" animation="wave" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" animation="wave" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </div>
    </Container>
  );
};
export default TableLoader;
