// src/components/RequestForm.tsx
import React, { useState } from 'react';
import { type User } from '../types';

interface RequestFormProps {
  currentUser: User;
  onSubmit: (details: string) => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ currentUser, onSubmit }) => {
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details) return;
    
    setIsSubmitting(true);
    await onSubmit(details);
    setIsSubmitting(false);
    setDetails('');
  };

  // Only employees can submit requests
  if (currentUser.role !== 'Employee') {
    return null;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>Submit New Leave Request</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter request details..."
          rows={4}
          style={{ width: '95%', marginBottom: '0.5rem' }}
        />
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};