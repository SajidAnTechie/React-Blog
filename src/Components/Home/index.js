import React from "react";
import { Container, Button } from "@material-ui/core";
import { HomeWrapper } from "./style";

export default function Home() {
  return (
    <Container>
      <HomeWrapper>
        <h2>Welcome ......</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
          reprehenderit velit sit incidunt ipsam tempora. Minus, vel.
          Praesentium, pariatur nostrum
        </p>
        <Button variant="contained" color="primary">
          Sign up
        </Button>
      </HomeWrapper>
    </Container>
  );
}
