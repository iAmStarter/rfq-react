// src/api.ts
import { type ApprovalRequest, type User } from '../types';

// --- Mock Database ---
const users: User[] = [
  { id: 1, name: 'Alice (Employee)', role: 'Employee' },
  { id: 2, name: 'Bob (Manager)', role: 'Manager' },
];

let requests: ApprovalRequest[] = [
  {
    id: 101,
    submittedBy: 'Alice (Employee)',
    submittedById: 1,
    details: 'Request for 2 days leave for a personal trip.',
    status: 'Pending',
    approverId: 2,
  },
  {
    id: 102,
    submittedBy: 'Alice (Employee)',
    submittedById: 1,
    details: 'Need to take a half-day off for a dentist appointment.',
    status: 'Approved',
    approverId: 2,
  },
];

// --- Mock API Functions ---
const simulateNetworkDelay = () => new Promise(res => setTimeout(res, 500));

export const api = {
  getUsers: async (): Promise<User[]> => {
    await simulateNetworkDelay();
    return [...users];
  },
  
  getRequests: async (): Promise<ApprovalRequest[]> => {
    await simulateNetworkDelay();
    // In a real app, you'd fetch based on user role
    return [...requests];
  },

  submitRequest: async (details: string, submitter: User): Promise<ApprovalRequest> => {
    await simulateNetworkDelay();
    const newRequest: ApprovalRequest = {
      id: Math.floor(Math.random() * 10000),
      submittedBy: submitter.name,
      submittedById: submitter.id,
      details,
      status: 'Pending',
      approverId: 2, // Hardcoding manager for simplicity
    };
    requests.push(newRequest);
    return newRequest;
  },

  updateRequestStatus: async (requestId: number, status: 'Approved' | 'Rejected', approver: User): Promise<ApprovalRequest> => {
    await simulateNetworkDelay();
    const request = requests.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');
    if (request.approverId !== approver.id) throw new Error('User is not authorized to approve this request.');

    request.status = status;
    return { ...request };
  },
};