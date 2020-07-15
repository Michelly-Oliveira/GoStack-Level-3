import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// Pass ref of the last input on the page, so we can use focus, by passing the ref as second parametr of the Input component, and accessing it on the TextInput, inside the Input Container
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  // Necessary data to register the input on unform
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  // Get the value of the input; start as an object with an empty string
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // If there is a value in the input, set to true, otherwise set to false
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      // Using the ref (from the last input element) passed from the page(SignIn, SignUp), that we declare that has a methos focus(), define that ref.focus() will call the method focus() on the ref that corresponds to the TextInput bellow
      inputElementRef.current.focus();
    },
  }));

  // When the input is rendered, register it on unform
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // When unform needs to automatically set the value of the input
      // setValue(ref: any, value) {
      //   // Update the reference value
      //   inputValueRef.current.value = value;
      //   // Update the field on screen with the current value
      //   inputElementRef.current.setNativeProps({ text: value });
      // },
      // // When unform needs to clear the input, remove all content
      // clearValue() {
      //   // Set the reference value to an empty string - nothing
      //   inputValueRef.current.value = '';
      //   // Clear field on screen
      //   inputElementRef.current.clear();
      // },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
