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
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjY4-6TSlZb2TSrsNxBlZihAQ8im3Xqa5wQ&s' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>M. FIKRI HAIKAL AYATULLAH</Text>
        <Text style={styles.detail}>Kelas: <Text style={styles.bold}>6B</Text></Text>
        <Text style={styles.detail}>NIM: <Text style={styles.bold}>105841105522</Text></Text>
        <Text style={styles.detail}>Prodi: <Text style={styles.bold}>Informatika</Text></Text>
        <Text style={styles.detail}>Fakultas: <Text style={styles.bold}>TEKNIK</Text></Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3e3a61',
    marginBottom: 24,
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#ffe0f0',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#cc7ea6',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#d4a5a5',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3e3a61',
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    color: '#5b5f74',
    marginVertical: 4,
  },
  bold: {
    fontWeight: '600',
    color: '#2a2d34',
  },
});
