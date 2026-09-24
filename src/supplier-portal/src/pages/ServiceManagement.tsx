import React, { useState } from 'react';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function ServiceManagement() {
  const [newService, setNewService] = useState({ name: '', offset: '', price: '' });

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/suppliers', { ...newService, category: 'General' });
      alert('Service added successfully!');
    } catch (err) {
      alert('Error adding service');
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: Colors.background, minHeight: '100vh' }}>
      <h2 style={{ color: Colors.text }}>Manage Your Services</h2>
      <form onSubmit={handleAddService} style={{ backgroundColor: Colors.white, padding: '2rem', borderRadius: '15px', maxWidth: '500px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Service Name</label>
          <input 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${Colors.accent}` }} 
            onChange={e => setNewService({...newService, name: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Carbon Offset per Unit (t)</label>
          <input 
            type="number" 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${Colors.accent}` }} 
            onChange={e => setNewService({...newService, offset: e.target.value})} 
          />
        </div>
        <button style={{ backgroundColor: Colors.primary, color: Colors.white, padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Service
        </button>
      </form>
    </div>
  );
}
