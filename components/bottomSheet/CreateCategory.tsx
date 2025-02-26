import React from 'react';
import * as Yup from 'yup';
import { Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useSaveCategoryMutation } from '@/services/wsavingsAPI'
import { CategoryDto } from '@/shared/models/Category';
import { ThemedView } from '../ThemedView';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

type Props = {
  bottomSheetCreateCategoryRef: React.RefObject<BottomSheetModal>;
  bottomSheetCreateCategoryChange: (index: number) => void;
}

const userSchema = Yup.object({
  title: Yup.string().required('Title is required')
});

const ButtonSheetCreateCategory = ({ bottomSheetCreateCategoryRef, bottomSheetCreateCategoryChange }: Props) => {
  const [saveCategory, { isLoading }] = useSaveCategoryMutation()

  const initialValues: CategoryDto = { title: '', userId: 1 };

  const handleSubmit = (values: CategoryDto, { setSubmitting, resetForm }: FormikHelpers<CategoryDto>) => {
    saveCategory(values);
    setSubmitting(false);
    resetForm();
    bottomSheetCreateCategoryChange(0);
  };

  return (
    <BottomSheetModal
      snapPoints={['25%', '100%']}
      stackBehavior='push'
      ref={bottomSheetCreateCategoryRef}
      onChange={bottomSheetCreateCategoryChange}
    >
      <BottomSheetView style={styles.container}>
        <ThemedView>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="title">title</label>
                <Field type="text" name="title" />
                <ErrorMessage name="title" />

                <button type="submit" disabled={isSubmitting}>Submit</button>
              </Form>
            )}
          </Formik>
          {isLoading && <Text>Loading...</Text>}
        </ThemedView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
    justifyContent: 'center',
  },
});

export default ButtonSheetCreateCategory;