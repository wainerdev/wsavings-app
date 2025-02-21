import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoryDto, ListOfCategory } from '@/shared/models/Category';

const BASE_API_URL = "http://localhost:3000"; // TODO: Move the variable to the env file
// const BASE_API_URL = "https://wsavings.onrender.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  // credentials: "include",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const savingsAPI = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ListOfCategory, { userId: number}>({
      query: ({ userId }) => ({
        url: `/categories/${userId}`,
        method: "GET",
      }),
      providesTags: ['Category']
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
  }),
});

export const {
  endpoints,
  useLazyGetCategoriesQuery,
  useGetCategoriesQuery,
  useSaveCategoryMutation,
  useDeleteCategoryMutation
} = savingsAPI;