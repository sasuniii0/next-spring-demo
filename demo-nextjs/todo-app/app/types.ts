// types.ts
export interface Todo {
  user_id: number;
  description: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface BackendResponse {
  code: string;
  title: string;
  message: string;
  data: {
    user_details: Todo[];
  };
}