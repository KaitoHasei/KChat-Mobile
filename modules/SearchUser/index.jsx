import { View, TextInput } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash';

import queries from '../../apollo/graphql';

const searchUserQuery = queries.query.searchUsers;

const SearchUser = ({ navigation }) => {
  const [searchUsers] = useLazyQuery(searchUserQuery, {
    onCompleted: data => {
      const listUser = data.searchUsers;

      return navigation.setParams({ listUser });
    },
    fetchPolicy: 'network-only'
  });

  const handleChangeText = data => {
    if (data.trim())
      searchUsers({
        variables: {
          searchTerms: data
        }
      });
  };

  const debounceOnChange = _.debounce(handleChangeText, 300);

  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderWidth: 1,
          borderColor: '#ffffff',
          borderRadius: 20
        }}
      >
        <TextInput
          style={{
            width: '100%',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
            color: '#ffffff',
            fontSize: 15
          }}
          placeholder="email or username"
          placeholderTextColor="#ffffff"
          onChangeText={debounceOnChange}
        />
      </View>
    </View>
  );
};

export default SearchUser;
