import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const customBaseQuery = (): BaseQueryFn => {

  console.log(import.meta.env.VITE_API_URL,"import.meta.env.API_URL");
  
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers: Headers) => {
      const token = "asaasasa";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      
      headers.set("Content-Type","application/json")
      return headers;
    }
  });
};

// export const createCustomQuery = (queryFunction):EndpointDefinition => (builder) => {
//   return builder.query({
//     query: (queryArgs) => queryFunction(queryArgs),
//     transformResponse: (response:response ) => {
//       return response?.data
//     },
//     transformErrorResponse: (response:response ) => {
//       return response?.data
//     }
//   });
// };
