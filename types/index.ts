// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Stats for dashboard
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeProjects: number;
  completedTasks: number;
}
