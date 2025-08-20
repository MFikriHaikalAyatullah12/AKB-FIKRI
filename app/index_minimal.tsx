import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ULTRA MINIMAL TEST SCREEN
export default function MinimalTestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 SUCCESS!</Text>
      <Text style={styles.subtitle}>App is working!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.buttonText}>Go to Main App</Text>
      </TouchableOpacity>
      
      <Text style={styles.debug}>
        If you see this, the app loaded successfully!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B6B',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debug: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
