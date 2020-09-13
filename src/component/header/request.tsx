import gql from "graphql-tag";

import { PostPage } from "../../generated/graphql";

export interface IPostPageResult {
  postPage: PostPage;
}

export interface IPostPageVars {
  index: number;
  size: number;
}

export const GET_POST_PAGE = gql`
  query getPostPage($index: Int!, $size: Int!) {
    getPostPage(index: $index, size: $size) {
      size
      total
      index
      items {
        title
        content
        enable
        hash
        size
      }
    }
  }
`;
