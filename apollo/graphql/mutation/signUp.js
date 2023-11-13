import { gql } from '@apollo/client';

export default {
  signUp: gql`
    mutation SignUp($inputs: SignUpInput!) {
      signUp(inputs: $inputs)
    }
  `
};
