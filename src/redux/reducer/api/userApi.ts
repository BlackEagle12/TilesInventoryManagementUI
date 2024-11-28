import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery(),
  tagTypes: ['Users'], // Define the tag types
  endpoints: (builder) => ({
    getUserById: builder.mutation({
      query: (id: number) => ({
        url: `/users/${id}`, // The API endpoint path for login
        method: "GET"
      }),
      transformResponse(response){
        return response.data;
      }
    }),
    getAllUser: builder.query({
      query: ({pageNo,pageSize}) => ({
        url: `/users/pageNo=${pageNo}&pageSize=${pageSize}/`, // The API endpoint path for login
        method: "GET"
      }),
      providesTags: ['Users'], 
      transformResponse(response){
        return response.data;
      }
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`, // The API endpoint path for login
        method: "PUT",
        body:JSON.stringify(payload)
      }),
      invalidatesTags: ['Users'], 
      transformResponse(response){
        return response.data;
      }
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/user/${id}`, // The API endpoint path for login
        method: "DELETE"
      }),
      invalidatesTags: ['Users'], 
      transformResponse(response){
        return response.data;
      }
    }),
    getPermissions:builder.mutation({
      query: () => ({
        url: `/users/permissions`, // The API endpoint path for login
        method: "GET",
      }),
      transformResponse(response){
        return response.data;
      }
    }),
  }),
}); // example of api calling

export const { useGetAllUserQuery, useGetUserByIdMutation, useUpdateUserMutation,useDeleteUserMutation,useGetPermissionsMutation } = userApi;
