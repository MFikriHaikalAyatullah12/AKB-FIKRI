import { Image, StyleSheet, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function ProfileNew() {
  return (
    <View style={styles.container}>
      <Animatable.Text 
        animation="fadeInDown" 
        delay={200} 
        style={styles.title}
      >
        Profil Kelompok
      </Animatable.Text>

      <Animatable.View 
        animation="fadeInUp" 
        delay={400} 
        style={styles.profileCard}
      >
        <Image 
          source={require('../../assets/images/images1.jpeg')} 
          style={styles.profileImage}
        />
        
        <View style={styles.biodataSection}>
          <Text style={styles.sectionTitle}>PROJECT:</Text>
          <Text style={styles.detail}>KELOMPOK AKB</Text>
          
          <Text style={styles.sectionTitle}>ANGGOTA KELOMPOK:</Text>
          <Text style={styles.detail}>• DIRHAM</Text>
          <Text style={styles.detail}>• SYAUQIAH</Text>
          <Text style={styles.detail}>• FIKRI</Text>
          
          <Text style={styles.sectionTitle}>INFORMASI TAMBAHAN:</Text>
          <Text style={styles.detail}>TUGAS APLIKASI SHOP LAB AKB</Text>
          
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
    // @ts-ignore - textShadow properties are deprecated but still functional
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileCard: {
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    boxShadow: '0 6px 12px rgba(255, 71, 87, 0.25)',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#ff6b6b',
    resizeMode: 'cover',
  },
  biodataSection: {
    width: '100%',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4757',
    marginTop: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  detail: {
    fontSize: 16,
    color: '#2f3542',
    marginVertical: 2,
    lineHeight: 22,
  },
  extraInfo: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#ffe0e0',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  extraTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4757',
    marginBottom: 8,
  },
  extraDetail: {
    fontSize: 14,
    color: '#57606f',
    lineHeight: 20,
    textAlign: 'justify',
  },
});
