import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// Our input component has all the props that a normal input html element has, so we extend the props from it
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Override the prop name and make it requierd
  name: string;
  // Pass a component as a type
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...restOfProps }) => {
  // Create a reference to the input element itself(DOM node)
  const inputRef = useRef<HTMLInputElement>(null);
  // sing unform lib, pass the name of the input we are using
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // Create a register inside unform when the input component is rendered, so that when the form is submited we get the value of all the inputs that were registered
  useEffect(() => {
    // ref gets the ref to the input; path gets the location of where the value is inside the input (input.value)
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Set the state based on the inputRef = if it exists and ahs a value, set to true, otherwise set to false
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    // Pass the prop to the container so that when we focus on the input, we can style the container
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {/* If the component icon exists, render it */}
      {Icon && <Icon size={20} />}

      {/* Spreading all props inside the input, make the ref we created above point to this input element (DOM node) */}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...restOfProps}
      />

      {error && (
        <Error text={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
