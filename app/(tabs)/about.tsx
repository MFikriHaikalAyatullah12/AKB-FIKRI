import { Text, View, ScrollView, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Octicons } from '@expo/vector-icons';

export default function TabIndex() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View 
        animation="bounceInUp" 
        delay={150} 
        duration={900}
        style={styles.card}
      >
        <View style={styles.titleContainer}>
          <Octicons name="info" size={24} color="#4a148c" style={styles.icon} />
          <Text style={styles.title}>Tentang Aplikasi</Text>
        </View>

        <Text style={styles.description}>
          Aplikasi ini dibuat untuk memenuhi tugas mata kuliah Pengembangan Aplikasi Mobile yang diberikan oleh dosen pengampu. Tujuannya adalah agar mahasiswa dapat memahami praktik langsung dalam membangun aplikasi mobile menggunakan teknologi modern seperti React Native dan Expo.

          {"\n\n"}
          <Text style={styles.subtitle}>Fungsi dari Masing-Masing Halaman:</Text>
          {"\n\n"}
          <Text style={styles.subtitle}>• Home:</Text> Menyajikan informasi umum tentang Universitas Muhammadiyah Makassar, sebagai kampus tempat pengembangan aplikasi ini dilakukan.
          
          {"\n\n"}
          <Text style={styles.subtitle}>• About:</Text> Menjelaskan secara detail mengenai tujuan pembuatan aplikasi, teknologi yang digunakan (React Native dan Expo), serta struktur dan fungsi dari setiap halaman dalam aplikasi.
          
          {"\n\n"}
          <Text style={styles.subtitle}>• Profil:</Text> Menampilkan data pengguna seperti nama lengkap, NIM, kelas, program studi, fakultas, dan departemen sebagai simulasi fitur data diri dalam aplikasi.

          {"\n\n"}
          Dengan membangun aplikasi ini, mahasiswa diharapkan mampu menerapkan teori yang dipelajari di kelas ke dalam proyek nyata berbasis React Native dan memahami proses kerja pembuatan aplikasi lintas platform secara praktis dan efisien.
        </Text>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d6f5d6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#cabbe9',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxWidth: 390,
    elevation: 5,
    shadowColor: '#00bcd4',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  subtitle: {
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  description: {
    fontSize: 15,
    color: '#222222',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
