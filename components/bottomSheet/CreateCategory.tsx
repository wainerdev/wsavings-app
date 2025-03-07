import React, { useEffect } from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSaveCategoryMutation } from "@/services/wsavingsAPI";
import { CategoryDto } from "@/shared/models/Category";
import { Formik } from "formik";
import FormField from "@/components/FormField";
import { Button, Text } from "react-native-paper";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Box } from "@/components/ui/Box";

type Props = {
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
};

const userSchema = Yup.object({
  title: Yup.string().required("Category name is required"),
});

const ButtonSheetCreateCategory = ({
  componentRef,
  onClose,
}: Props) => {
  const { signedUser } = useSelector(({ session }: RootState) => session);
  const [saveCategory, { isLoading, isError, isSuccess }] =
    useSaveCategoryMutation();

  const initialValues: CategoryDto = {
    title: "",
    userId: signedUser?.id as number,
  };

  const onSubmit = (values: CategoryDto) => {
    saveCategory(values);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose && onClose();
    }
  }, [isSuccess]);

  return (
    <BottomSheetModal
      snapPoints={["25%", "80%"]}
      stackBehavior="push"
      ref={componentRef}
    >
      <BottomSheetView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Box style={styles.form}>
              <View style={styles.formBody}>
                <FormField
                  formProps={props}
                  formKey="title"
                  label="Category"
                />
              </View>
              <View style={styles.formFooter}>
                <Button
                  onPress={() => props.handleSubmit()}
                  mode="elevated"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Create
                </Button>
                <View>
                  {isError && <Text>Error creating the new category</Text>}
                </View>
              </View>
            </Box>
          )}
        </Formik>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    flexDirection: "column",
  },
  formBody: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  formFooter: {
    display: "flex",
    justifyContent: "center",
    height: 64,
  },
});

export default ButtonSheetCreateCategory;
