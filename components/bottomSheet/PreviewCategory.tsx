import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Text, StyleSheet, Button, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useDeleteCategoryMutation, useGetCategoryByIdQuery, useLazyGetCategoryByIdQuery } from '@/services/wsavingsAPI'
import { Category } from '@/shared/models/Category';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

type Props = {
  category: Category | null;
  bottomSheetPreviewCategoryRef: React.RefObject<BottomSheetModal>;
  bottomSheetPreviewCategoryChange: (index: number) => void;
}

const userSchema = Yup.object({
  title: Yup.string().required('Title is required')
});

const ButtonSheetPreviewCategory = ({ bottomSheetPreviewCategoryRef, bottomSheetPreviewCategoryChange, category }: Props) => {
  const [fetchCategoryById, { isLoading: isFetchCategoryLoading, data }] = useLazyGetCategoryByIdQuery();
  const [deleteCategoryById, { isLoading: isDeleteCategoryLoading }] = useDeleteCategoryMutation();

  const isLoading = isFetchCategoryLoading || isDeleteCategoryLoading;

  useEffect(() => {
    if (category?.id) {
      fetchCategoryById(category.id);
    }
  }, [category]);

  const handleDeleteCategory = () => {
    if (category) {
      deleteCategoryById(category.id)
    }

    bottomSheetPreviewCategoryChange(1)
  }
  

  return (
    <BottomSheetModal
      snapPoints={['25%', '100%']}
      stackBehavior='push'
      ref={bottomSheetPreviewCategoryRef}
      onChange={bottomSheetPreviewCategoryChange}
    >
      <BottomSheetView style={styles.container}>
        
          <View
            
          >
            {isLoading && <Text>Loading...</Text>}
            <ThemedView
              style={{ backgroundColor: 'white'}}
            >
              {data?.title}
            </ThemedView>
          </View>
          <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Button title="Delete" onPress={() => handleDeleteCategory()} />
            <Button title="Rename" onPress={() => bottomSheetPreviewCategoryChange(0)} />
          </ThemedView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default ButtonSheetPreviewCategory;