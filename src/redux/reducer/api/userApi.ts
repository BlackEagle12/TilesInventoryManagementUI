import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id: number) => ({
        url: "/Auth/authenticate", // The API endpoint path for login
      }),
    })
  }),
}); // example of api calling

export const { useLazyGetUserByIdQuery } = userApi;
