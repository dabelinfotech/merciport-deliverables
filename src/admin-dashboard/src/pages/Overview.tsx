import React, { useEffect, useState } from 'react';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function Overview() {
  const [globalStats, setGlobalStats] = useState({ totalCarbonSaved: 0, totalSuppliers: 0 });

  useEffect(() => {
    // In production, this hits a specialized /admin/global-stats endpoint
    apiClient.get('/analytics/impact') 
      .then(res => setGlobalStats({ totalCarbonSaved: res.data.totalCarbonSaved, totalSuppliers: 12 }))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ backgroundColor: Colors.background, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ backgroundColor: '#1B4332', color: Colors.white, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Merciport Command Centre</h1>
        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>System Admin Role</span>
      </nav>
      
      <main style={{ padding: '2rem' }}>
        <h2 style={{ color: Colors.text, marginBottom: '2rem' }}>Platform Health</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: Colors.white, padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: Colors.gray, fontSize: '1rem', margin: 0 }}>Global Carbon Offset</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: Colors.primary, margin: '10px 0' }}>{globalStats.totalCarbonSaved}t</p>
            <span style={{ color: Colors.secondary, fontSize: '0.9rem' }}>↑ 12% from last month</span>
          </div>
          <div style={{ backgroundColor: Colors.white, padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: Colors.gray, fontSize: '1rem', margin: 0 }}>Verified Suppliers</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: Colors.text, margin: '10px 0' }}>{globalStats.totalSuppliers}</p>
            <span style={{ color: Colors.gray, fontSize: '0.9rem' }}>Across 4 regions</span>
          </div>
        </div>
      </main>
    </div>
  );
}
