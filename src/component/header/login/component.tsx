import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

import { transparency } from "../common";
import { GET_LOGIN, ILoginVars, ILoginResult } from "./request";
import { style } from "./style";

interface IProps {
  handleClose: () => any;
  hide: () => any;
  login: (token: string) => any;
  open: boolean;
  show: () => any;
  showProgressBar: boolean;
}

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string) => re.test(email);

const Login: React.FC<IProps> = (p) => {
  const classes = style();

  const [errorMessage, setErrorMessage] = useState("Login with your credential");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const validateInput = (input: string) => {
    setInvalidEmail(input ? !validateEmail(input) : false);
    setEmail(input);
  };

  // 1. submit login request
  const { data, refetch } = useQuery<ILoginResult, ILoginVars>(GET_LOGIN,
    { variables: { email: email, password: password } });
  if (!data) {
    return null;
  }
  const { token } = data;
  if (token) {
    // 2. Clean form value
    resetForm();
    // 3. show progress circle in login screen
    p.show();
    // 4. set corresponding result
    setTimeout(() => {
      p.login(`Bearer ${token}`);
      p.handleClose();
      setTimeout(() => {
        p.hide();
      }, 200);
    }, 1000);
  }

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value);
  const typePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const cancel = () => { p.handleClose(); resetForm(); };

  const content = p.showProgressBar
    ? <CircularProgress />
    : <React.Fragment>
      <DialogTitle id="form-dialog-title">{errorMessage}</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <FormControl>
            <TextField
              autoFocus={true}
              color="primary"
              error={invalidEmail}
              id="email"
              helperText={invalidEmail ? "Invalid email" : undefined}
              label="EMAIL"
              onChange={validate}
              required={true}
              value={email}
            />
          </FormControl>
          <FormControl>
            <TextField
              color="secondary"
              id="password"
              label="PASSWORD"
              onChange={typePassword}
              required={true}
              type="password"
              value={password}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => refetch()} color="primary">
          Login
          </Button>
        <Button onClick={cancel} color="secondary">
          Cancel
          </Button>
      </DialogActions>
    </React.Fragment>
    ;

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      open={p.open}
      PaperProps={transparency(p.showProgressBar)}
    >
      {content}
    </Dialog >
  );
};
export default Login;
