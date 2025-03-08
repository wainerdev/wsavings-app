import React, { useEffect } from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/wsavingsAPI";
import { Category } from "@/shared/models/Category";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CategoryDto } from "@/shared/models/Category";
import { Formik } from "formik";
import FormField from "@/components/FormField";
import { Button } from "react-native-paper";
import { Box } from "@/components/ui/Box";
import { ButtonSheetModalWrapper } from "@/components/bottomSheet/ButtonSheetModalWrapper";

type Props = {
  category: Category | null;
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
};

const userSchema = Yup.object({
  title: Yup.string().required("Category name is required"),
});

const ButtonSheetPreviewCategory = ({
  componentRef,
  onClose,
  category,
}: Props) => {
  const { signedUser } = useSelector(({ session }: RootState) => session);
  const [
    deleteCategoryById,
    { isLoading: isDeleteCategoryLoading, isSuccess: isDeleteCategorySuccess },
  ] = useDeleteCategoryMutation();
  const [
    updateCategoryById,
    { isLoading: isUpdateCategoryLoading, isSuccess: isUpdateCategorySuccess },
  ] = useUpdateCategoryMutation();

  const isLoading = isUpdateCategoryLoading || isDeleteCategoryLoading;

  const initialValues: CategoryDto = {
    title: category?.title ?? "",
    userId: signedUser?.id as number,
  };

  const onSubmit = (values: CategoryDto) => {
    updateCategoryById({
      categoryId: category?.id as number,
      category: {
        title: values.title,
        userId: values.userId,
      },
    });
  };

  const handleDeleteCategory = () => {
    if (category) {
      deleteCategoryById(category.id);
    }
  };

  useEffect(() => {
    if (isDeleteCategorySuccess || isUpdateCategorySuccess) {
      onClose && onClose();
    }
  }, [isDeleteCategorySuccess, isUpdateCategorySuccess]);

  return (
    <ButtonSheetModalWrapper snapPoints={["45%", "80%"]} $ref={componentRef}>
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
                label="Category Name"
              />
            </View>
            <View style={styles.formFooter}>
              <Button
                icon="delete"
                onPress={() => handleDeleteCategory()}
                mode="contained"
                disabled={isLoading}
                loading={isDeleteCategoryLoading}
              >
                Delete
              </Button>

              <Button
                icon="update"
                onPress={() => props.handleSubmit()}
                mode="contained"
                disabled={isLoading}
                loading={isUpdateCategoryLoading}
              >
                Update
              </Button>
            </View>
          </Box>
        )}
      </Formik>
    </ButtonSheetModalWrapper>
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
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
});

export default ButtonSheetPreviewCategory;
