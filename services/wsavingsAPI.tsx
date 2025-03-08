import type {
  Category,
  CategoryDto,
  ListOfCategory,
} from "@/shared/models/Category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserDto } from "@/shared/models/User";
import { ListOfTransaction, TransactionDto } from "@/shared/models/Transaction";

const BASE_API_URL = "http://localhost:3000"; // TODO: Move the variable to the env file
// const BASE_API_URL = "https://wsavings.onrender.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: "include",
  // headers: {
  //   "Content-type": "application/json; charset=UTF-8",
  // },
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const savingsAPI = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Category", "User", "Profile", "Transaction"],
  endpoints: (builder) => ({
    getCategories: builder.query<ListOfCategory, {}>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<Category, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),
    saveCategory: builder.mutation<void, CategoryDto>({
      query: ({ title, userId }) => ({
        url: `/categories`,
        method: "post",
        body: { title, userId },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      void,
      { categoryId: number; category: CategoryDto }
    >({
      query: ({ categoryId, category }) => ({
        url: `/categories/${categoryId}`,
        method: "put",
        body: category,
      }),
      invalidatesTags: ["Category", "Transaction"],
    }),
    signUp: builder.mutation<void, UserDto>({
      query: (user: User) => ({
        url: "/users/sign-up",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation<void, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/users/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),
    getProfile: builder.query<{ user: User }, {}>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    saveTransaction: builder.mutation<
      void,
      TransactionDto
    >({
      query: (transaction) => ({
        url: `/transactions`,
        method: "post",
        body: transaction,
      }),
      invalidatesTags: ["Transaction", "Profile"],
    }),
    getTransactionByDateRange: builder.query<
      ListOfTransaction,
      {
        startDate: string;
        endDate: string;
      }
    >({
      query: ({startDate, endDate}) => ({
        url: `/transactions/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionByUserIdAndCategoryId: builder.query<
      ListOfTransaction, { categoryId: number }
    >({
      query: ({ categoryId}) => ({
        url: `/transactions/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  endpoints,
  useLazyGetCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useLazyGetCategoryByIdQuery,
  useSaveCategoryMutation,
  useDeleteCategoryMutation,
  useGetProfileQuery,
  useSignUpMutation,
  useSignInMutation,
  useSaveTransactionMutation,
  useGetTransactionByDateRangeQuery,
  useGetTransactionByUserIdAndCategoryIdQuery,
  useLazyGetTransactionByUserIdAndCategoryIdQuery
} = savingsAPI;
