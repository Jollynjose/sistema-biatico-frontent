export interface UserEntity {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  job_position_id: string;
}

export interface FindAllUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  job_position_id: string;
  job_position_specification: null;
  job_position: FindAllUserJobPosition;
}

export interface FindAllUserJobPosition {
  id: string;
  name: string;
  lunch: number;
  breakfast: number;
  dinner: number;
  accommodation: number;
}
