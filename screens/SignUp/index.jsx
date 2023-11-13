import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { Button, Text } from 'react-native-paper';

import queries from '../../apollo/graphql';

import { Form, FormInput, authValidation } from '../../components';

import styles from './SignUpStyles';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';

const signUpMutation = queries.mutation.signUp;

const SignUp = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    formState: { errors },
    setValue,
    register,
    handleSubmit
  } = useForm();

  const [signUp, { loading }] = useMutation(signUpMutation, {
    onCompleted: () => {
      navigation.navigate('SignIn');
    },
    onError: error => {
      if (error.networkError.statusCode === 400)
        Toast.show({
          type: 'error',
          text1: 'Account has created!'
        });
    }
  });

  const onSubmit = data => {
    return signUp({
      variables: {
        inputs: {
          username: data?.username,
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
      <Text variant="headlineMedium">Sign Up</Text>
      {/* <KeyboardAwareScrollView> */}
      <View style={styles.formWrapper}>
        <Form {...{ register, setValue, validation: authValidation, errors }}>
          <FormInput name="username" label="User Name" />
          <FormInput name="email" label="Email" />
          <FormInput name="password" label="Password" secureTextEntry={true} />
          <Button
            mode="contained"
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Form>
      </View>
      {/* </KeyboardAwareScrollView> */}
      <View style={styles.redirectText}>
        <Text>Have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
