export type TBooking = {
  _id: string;
  user: string;
  hospital: string;
  service: string;
  appointmentDate: Date;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
};

export type TCreateBookingPayload = {
  hospital: string;
  service: string;
  appointmentDate: Date;
};
