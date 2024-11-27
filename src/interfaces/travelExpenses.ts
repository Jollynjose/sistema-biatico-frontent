export interface TravelExpenseResult {
  result: TravelExpense;
}

export interface TravelExpense {
  id: string;
  fuel_history_id: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  departure_date: Date;
  arrival_date: Date;
  solicitude_date: Date;
  route: Route;
  user_travel_history: UserTravelHistory[];
  transport_type: string;
  visit_motivation: string;
  toll: Toll[];
}

export interface Route {
  id: string;
  starting_point_province_id: string;
  final_destination_province_id: string;
  description: string;
  total_kms: number;
  created_at: Date;
  updated_at: Date;
}

export interface Toll {
  id: string;
  price: number;
  order: number;
  travel_expense_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserTravelHistory {
  id: string;
  user_id: string;
  travel_expense_id: string;
  job_position_history_id: string;
  total_price: number;
  plus_percentage: number;
  is_lunch_applied: boolean;
  is_breakfast_applied: boolean;
  is_dinner_applied: boolean;
  is_accommodation_applied: boolean;
  passage_price: number;
  created_at: Date;
  updated_at: Date;
}
