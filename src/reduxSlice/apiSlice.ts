import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";
import config from "../lib/config";
import { IGetUserDataParams, IUser, IUserData, IUserPrediction } from "@/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.urlApi}`,
    paramsSerializer: (params) => {
      return queryString.stringify(params, { arrayFormat: "none" });
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    users: builder.query<IUser[], void>({
      query: () => ({
        url: "/users",
      }),
      transformResponse: (res: unknown) => res as IUser[],
    }),
    userData: builder.query<IUserData, IGetUserDataParams>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
      }),
      transformResponse: (res: unknown) => res as IUserData,
    }),
    prediction: builder.query<IUserPrediction, IGetUserDataParams>({
      query: ({ userId }) => ({
        url: `/users/${userId}/prediction`,
      }),
      transformResponse: (res: unknown) => res as IUserPrediction,
    }),
  }),
});

export const { useUsersQuery, useUserDataQuery, usePredictionQuery } = apiSlice;
