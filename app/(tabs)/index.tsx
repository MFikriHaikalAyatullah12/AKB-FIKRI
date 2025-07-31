import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function TabIndex() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View 
        animation="zoomInUp" 
        delay={200} 
        duration={800}
        style={styles.card}
      >
        <Image 
          source={{ uri: 'https://news.unismuh.ac.id/wp-content/uploads/2023/04/51231776_108783916909288_5111860601001345024_n.jpg' }} 
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>Universitas Muhammadiyah Makassar</Text>
        <Text style={styles.description}>
          Universitas Muhammadiyah Makassar (Unismuh Makassar) adalah salah satu perguruan tinggi swasta terkemuka di Indonesia Timur. Didirikan pada tahun 1963, kampus ini berada di bawah naungan Persyarikatan Muhammadiyah dan menjunjung tinggi nilai-nilai Islam dalam pengembangan ilmu pengetahuan.
          {"\n\n"}
          Unismuh Makassar memiliki visi untuk menjadi universitas yang unggul, modern, dan Islami dalam membentuk generasi yang cerdas, berintegritas, serta berakhlak mulia. Dengan mengusung moto “Ilmu Amaliah, Amal Ilmiah, Akhlakul Karimah”, Unismuh terus berinovasi dalam bidang pendidikan, penelitian, dan pengabdian kepada masyarakat.
          {"\n\n"}
          Lingkungan kampus yang religius, disiplin, serta didukung fasilitas yang lengkap menjadikan Unismuh sebagai pilihan strategis untuk menempuh pendidikan tinggi yang berkualitas dan berlandaskan nilai-nilai keislaman.
        </Text>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f7fa', // Soft cyan (unik & cerah)
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fce4ec', // Pink pastel lembut
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#5e60ce',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    width: '100%',
    maxWidth: 380,
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 14,
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5e60ce', // Indigo elegan
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#3a3a3c',
    textAlign: 'justify',
    lineHeight: 24,
  },
});
