import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function SupplierDiscovery({ navigation }: any) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    apiClient.get('/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error('Error fetching suppliers', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Eco-Suppliers</Text>
      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Booking', { supplier: item })}
          >
            <View>
              <Text style={styles.name}>{item.business_name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.bookText}>Book →</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.text, marginBottom: 20, marginTop: 40 },
  card: { 
    backgroundColor: Colors.white, 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: Colors.secondary,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  category: { fontSize: 14, color: Colors.gray },
  bookText: { color: Colors.primary, fontWeight: 'bold', fontSize: 16 }
});
