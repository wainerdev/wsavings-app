import { Dimensions } from "react-native";
import { StyleSheet, View, Pressable } from "react-native";
import { useGetCategoriesQuery } from "@/services/wsavingsAPI";
import { useCallback, useRef, useState } from "react";
import { Category } from "@/shared/models/Category";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ButtonSheetCreateCategory from "@/components/bottomSheet/CreateCategory";
import ButtonSheetWrapper from "@/components/bottomSheet/Wrapper";
import ButtonSheetPreviewCategory from "@/components/bottomSheet/PreviewCategory";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { Text, Card } from "react-native-paper";
import { Box, BOX_PADDING } from "@/components/ui/Box";
import { useTheme } from "react-native-paper";


const SKELETON_ITEMS = Array.from({ length: 17 });

export default function TabCategories() {
  const theme = useTheme();
  const bottomSheetCreateCategoryRef = useRef<BottomSheetModal>(null);
  const bottomSheetPreviewCategoryRef = useRef<BottomSheetModal>(null);
  const { data, isLoading } = useGetCategoriesQuery({});
  const singleCategorySizes = {
    width: (Dimensions.get("window").width - (BOX_PADDING * 2 + 16)) / 3,
    height: 100,
    backgroundColor: theme.colors.elevation.level2,
  };

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleOpenCategoryCreateModal = useCallback(() => {
    bottomSheetCreateCategoryRef.current?.present();
  }, []);

  const handleOpenCategoryPreviewModal = useCallback((category: Category) => {
    setSelectedCategory(category);
    bottomSheetPreviewCategoryRef.current?.present();
  }, []);

  return (
    <ButtonSheetWrapper>
      <Box>
        <ButtonSheetCreateCategory
          componentRef={bottomSheetCreateCategoryRef}
          onClose={() => bottomSheetCreateCategoryRef.current?.dismiss()}
        />

        <ButtonSheetPreviewCategory
          category={selectedCategory}
          componentRef={bottomSheetPreviewCategoryRef}
          onClose={() => {
            bottomSheetPreviewCategoryRef.current?.dismiss();
            setSelectedCategory(null);
          }}
        />

        <Text variant="titleMedium">Chose Your Categories</Text>

        {isLoading ? (
          <MotiView
            style={styles.categories}
            transition={{
              type: "timing",
            }}
          >
            {SKELETON_ITEMS.map((_, index) => (
              <Skeleton
                key={index}
                {...singleCategorySizes}
              />
            ))}
          </MotiView>
        ) : (
          <View style={styles.categories}>
            {data?.categories.map((category, id) => (
              <Card
                key={id}
                style={{ ...styles.singeCategory, ...singleCategorySizes }}
                onPress={() => handleOpenCategoryPreviewModal(category)}
                disabled={isLoading}
              >
                <Text variant="bodyMedium">{category.title}</Text>
              </Card>
            ))}
            <Pressable
              style={{
                ...styles.singeCategory,
                ...styles.addCategory,
                ...singleCategorySizes,
                backgroundColor: "transparent",
                borderColor: theme.colors.elevation.level4,
              }}
              onPress={() => handleOpenCategoryCreateModal()}
              disabled={isLoading}
            >
              <Text variant="bodyMedium">Add Category</Text>
            </Pressable>
          </View>
        )}
      </Box>
    </ButtonSheetWrapper>
  );
}

const styles = StyleSheet.create({
  categories: {
    marginTop: 16,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  singeCategory: {
    borderRadius: 8,
    height: 100,
    width: (Dimensions.get("window").width - 64) / 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  addCategory: {
    backgroundColor: "transparent",
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
  },
});
