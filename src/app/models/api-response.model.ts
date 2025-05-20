export interface ApiResponse<T> {
  status: boolean;
  data: T;
  statusCode: number;
} 