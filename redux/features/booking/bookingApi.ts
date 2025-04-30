import { baseApi } from "@/api/baseApi";
import { TResponse } from "../types";
import { TBooking, TCreateBookingPayload } from "./types";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<TResponse<TBooking>, TCreateBookingPayload>(
      {
        query: (bookingData) => ({
          url: "/booking",
          method: "POST",
          body: bookingData,
        }),
        invalidatesTags: ["booking"],
      }
    ),
    getUserBookings: builder.query<TResponse<TBooking[]>, void>({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useCreateBookingMutation, useGetUserBookingsQuery } = bookingApi;
