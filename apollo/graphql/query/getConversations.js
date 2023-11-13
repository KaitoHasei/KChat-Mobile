import { gql } from '@apollo/client';

export default {
  getConversations: gql`
    query Query {
      getConversations {
        id
        participants {
          id
          name
          image
        }
        userIdsHaveSeen
        name
        image
        latestMessage {
          userId
          content
          createdAt
        }
        createdBy
      }
    }
  `
};
