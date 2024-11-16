export interface Result {
  results: Fuel[];
}

export type fuelType = 'diesel' | 'gasoline';

export interface Fuel {
  id: string;
  created_at: Date;
  updated_at: Date;
  type: fuelType;
  name: string;
  fuel_histories: FuelHistory[];
}

export interface FuelHistory {
  id: string;
  created_at: Date;
  updated_at: Date;
  price: number;
  fuel_id: string;
}
