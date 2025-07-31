import { View, Text, StyleSheet, Image } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Animatable.Text 
        animation="fadeInDown" 
        delay={200} 
        style={styles.title}
      >
        Profil Pengguna
      </Animatable.Text>

      <Animatable.View 
        animation="fadeInUp" 
        delay={400} 
        style={styles.profileCard}
      >
        <Image 
          source={require('../../assets/images/images1.jpeg')} // Gambar lokal
          style={styles.profileImage}
        />
        <Text style={styles.name}>M. FIKRI HAIKAL AYATULLAH</Text>
        <Text style={styles.detail}>Kelas: <Text style={styles.bold}>6B</Text></Text>
        <Text style={styles.detail}>NIM: <Text style={styles.bold}>105841105522</Text></Text>
        <Text style={styles.detail}>Prodi: <Text style={styles.bold}>Informatika</Text></Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0faff', // warna jarang dipakai tapi keren
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e3a59',
    marginBottom: 24,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#e6f7ff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#a5d8ff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#9bd0ff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e3a59',
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    color: '#44566c',
    marginVertical: 4,
  },
  bold: {
    fontWeight: '600',
    color: '#1e293b',
  },
});
