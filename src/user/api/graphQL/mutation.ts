import { gql } from "@apollo/client";

export const CREATE_USER = gql`
   mutation CreateUser ($user: UserInput!) {
    createUser(user: $user){
        user{
        id
        firstName
        lastName
        email
        dateOfBirth
        profilePicture
        wallet_address
        }
    }
}
`


export const UPDATE_USER = gql`
mutation UpdateUser ($id: String!, $data: mutationUserUpdateInput! ) {
  updateUser(id: $id, data: $data){
    id
    firstName
    lastName
    profilePicture
    wallet_address
    dateOfBirth
  }
}`
