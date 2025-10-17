// src/components/RequestList.tsx
import React from 'react';
import { type ApprovalRequest, type User } from '../types';

interface RequestListProps {
  requests: ApprovalRequest[];
  currentUser: User;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export const RequestList: React.FC<RequestListProps> = ({ requests, currentUser, onApprove, onReject }) => {
  const getStatusColor = (status: string) => {
    if (status === 'Approved') return 'green';
    if (status === 'Rejected') return 'red';
    return 'orange';
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>Approval Requests</h3>
      {requests.map(req => (
        <div key={req.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
          <p>
            <strong>ID:</strong> {req.id} | <strong>Submitted by:</strong> {req.submittedBy}
          </p>
          <p>{req.details}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span style={{ color: getStatusColor(req.status), fontWeight: 'bold' }}>
              {req.status}
            </span>
          </p>

          {/* --- The Core Approval Logic --- */}
          {currentUser.role === 'Manager' && req.approverId === currentUser.id && req.status === 'Pending' && (
            <div>
              <button onClick={() => onApprove(req.id)} style={{ marginRight: '0.5rem', backgroundColor: '#28a745' }}>
                Approve
              </button>
              <button onClick={() => onReject(req.id)} style={{ backgroundColor: '#dc3545' }}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};