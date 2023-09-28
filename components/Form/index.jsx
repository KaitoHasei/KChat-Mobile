import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

import styles from './FormStyles';

const FormInput = React.forwardRef((props, ref) => {
  const { colors } = useTheme();
  const { label, labelStyle, error, mode, ...inputProps } = props;

  return (
    <View style={styles.formInputWrapper}>
      <TextInput
        ref={ref}
        autoCapitalize="none"
        label={label}
        mode={mode ? mode : 'outlined'}
        error={error}
        {...inputProps}
      />
      <Text style={{ color: colors.error }}>{error && error.message}</Text>
    </View>
  );
});

const Form = ({ register, errors, setValue, validation = {}, children }) => {
  const inputRefs = useRef([]);
  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach(child => {
      if (child.props.name) {
        register(child.props.name, validation[child.props.name]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, index) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  ref: ref => {
                    inputRefs.current[index] = ref;
                  },
                  onChangeText: value =>
                    setValue(child.props.name, value.trim(), true),
                  onSubmitEditing: () => {
                    inputRefs.current[index + 1]
                      ? inputRefs.current[index + 1].focus()
                      : inputRefs.current[index].blur();
                  },
                  blurOnSubmit: false,
                  key: child.props.name,
                  error: errors[child.props.name]
                }
              })
            : child;
        }
      )}
    </>
  );
};

export default Form;
export { FormInput };
