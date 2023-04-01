import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($user: UserInput!) {
  createUser(user: $user){
    user {
      id
      firstName
      firstName
      wallet_address
    }
  }
}`
