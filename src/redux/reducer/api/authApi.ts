import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const authApi = createApi({
  reducerPath: "authenticate",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/Auth/login", // The API endpoint path for login
        method: "POST",
        body: JSON.stringify(credentials), // The data you want to send in the request body (e.g., { username, password })
      }),
      transformResponse(response){
        cookies.set('auth-session',response.data.token);
        return response;
      }
    }),
   signUp: builder.mutation({
      query: (payload) => ({
        url: "/users", // The API endpoint path for login
        method: "POST",
        body: JSON.stringify(payload), // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials: string) => ({
        url: "/Auth/signup", // The API endpoint path for login
        method: "POST",
        body: credentials, // The data you want to send in the request body (e.g., { username, password })
      }),
    }),
   
  }),
}); // example of api calling

export const { useLoginMutation,useForgotPasswordMutation,useSignUpMutation } = authApi;
