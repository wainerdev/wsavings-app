import React from "react";
import * as Yup from "yup";
import { Text, StyleSheet } from "react-native";
import { useSignInMutation } from "@/services/wsavingsAPI";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ThemedView } from "@/components/ThemedView";
import { UserDto } from "@/shared/models/User";

const userSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignInScreen () {
  const [saveCategory, { isLoading }] = useSignInMutation();

  const initialValues: UserDto = { email: "test@gmail.com", password: "", fullName: "1232" };

  const handleSubmit = (
    values: UserDto,
    { setSubmitting, resetForm }: FormikHelpers<UserDto>
  ) => {
    saveCategory(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <ThemedView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />

            <label htmlFor="password">Password</label>
            <Field type="text" name="password" />
            <ErrorMessage name="password" />


            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {isLoading && <Text>Loading...</Text>}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "purple",
    justifyContent: "center",
  },
});
