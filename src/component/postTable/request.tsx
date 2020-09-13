import gql from "graphql-tag";

import { PostPage } from "../../generated/graphql";

export interface IPostPageResult {
  postPage: PostPage;
}

export interface IPostPageVars {
  index: number;
  size: number;
}

export const GET_POST = gql`
  query getPostPage($index: Int!, $size: Int!) {
    postPage(index: $index, size: $size) {
      size
      total
      index
      items {
        pid
        title
        size
        rate
        createAt
        author {
          uid
          username
        }
      }
    }
  }
`;
