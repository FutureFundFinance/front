import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($data: mutationUserInput!){
  createUser(data: $data ){
    id
    firstName
    lastName
    wallet_address
  }
}`

export const GET_USER_BY_EMAIL = gql`
query getUserByEmail($email: EmailAddress){
  Users(where: { email: {equals: $email}}){
    docs{
      id
      firstName
      lastName
      profilePicture
      wallet_address
    }
  }
}`



