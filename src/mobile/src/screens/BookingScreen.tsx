import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function BookingScreen({ route, navigation }: any) {
  const { supplier } = route.params;
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      // In a real app, we would first fetch the actual serviceId from the supplier
      const response = await apiClient.post('/transactions', {
        serviceId: 'mock_service_id_123', 
        quantity: parseFloat(quantity),
        totalAmount: 100 * parseFloat(quantity) // Mock price
      });

      Alert.alert(
        'Booking Successful!', 
        `You saved ${response.data.impact.carbonSaved}t of CO2.`,
        [{ text: 'Awesome!', onPress: () => navigation.navigate('ImpactDashboard') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.supplierName}>{supplier.business_name}</Text>
        <Text style={styles.category}>{supplier.category}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Quantity / Units</Text>
        <TextInput 
          style={styles.input} 
          value={quantity} 
          onChangeText={setQuantity} 
          keyboardType="numeric" 
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleBooking}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { 
    backgroundColor: Colors.white, 
    padding: 30, 
    borderBottomWidth: 1, 
    borderBottomColor: Colors.accent,
    alignItems: 'center' 
  },
  supplierName: { fontSize: 22, fontWeight: 'bold', color: Colors.text },
  category: { fontSize: 16, color: Colors.gray },
  form: { padding: 30, marginTop: 20 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 10 },
  input: { 
    backgroundColor: Colors.white, 
    padding: 15, 
    borderRadius: 10, 
    fontSize: 18, 
    borderWidth: 1, 
    borderColor: Colors.accent,
    marginBottom: 30 
  },
  button: { 
    backgroundColor: Colors.primary, 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  buttonDisabled: { backgroundColor: Colors.gray },
  buttonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});
