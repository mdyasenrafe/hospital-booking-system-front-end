import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { THospital } from "./types";

const hospitalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHospitals: builder.query<TResponse<THospital[]>, void>({
      query: () => ({
        url: "/hospital",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHospitalsQuery } = hospitalApi;
