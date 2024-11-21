export interface JobPosition {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  job_position_histories: JobPositionHistory[];
}

export interface JobPositionHistory {
  id: string;
  lunch: number;
  breakfast: number;
  dinner: number;
  job_position_id: string;
  accommodation: number;
  created_at: string;
  updated_at: string;
}
