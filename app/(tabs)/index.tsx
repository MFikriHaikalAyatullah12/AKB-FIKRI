import { ScrollView, Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const users = [
  { id: '1', name: 'BASO HAMZAH' },
  { id: '2', name: 'M. FIKRI HAIKAL AYATULLAH' },
  { id: '3', name: 'MUH. ILHAM AKBAR' },
  { id: '4', name: 'ALIEF RYANTO RAHMAN' },
  { id: '5', name: 'FIKRAH LEJAHTEGIS' },
  { id: '6', name: 'MUH. DIRHAM RAHIM' },
  { id: '7', name: 'MUH. AKBAR HAERUDDIN' },
  { id: '8', name: 'AHMAD FAUZAN' },
  { id: '9', name: 'SYAUQIAH MUJAHIDAH YAHYA' },
  { id: '10', name: 'AZZAH AULIA SYARIF' },
];

export default function HomePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>
        <Ionicons name="people-circle" size={28} color="#3a7bd5" />{' '}
        <Text style={styles.headerText}>Daftar Mahasiswa</Text>
      </Text>

      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => router.push(`/user/${user.id}`)}
          style={styles.card}
          activeOpacity={0.85}
        >
          <Ionicons
            name="person-circle-outline"
            size={36}
            color="#4a90e2"
            style={styles.icon}
          />
          <Text style={styles.nameText}>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#eef5ff',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#3a7bd5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3a7bd5',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    marginRight: 14,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2b2d42',
    flexShrink: 1,
  },
});
