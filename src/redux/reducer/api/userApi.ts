import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery(),
  tagTypes: ['Users'], // Define the tag types
  endpoints: (builder) => ({
    getUserById: builder.mutation({
      query: (id?: number) => ({
        url: `/users${id ? "/"+id : ""}` , // The API endpoint path for login
        method: "GET"
      }),
      transformResponse(response){
        return response.data;
      }
    }),
    getAllUser: builder.mutation({
      query: (payload) => ({
        url: `/users/GetAll`, // The API endpoint path for login
        method: "POST",
        body:JSON.stringify(payload)
      }),
      providesTags: (result) => [{ type: 'User', id: result?.id || 'USER' }], 
      transformResponse(response){
        return response.data;
      }
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users`, // The API endpoint path for login
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
    updateUserRole: builder.mutation({
      query: (payload) => ({
        url: `/users/updateRole/${payload.id}/${payload.roleId}`, // The API endpoint path for login
        method: "GET"
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.id || 'USER' }], 
    }),
  }),
}); // example of api calling

export const { useUpdateUserRoleMutation,useGetAllUserMutation, useGetUserByIdMutation, useUpdateUserMutation,useDeleteUserMutation,useGetPermissionsMutation } = userApi;
