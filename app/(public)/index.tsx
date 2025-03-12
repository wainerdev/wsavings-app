import React from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { useSignInMutation } from "@/services/wsavingsAPI";
import { Formik } from "formik";
import { UserDto } from "@/shared/models/User";
import { Button, Text } from "react-native-paper";
import { FormField } from "@/components/FormField";
import { router } from "expo-router";

const userSchema = Yup.object({
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

export default function SignInScreen() {
  const [signIn, { isLoading, isError }] = useSignInMutation();

  const initialValues: UserDto = {
    email: "test@gmail.com",
    password: "1232",
    fullName: "",
  };

  const handleCreateAccount = () => {
    router.replace("/sign-up");
  };

  const onSubmit = (values: UserDto) => {
    signIn(values);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} variant="headlineMedium">
          Welcome
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
                  formKey="email"
                />
              </View>
              <View>
                <FormField
                  formProps={props}
                  formKey="password"
                />
              </View>
              <View>
                <Button
                  onPress={() => props.handleSubmit()}
                  mode="contained"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Sign In
                </Button>
              </View>
              <View>{isError && <Text>User not found</Text>}</View>
              <View style={styles.footer}>
                <Text>
                  If you don't have an account, you can create one here
                </Text>
                <Button onPress={handleCreateAccount}>Create account</Button>
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
