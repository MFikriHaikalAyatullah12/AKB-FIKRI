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
          Aplikasi ini dibangun menggunakan React Native dan Expo.
          {"\n\n"}
          <Text style={styles.subtitle}>Apa itu React Native?</Text>
          React Native adalah framework open-source yang dikembangkan oleh Meta (Facebook) untuk membangun aplikasi mobile lintas platform, yaitu Android dan iOS, hanya dengan satu basis kode JavaScript. React Native memungkinkan pengembang menggunakan komponen native dan API perangkat secara langsung dengan performa yang hampir setara aplikasi native.
          {"\n\n"}
          <Text style={styles.subtitle}>Apa itu Expo?</Text>
          Expo adalah platform dan toolchain untuk mempermudah pengembangan aplikasi menggunakan React Native. Dengan Expo, developer dapat membangun, menjalankan, dan menguji aplikasi secara cepat tanpa perlu mengatur konfigurasi native yang kompleks. Expo menyediakan fitur seperti live reload, publish ke Expo Go, akses kamera, lokasi, media, dan banyak lagi hanya dengan sedikit konfigurasi.
          {"\n\n"}
          Kombinasi React Native dan Expo sangat ideal untuk membuat aplikasi mobile modern dengan proses pengembangan yang efisien dan cepat.
        </Text>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d6f5d6', // pastel hijau mint
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#cabbe9', // ungu lavender soft
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
