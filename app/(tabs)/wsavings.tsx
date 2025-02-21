import { StyleSheet, Image, Platform, Modal, Alert, View, Text, Pressable, TextInput } from 'react-native';

import { Dimensions } from 'react-native';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import DefaultScrollView from '@/components/DefaultScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGetCategoriesQuery, useSaveCategoryMutation, useDeleteCategoryMutation } from '@/services/wsavingsAPI'
import { useState } from 'react';
import * as Yup from 'yup';
import { CategoryDto } from '@/shared/models/Category';

// TODO: implement the new windows on this one


export default function TabWSaving() {
  const { data, error, isLoading: isListingCategoriesLoading } = useGetCategoriesQuery({ userId: 1 });
  const [saveCategory, { isLoading: isSaveCategoryMutationLoading }] = useSaveCategoryMutation()
  const [deleteCategory, { isLoading: isDeleteCategoryMutationLoading }] = useDeleteCategoryMutation()
  console.log('DATA', data)

  const isLoading = isListingCategoriesLoading || isSaveCategoryMutationLoading || isDeleteCategoryMutationLoading

  const userSchema = Yup.object({
    title: Yup.string().required('Title is required')
  });

  const initialValues: CategoryDto = { title: '', userId: 1 };

  const handleSubmit = (values: CategoryDto, { setSubmitting, resetForm }: FormikHelpers<CategoryDto>) => {
    saveCategory(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <DefaultScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>

      {isLoading && <Text>Loading...</Text>}

      <ThemedView style={styles.wrapper}>
        {data?.map((category, id) => (
          <ThemedView
            style={styles.itemWrapper}
            key={id}
          >
            <ThemedText>
              {category.title}
              <Pressable 
                onPress={() => deleteCategory(category.id)}
                disabled={isDeleteCategoryMutationLoading}
                >
                Delete
              </Pressable>
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

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
      </ThemedView>
    </DefaultScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemWrapper: {
    width: (Dimensions.get('window').width - 16) / 3,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
