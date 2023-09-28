import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Form, FormInput, authValidation } from '../../components';

import styles from './SignInStyles';

const SignIn = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit
  } = useForm();

  const onSubmit = data => {};

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
      <Text variant="headlineMedium">Log In</Text>
      <View style={styles.formWrapper}>
        <Form {...{ register, setValue, validation: authValidation, errors }}>
          <FormInput name="email" label="Email" />
          <FormInput name="password" label="Password" secureTextEntry={true} />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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
