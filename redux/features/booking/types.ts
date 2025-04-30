import { TUser } from "../auth";
import { THospital } from "../hospital/types";

export type TBookingStatus = "pending" | "confirmed" | "cancelled";

export type TBooking = {
  _id: string;
  user: TUser;
  hospital: THospital;
  service: string;
  appointmentDate: Date;
  status: TBookingStatus;
  createdAt: Date;
};

export type TCreateBookingPayload = {
  hospital: string;
  service: string;
  appointmentDate: Date;
};
