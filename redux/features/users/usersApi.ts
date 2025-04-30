import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TUser } from "../auth";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<TResponse<TUser>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = usersApi;
