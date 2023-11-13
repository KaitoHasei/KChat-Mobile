import React, { useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';

import { GlobalContext } from '../../context/GlobalContext';
import queries from '../../apollo/graphql';

import { Form, FormInput, authValidation } from '../../components';

import styles from './SignInStyles';

const signInMutation = queries.mutation.signIn;

const SignIn = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { setAuthenticated } = useContext(GlobalContext);
  const [signIn, { loading: signInLoading }] = useMutation(signInMutation, {
    onCompleted: async data => {
      const signInData = data?.signIn || null;

      await SecureStore.setItemAsync('access_token', signInData?.accessToken);
      return setAuthenticated(true);
    },
    onError: error => {
      if (
        error.networkError.statusCode === 400 ||
        error.networkError.statusCode === 500
      )
        Toast.show({
          type: 'error',
          text1: 'Incorrect email or password!'
        });
    }
  });

  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit
  } = useForm();

  const onSubmit = data => {
    return signIn({
      variables: {
        inputs: {
          email: data?.email,
          password: data?.password
        }
      }
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <Toast />
      <Text variant="headlineMedium">Log In</Text>
      <View style={styles.formWrapper}>
        <Form {...{ register, setValue, validation: authValidation, errors }}>
          <FormInput name="email" label="Email" />
          <FormInput name="password" label="Password" secureTextEntry={true} />
          <Button
            mode="contained"
            loading={signInLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Form>
      </View>
      <View style={styles.redirectText}>
        <Text>Don&apos;t have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
