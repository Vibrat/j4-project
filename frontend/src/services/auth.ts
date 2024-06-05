import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from './config'

export type Credential = {
  email: string
  password: string
}

// Define a service using a base URL and expected endpoints
export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginServer: builder.mutation({
      query: (cred: Credential) => ({
        url: 'login',
        method: 'POST',
        body: cred
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginServerMutation } = authAPI