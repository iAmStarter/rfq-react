// src/types.ts
export type RequestStatus = "Pending" | "Approved" | "Rejected";

export interface ApprovalRequest {
  id: number;
  submittedBy: string; // User's name
  submittedById: number;
  details: string;
  status: RequestStatus;
  approverId: number;
}

export interface User {
  id: number;
  name: string;
  role: "Employee" | "Manager";
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Menu {
  id: number;
  name: string;
  path: string;
  sequence: string;
  icon: string;
  subMenus: Menu[];
}

export interface User {
  firstName: string;
  lastName: string;
  imageProfile: string;
  buName: string;
  buCode: string;
  email: string;
  plant: string;
  listMenu: Menu[];
}

export interface ThemeState {
  mode: 'light' | 'dark';
}
