export interface Review {
  id: number;
  name: string;
  comment: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  transmission: "Automatique" | "Manuelle";
  fuel: "Essence" | "Diesel";
  pricePerDay: number;
  image: string;
  logo: string;
}

export interface BookingFormData {
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  sameLocation: boolean;
}
