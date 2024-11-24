import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const commonApi = createApi({
  reducerPath: "common",
  baseQuery: customBaseQuery(),
  
  endpoints: (builder) => ({
    getCountry: builder.mutation({
      query: () => ({
        url: "/Countries", 
        method: "GET",
        }),
      transformResponse(response){
        return response.data
      }
    }),
    getState: builder.mutation({
        query: (countryId: string) => ({
          url: `/States/${countryId}`, 
          method: "GET",
        }),
        transformResponse(response){
          return response.data
        }
    }),
    getCategory: builder.mutation({
        query: () => ({
          url: "/Categories", 
          method: "GET",
        }),
        transformResponse(response){
          return response.data
        }
    }),
    getRole: builder.mutation({
      query: () => ({
        url: "/Roles/GetDefault", 
        method: "GET",
      }),
      transformResponse(response){
        return response.data
      }
  }),
  isEmailExit: builder.mutation({
    query: (payload) => ({
      url: "/Users/isEmailExist", 
      method: "POST",
      body:JSON.stringify(payload)
    }),
    transformResponse(response){
      return response.data
    }
}),
isPhoneNoExit: builder.mutation({
  query: (payload) => ({
    url: "/Users/isPhoneNoExist", 
    method: "POST",
    body:JSON.stringify(payload)

  }),
  transformResponse(response){
    return response.data
  }
}),
isUserNameExit: builder.mutation({
  query: (payload) => ({
    url: "/Users/isUserNameExist", 
    method: "POST",
    body:JSON.stringify(payload)

  }),
  transformResponse(response){
    return response.data
  }
}),
  }),
}); 

export const { useGetCategoryMutation, useGetCountryMutation, useGetStateMutation, useGetRoleMutation, useIsEmailExitMutation,useIsPhoneNoExitMutation,useIsUserNameExitMutation } = commonApi;
