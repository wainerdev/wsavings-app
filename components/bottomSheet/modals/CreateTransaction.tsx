import React, { useEffect } from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useLazyGetCategoriesQuery,
  useSaveTransactionMutation,
} from "@/services/wsavingsAPI";
import { TransactionDto, TransactionType } from "@/shared/models/Transaction";
import { Formik, FormikHelpers } from "formik";
import {FormField} from "@/components/FormField";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SegmentedButtons, Button, Text, Chip } from "react-native-paper";
import { Category } from "@/shared/models/Category";
import { ButtonSheetModalWrapper } from "@/components/bottomSheet/ButtonSheetModalWrapper";

type Props = {
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
  isVisible?: boolean;
};

const YUP_SCHEMA = Yup.object({
  description: Yup.string().required("Description required"),
  amount: Yup.number().required("Amount required"),
});

const INITIAL_VALUES: TransactionDto = {
  categoryId: null as unknown as number,
  userId: null as unknown as number,
  amount: null as unknown as number,
  description: "",
  type: "INCOME",
};

const ButtonSheetCreateTransaction = ({ componentRef, onClose, isVisible }: Props) => {
  const { signedUser } = useSelector(({ session }: RootState) => session);
  const [fetchCategories, { data, isLoading: isGetCategoryLoading }] = useLazyGetCategoriesQuery();

  const [transactionType, setTransactionType] =
    React.useState<TransactionType>("INCOME");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const [
    saveTransaction,
    { isLoading: isSaveTransactionLoading, isError, isSuccess },
  ] = useSaveTransactionMutation();

  const isLoading = isSaveTransactionLoading || isGetCategoryLoading;

  const onSubmit = (
    values: TransactionDto,
    helpers: FormikHelpers<TransactionDto>
  ) => {
    saveTransaction({
      ...values,
      type: transactionType,
      amount: Number(values.amount),
      userId: signedUser?.id as number,
      categoryId: selectedCategory?.id as number,
    });
    helpers.resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      onClose && onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isVisible) {
      fetchCategories({});
    }
  }, [isVisible]);


  return (
    <ButtonSheetModalWrapper snapPoints={["25%", "50%"]} $ref={componentRef}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={YUP_SCHEMA}
        onSubmit={onSubmit}
      >
        {(props) => (
          <View style={styles.form}>
            <View style={styles.formBody}>
              <FormField formProps={props} formKey="description" />
              <FormField
                formProps={props}
                formKey="amount"
                keyboardType="numeric"
              />
              <SegmentedButtons
                style={styles.actionTypeButtons}
                density="medium"
                value={transactionType}
                onValueChange={(value) =>
                  setTransactionType(value as TransactionType)
                }
                buttons={[
                  {
                    value: "INCOME" as TransactionType,
                    label: "+",
                  },
                  {
                    value: "EXPENSE" as TransactionType,
                    label: "-",
                  },
                ]}
              />

              <View style={styles.categoriesSlider}>
                {data?.categories.map((category) => (
                  <Chip
                    selected={selectedCategory?.id === category.id}
                    key={category.id}
                    onPress={() => setSelectedCategory(category)}
                  >
                    {category.title}
                  </Chip>
                ))}
              </View>
            </View>

            <Button
              icon="check"
              onPress={() => props.handleSubmit()}
              mode="elevated"
              disabled={isLoading}
              loading={isLoading}
            >
              Add
            </Button>
            <View>
              {isError && <Text>Error creating the new category</Text>}
            </View>
          </View>
        )}
      </Formik>
    </ButtonSheetModalWrapper>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: "column",
  },
  formBody: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 16,
  },
  actionTypeButtons: {
    width: 10,
  },
  categoriesSlider: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
});

export default ButtonSheetCreateTransaction;
