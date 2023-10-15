import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tpomobi.shop' }),
  endpoints: (builder) => ({
    findAllWords: builder.query({
      query: () => ({
        url: '/getProductsAdmin',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }),
    }),
  }),
})
