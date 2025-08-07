import { useLocalSearchParams, router } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const users = [
  { id: '1', name: 'BASO HAMZAH', nim: '105841106922' },
  { id: '2', name: 'M. FIKRI HAIKAL AYATULLAH', nim: '105841105522' },
  { id: '3', name: 'MUH. ILHAM AKBAR', nim: '105841105822' },
  { id: '4', name: 'ALIEF RYANTO RAHMAN', nim: '105841104222' },
  { id: '5', name: 'FIKRAH LEJAHTEGIS', nim: '105841105322' },
  { id: '6', name: 'MUH. DIRHAM RAHIM', nim: '105841105622' },
  { id: '7', name: 'MUH. AKBAR HAERUDDIN', nim: '105841104622' },
  { id: '8', name: 'AHMAD FAUZAN', nim: '105841107522' },
  { id: '9', name: 'SYAUQIAH MUJAHIDAH YAHYA', nim: '105841105122' },
  { id: '10', name: 'AZZAH AULIA SYARIF', nim: '105841105022' },
];

export default function UserPage() {
  const { id } = useLocalSearchParams();
  const user = useMemo(() => users.find(user => user.id === id), [id]);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: '#888' }}>Mahasiswa tidak ditemukan</Text>
      </View>
    );
  }

  const photoUrl = `https://simak.unismuh.ac.id/upload/mahasiswa/${user.nim}_.jpg`;

  return (
    <LinearGradient colors={['#dfefff', '#ffffff']} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#3a7bd5" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      <Animatable.View animation="fadeInUp" delay={200} duration={600} style={styles.card}>
        <Image source={{ uri: photoUrl }} style={styles.image} />
        <View style={styles.infoBox}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.nim}>NIM: {user.nim}</Text>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef5fc',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#eef3ff',
    padding: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3a7bd5',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: 160,
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  infoBox: {
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2b2d42',
    textAlign: 'center',
  },
  nim: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
});
