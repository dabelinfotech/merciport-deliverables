import React, { useEffect, useState } from 'react';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function Verification() {
  const [pendingSuppliers, setPendingSuppliers] = useState([]);

  useEffect(() => {
    apiClient.get('/suppliers')
      .then(res => setPendingSuppliers(res.data.filter((s: any) => s.status === 'pending')))
      .catch(err => console.error(err));
  }, []);

  const handleVerify = async (id: string) => {
    try {
      // API call to update status to 'verified'
      await apiClient.post(`/suppliers/${id}/verify`);
      setPendingSuppliers(pendingSuppliers.filter((s: any) => s.id !== id));
      alert('Supplier verified successfully!');
    } catch (err) {
      alert('Verification failed');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: Colors.background, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: Colors.text, marginBottom: '2rem' }}>Pending Verifications</h2>
      <table style={{ width: '100%', backgroundColor: Colors.white, borderRadius: '12px', borderCollapse: 'collapse', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <thead style={{ backgroundColor: Colors.accent, color: Colors.text }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Business Name</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingSuppliers.map((s: any) => (
            <tr key={s.id} style={{ borderBottom: `1px solid ${Colors.background}` }}>
              <td style={{ padding: '1rem' }}>{s.business_name}</td>
              <td style={{ padding: '1rem' }}>{s.category}</td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <button 
                  onClick={() => handleVerify(s.id)}
                  style={{ backgroundColor: Colors.primary, color: Colors.white, border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
          {pendingSuppliers.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: Colors.gray }}>No pending verifications.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
