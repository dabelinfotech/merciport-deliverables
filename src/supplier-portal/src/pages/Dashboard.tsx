import React, { useEffect, useState } from 'react';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalImpact: 0, totalOrders: 0 });

  useEffect(() => {
    // In a real app, this would be a specific /supplier/stats endpoint
    apiClient.get('/analytics/impact') 
      .then(res => setStats({ totalImpact: res.data.totalCarbonSaved, totalOrders: res.data.transactionCount }))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ backgroundColor: Colors.background, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ backgroundColor: Colors.primary, color: Colors.white, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>Merciport Supplier Portal</h1>
        <span>Welcome, Eco-Partner</span>
      </nav>
      
      <main style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: Colors.white, padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ color: Colors.gray, margin: 0 }}>Total CO2 Offset</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: Colors.primary, margin: '10px 0' }}>{stats.totalImpact}t</p>
          </div>
          <div style={{ backgroundColor: Colors.white, padding: '2rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ color: Colors.gray, margin: 0 }}>Total Orders</h3>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: Colors.secondary, margin: '10px 0' }}>{stats.totalOrders}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
