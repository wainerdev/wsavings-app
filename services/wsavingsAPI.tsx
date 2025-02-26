import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoryDto, ListOfCategory } from '@/shared/models/Category';
import { User, UserDto } from "@/shared/models/User";

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
    getCategories: builder.query<ListOfCategory, {}>({
      query: () => ({
        url: '/categories',
        method: "GET",
      }),
      providesTags: ['Category']
    }),
    getCategoryById: builder.query<CategoryDto, number>({
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
    signUp: builder.mutation<void, UserDto>({
      query: (user: User) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation<void, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
    getProfile: builder.query<UserDto, {}>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    })
  }),
});

export const {
  endpoints,
  useLazyGetCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useLazyGetCategoryByIdQuery,
  useSaveCategoryMutation,
  useDeleteCategoryMutation,
  useGetProfileQuery,
  useSignUpMutation,
  useSignInMutation
} = savingsAPI;