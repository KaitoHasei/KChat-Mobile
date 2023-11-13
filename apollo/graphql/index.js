import getProfile from './query/getProfile';
import getConversations from './query/getConversations';
import searchUsers from './query/searchUsers';
import retrieveConversation from './query/retrieveConversation';
import getConversationMessage from './query/getConversationMessage';

import signIn from './mutation/signIn';
import signUp from './mutation/signUp';
import createConversation from './mutation/createConversation';
import sendMessage from './mutation/sendMessage';

import sentMessage from './subscription/sentMessage';
import hasUpdateConversation from './subscription/hasUpdateConversation';

const query = {
  ...getProfile,
  ...getConversations,
  ...searchUsers,
  ...retrieveConversation,
  ...getConversationMessage
};

const mutation = {
  ...signIn,
  ...signUp,
  ...createConversation,
  ...sendMessage
};

const subscription = {
  ...sentMessage,
  ...hasUpdateConversation
};

export default {
  query,
  mutation,
  subscription
};
