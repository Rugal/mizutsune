import gql from "graphql-tag";

export interface ILoginResult {
  token: String;
}

export interface ILoginVars {
  email: String;
  password: String;
}

export const GET_LOGIN = gql`
  query getLogin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
