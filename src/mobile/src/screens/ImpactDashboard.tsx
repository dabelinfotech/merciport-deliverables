import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import apiClient from '../api/client';

export default function ImpactDashboard() {
  const [impact, setImpact] = useState({ totalCarbonSaved: 0, transactionCount: 0 });

  useEffect(() => {
    apiClient.get('/analytics/impact')
      .then(res => setImpact(res.data))
      .catch(err => console.error('Error fetching impact', err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Impact</Text>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{impact.totalCarbonSaved}t</Text>
          <Text style={styles.statLabel}>Carbon Saved</Text>
        </View>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Environmental Contribution</Text>
        <Text style={styles.description}>
          You have completed {impact.transactionCount} eco-friendly transactions. 
          Your choices are helping reduce global emissions.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { 
    backgroundColor: Colors.primary, 
    padding: 40, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    alignItems: 'center' 
  },
  title: { color: Colors.white, fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  statCard: { 
    backgroundColor: Colors.white, 
    padding: 30, 
    borderRadius: 20, 
    alignItems: 'center',
    elevation: 5
  },
  statValue: { fontSize: 48, fontWeight: 'bold', color: Colors.primary },
  statLabel: { fontSize: 16, color: Colors.gray },
  infoSection: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 10 },
  description: { fontSize: 16, color: Colors.gray, lineHeight: 24 }
});
