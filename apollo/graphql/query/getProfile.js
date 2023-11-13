import { gql } from '@apollo/client';

export default {
  getProfile: gql`
    query GetProfile {
      getProfile {
        id
        name
        image
      }
    }
  `
};
