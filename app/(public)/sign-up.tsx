import React, { useEffect } from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { useSignInMutation, useSignUpMutation } from "@/services/wsavingsAPI";
import { Formik } from "formik";
import { UserDto } from "@/shared/models/User";
import { Button, Text } from "react-native-paper";
import FormField from "@/components/FormField";
import { router } from "expo-router";

const userSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    // .matches(/\d/, "Password must have a number")
    // .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .label("Password"),
});

export default function SignUpScreen() {
  const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();

  const initialValues: UserDto = {
    email: "",
    password: "",
    fullName: "",
  };

  const handleCreateAccount = () => {
    router.replace("/(public)");
  };

  const onSubmit = (values: UserDto) => {
    signUp(values);
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(public)");
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} variant="headlineMedium">
          Create new account
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <View style={styles.form}>
              <View>
                <FormField
                  formProps={props}
                  formKey="fullName"
                  label="Full Name"
                />
              </View>
              <View>
                <FormField
                  formProps={props}
                  formKey="email"
                />
              </View>
              <View>
                <FormField
                  formProps={props}
                  formKey="password"
                  secureTextEntry
                />
              </View>
              <View>
                <Button
                  onPress={() => props.handleSubmit()}
                  mode="contained"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Sign Up
                </Button>
              </View>
              <View>{isError && <Text>Error creating your account</Text>}</View>
              <View style={styles.footer}>
                <Text>
                  if you already have an account, you can sign in here
                </Text>
                <Button onPress={handleCreateAccount}>Sign in</Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 32,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
  }
});
