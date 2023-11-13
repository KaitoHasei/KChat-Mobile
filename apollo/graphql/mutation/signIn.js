import { gql } from '@apollo/client';

export default {
  signIn: gql`
    mutation SignIn($inputs: SignInInput!) {
      signIn(inputs: $inputs) {
        id
        name
        email
        image
        accessToken
      }
    }
  `
};
