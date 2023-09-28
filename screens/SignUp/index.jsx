import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Form, FormInput, authValidation } from '../../components';

import styles from './SignUpStyles';

const SignUp = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    formState: { errors },
    setValue,
    register,
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
      <Text variant="headlineMedium">Sign Up</Text>
      {/* <KeyboardAwareScrollView> */}
      <View style={styles.formWrapper}>
        <Form {...{ register, setValue, validation: authValidation, errors }}>
          <FormInput name="username" label="User Name" />
          <FormInput name="email" label="Email" />
          <FormInput name="password" label="Password" secureTextEntry={true} />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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
