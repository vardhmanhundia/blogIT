import {gql} from "apollo-server";

export const errorSchema = gql`
  type UserError {
    message: String!
  }
`;
