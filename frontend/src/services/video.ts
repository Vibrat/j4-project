import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store";
import { logout } from "@/features/auth/slice";
import { API_BASE_URL } from "./config";

export type GetVideoParams = {
  skip: number
  limit: number
}

export type Video = {
  id: number
  title: string
  description: string
  url: string
  email: string
  user_id: number
}

export type ShareVideoParams = {
  url: string
}

export type ShareVideoResponse = {}

export type GetVideosResponse = {
  data: Video[]
}

export const videoAPI = createApi({
  reducerPath: "videoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/videos`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getVideos: builder.query<GetVideosResponse['data'], GetVideoParams>({
      query: (args: GetVideoParams) => `?skip=${args.skip}&limit=${args.limit}`,
      transformResponse: (response: GetVideosResponse) => response?.data ?? [],
    }),
    shareVideo: builder.mutation<ShareVideoResponse, ShareVideoParams>({
      query: (args: ShareVideoParams) => ({
        url: '',
        method: 'POST',
        body: args
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (exception: any) {
          if ((exception.error as FetchBaseQueryError).status === 403) {
            dispatch(logout())
          }
        }
      }
    })
  }),
})

export const { useGetVideosQuery, useShareVideoMutation } = videoAPI