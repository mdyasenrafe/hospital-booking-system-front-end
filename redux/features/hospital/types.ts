export type THospital = {
  _id: string;
  name: string;
  address?: string;
  phone?: string;
  services: string[];
  status: "active" | "inactive";
};
