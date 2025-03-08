import React, { useEffect } from "react";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useGetCategoriesQuery,
  useSaveTransactionMutation,
} from "@/services/wsavingsAPI";
import { TransactionDto, TransactionType } from "@/shared/models/Transaction";
import { Formik, FormikHelpers } from "formik";
import FormField from "@/components/FormField";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Box } from "@/components/ui/Box";
import { SegmentedButtons, Button, Text, Chip } from "react-native-paper";
import { Category } from "@/shared/models/Category";
import { useTheme } from "react-native-paper";
import { ButtonSheetModalWrapper } from "@/components/bottomSheet/ButtonSheetModalWrapper";

type Props = {
  componentRef: React.RefObject<BottomSheetModal>;
  onClose?: () => void;
};

const userSchema = Yup.object({
  description: Yup.string().required("Description required"),
  amount: Yup.number().required("Amount required"),
});

const ButtonSheetCreateTransaction = ({ componentRef, onClose }: Props) => {
  const { signedUser } = useSelector(({ session }: RootState) => session);
  const { data, isLoading: isGetCategoryLoading } = useGetCategoriesQuery({});

  const [transactionType, setTransactionType] =
    React.useState<TransactionType>("INCOME");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  console.log("data", selectedCategory);

  const [
    saveTransaction,
    { isLoading: isSaveTransactionLoading, isError, isSuccess },
  ] = useSaveTransactionMutation();

  const isLoading = isSaveTransactionLoading || isGetCategoryLoading;

  const initialValues: TransactionDto = {
    categoryId: null as unknown as number,
    userId: null as unknown as number,
    amount: null as unknown as number,
    description: "",
    type: transactionType,
  };

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

  return (
    <ButtonSheetModalWrapper snapPoints={["25%", "80%"]} $ref={componentRef}>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
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
              <View>
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
              </View>

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
            <View style={styles.formFooter}>
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
          </View>
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
    gap: 16,
  },
  formFooter: {
    display: "flex",
    justifyContent: "center",
    height: 64,
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
