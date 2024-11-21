export interface FuelHistory {
  id: string;
  created_at: string;
  updated_at: string;
  price: number;
  fuel_id: string;
}

export interface Fuel {
  id: string;
  created_at: string;
  updated_at: string;
  type: 'gasoline' | 'diesel';
  name: string;
  fuel_histories: FuelHistory[];
}
