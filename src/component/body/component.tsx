import {
  Container,
} from "@material-ui/core";
import React from "react";

import { ScreenBody } from "./style";

interface IProps {
  children: React.ReactElement;
}

const Body: React.FC<IProps> = (props) => {
  return (
    <ScreenBody>
      <Container maxWidth="lg">
        {props.children}
      </Container>
    </ScreenBody >
  );
};

export default Body;
