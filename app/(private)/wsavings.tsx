import { StyleSheet, Image, Platform, Modal, Alert, View, Text, Pressable, TextInput, Button } from 'react-native';

import { Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetCategoriesQuery, useSaveCategoryMutation, useDeleteCategoryMutation } from '@/services/wsavingsAPI'
import { useCallback, useRef, useState } from 'react';
import { Category, CategoryDto } from '@/shared/models/Category';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import ButtonSheetCreateCategory from '@/components/bottomSheet/CreateCategory';
import ButtonSheetWrapper from '@/components/bottomSheet/Wrapper';
import ButtonSheetPreviewCategory from '@/components/bottomSheet/PreviewCategory';

// TODO: implement the new windows on this one


export default function TabWSaving() {
  const bottomSheetCreateCategoryRef = useRef<BottomSheetModal>(null);
  const bottomSheetPreviewCategoryRef = useRef<BottomSheetModal>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data, error, isLoading: isListingCategoriesLoading } = useGetCategoriesQuery({});
  const [deleteCategory, { isLoading: isDeleteCategoryMutationLoading }] = useDeleteCategoryMutation()
  console.log('DATA', data)


  // callbacks
  const handleOpenCategoryCreateModal = useCallback((isOpen = true) => {
    console.log('is pennnnn', isOpen);
    if (isOpen) {
      bottomSheetCreateCategoryRef.current?.present();
      return  
    } else {
      bottomSheetCreateCategoryRef.current?.dismiss();
    }
  }, []);


  const handleOpenCategoryPreviewModal = useCallback((category: Category, isOpen = true) => {
    setSelectedCategory(category);
    if (isOpen) {
      bottomSheetPreviewCategoryRef.current?.present();
      return;
    }
    bottomSheetPreviewCategoryRef.current?.dismiss();
  }, []);






  return (

    <ButtonSheetWrapper>
      <ThemedView style={styles.container}>
        {/* {isLoading && <Text>Loading...</Text>} */}
        <ButtonSheetCreateCategory
          bottomSheetCreateCategoryRef={bottomSheetCreateCategoryRef}
          bottomSheetCreateCategoryChange={() => { 
            handleOpenCategoryCreateModal(false)
          }}
        />


        <ButtonSheetPreviewCategory
          category={selectedCategory}
          bottomSheetPreviewCategoryRef={bottomSheetPreviewCategoryRef}
          bottomSheetPreviewCategoryChange={() => {
            handleOpenCategoryPreviewModal(selectedCategory as Category, false) 
           }}
        />




        <View style={styles.wrapper}>
          {data?.categories.map((category, id) => (
            <Pressable
              key={id}
              style={styles.itemButtonWrapper}
              onPress={() => handleOpenCategoryPreviewModal(category)}
              disabled={isDeleteCategoryMutationLoading}
            >
              <ThemedText>
                {category.title}
              </ThemedText>
            </Pressable>
          ))}
          <Pressable
            style={styles.itemButtonWrapper}
            onPress={() => handleOpenCategoryCreateModal(true)}
          >
            <ThemedText>
              Create 
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>

    </ButtonSheetWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    gap: 8,
  },
  itemButtonWrapper: {
    borderRadius: 8,
    height: 100,
    width: (Dimensions.get('window').width - 16) / 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  }
});
