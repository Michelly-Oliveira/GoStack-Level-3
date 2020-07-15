import { ValidationError } from 'yup';

// Create a dynamic interface, where the prop can be any kind of string
interface Errors {
  [key: string]: string;
}

// Format the error received from yup into an obj containing key:value from all the errors that occured
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // inner is the array that contains all errors
  err.inner.forEach(error => {
    // Create a new prop nameOfInput = error.message
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
