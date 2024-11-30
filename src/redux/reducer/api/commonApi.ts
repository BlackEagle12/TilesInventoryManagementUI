import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const commonApi = createApi({
  reducerPath: "common",
  baseQuery: customBaseQuery(),
  
  endpoints: (builder) => ({
    getCountry: builder.query({
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
    getCategory: builder.query({
        query: () => ({
          url: "/Categories", 
          method: "GET",
        }),
        transformResponse(response){
          return response.data
        }
    }),
    getRole: builder.query({
      query: () => ({
        url: "/Roles/GetDefault", 
        method: "GET",
      }),
      transformResponse(response){
        return response.data
      }
  }),
  getAllRole: builder.query({
    query: () => ({
      url: "/Roles", 
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

export const { useGetAllRoleQuery,useGetRoleQuery,useGetCategoryQuery,useGetCountryQuery,useGetStateMutation, useIsEmailExitMutation,useIsPhoneNoExitMutation,useIsUserNameExitMutation } = commonApi;
