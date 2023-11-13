import { gql } from '@apollo/client';

export default {
  searchUsers: gql`
    query SearchedUsers($searchTerms: String!) {
      searchUsers(searchTerms: $searchTerms) {
        id
        name
        image
      }
    }
  `
};
