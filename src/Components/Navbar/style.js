import styled from "styled-components";

export const NavLInkWrapper = styled.div`
  background-color: black;
  color: white;
  a {
    border: 0.5px solid #0b0b0b;
    margin-left: 20px;
    :hover,
    :focus {
      text-decoration: none;
      color: yellow;
      outline: none;
      border: 0.5px solid #fff;
    }
  }

  .MuiToolbar-regular {
    min-height: 50px;
  }
`;
