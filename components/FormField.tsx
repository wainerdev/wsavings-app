import { FormikProps } from "formik";
import React from "react";
import { Text, TextInput, TextInputProps } from "react-native-paper";

interface Props extends TextInputProps {
  formKey: string;
  formProps: FormikProps<any>;
}

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function FormField({ formProps, formKey, ...rest }: Props) {
  const { values, errors, touched, handleChange, handleBlur } = formProps;

  const hasError = errors[formKey] && touched[formKey];
  return (
    <>
      <TextInput
        onChangeText={handleChange(formKey)}
        onBlur={handleBlur(formKey)}
        value={values[formKey]}
        error={!!hasError}
        {...rest}
        label={rest.label || capitalize(formKey)}
      />
      {hasError && typeof errors[formKey] === "string" && (
        <Text>{errors[formKey]}</Text>
      )}
    </>
  );
}
