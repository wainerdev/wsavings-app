import React from "react";
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Text, TextInput } from "react-native-paper";

interface Props {
  onChangeText?: (((text: string) => void) & Function) | undefined;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
  value?: string | undefined;
  error?: string | undefined;
  label: string;
  touched: boolean | undefined;
}

export default function FormField(props: Props) {
  const { onChangeText, onBlur, value, error, label, touched } = props;

  const hasError = !!error && touched;
  return (
    <>
      <TextInput
        label={label}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        error={hasError}
      />
      {hasError && <Text>{error}</Text>}
    </>
  );
}
