import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  // Daftar gambar utama dan cadangan
  const mainImages = [
    "https://picsum.photos/id/10/300/300",
    "https://picsum.photos/id/11/300/300",
    "https://picsum.photos/id/12/300/300",
    "https://picsum.photos/id/13/300/300",
    "https://picsum.photos/id/14/300/300",
    "https://picsum.photos/id/15/300/300",
    "https://picsum.photos/id/16/300/300",
    "https://picsum.photos/id/17/300/300",
    "https://picsum.photos/id/18/300/300",
  ];

  const alternateImages = [
    "https://picsum.photos/id/19/300/300",
    "https://picsum.photos/id/20/300/300",
    "https://picsum.photos/id/21/300/300",
    "https://picsum.photos/id/22/300/300",
    "https://picsum.photos/id/23/300/300",
    "https://picsum.photos/id/24/300/300",
    "https://picsum.photos/id/25/300/300",
    "https://picsum.photos/id/26/300/300",
    "https://picsum.photos/id/27/300/300",
  ];

  // State untuk menyimpan gambar yang sedang aktif dan scale
  const [images, setImages] = useState(mainImages);
  const [scales, setScales] = useState(Array(9).fill(1));

  // Fungsi untuk menangani klik gambar
  const handleImagePress = (index: number) => {
    // Buat salinan array images dan scales
    const newImages = [...images];
    const newScales = [...scales];
    
    // Toggle antara gambar utama dan cadangan
    if (newImages[index] === mainImages[index]) {
      newImages[index] = alternateImages[index];
    } else {
      newImages[index] = mainImages[index];
    }
    
    // Update scale (maksimal 2x)
    if (newScales[index] < 2) {
      newScales[index] *= 1.2;
    } else {
      newScales[index] = 1; // Reset ke 1 jika sudah mencapai maksimal
    }
    
    // Update state
    setImages(newImages);
    setScales(newScales);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Segitiga di bagian atas */}
        <View style={styles.triangle} />

        {/* Bentuk Pil (Oval Horizontal) */}
        <View style={styles.pill}>
          <Text style={styles.pillText}>105841105522</Text>
        </View>

        {/* Persegi Panjang (Nama) */}
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>M. FIKRI HAIKAL AYATULLAH</Text>
        </View>

        {/* Lingkaran Dekoratif */}
        <View style={styles.circle} />
        
        {/* Container untuk kedua gambar berdampingan */}
        <View style={styles.imageRow}>
          {/* Gambar Profil */}
          <View style={styles.imageShadow}>
            <Image 
              style={styles.profileImage} 
              source={{ uri: "https://simak.unismuh.ac.id/upload/mahasiswa/105841105522_.jpg" }} 
            />
          </View>
          
          {/* Gambar Tambahan */}
          <View style={styles.imageShadow}>
            <Image 
              style={styles.profileImage} 
              source={{ uri: "https://tse2.mm.bing.net/th/id/OIP.N9gK5s6MwPBr2lCKz0EpFwAAAA?pid=Api&P=0&h=220" }} 
            />
          </View>
        </View>

        {/* Grid 3x3 */}
        <View style={styles.gridContainer}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.gridRow}>
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <TouchableOpacity 
                    key={col} 
                    onPress={() => handleImagePress(index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.gridItem}>
                      <Image 
                        style={[
                          styles.gridImage,
                          { transform: [{ scale: scales[index] }] }
                        ]} 
                        source={{ uri: images[index] }} 
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    gap: 30,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 60,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "orange",
  },
  pill: {
    backgroundColor: "blue",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pillText: {
    fontSize: 18, 
    color: "white", 
    fontWeight: "bold",
  },
  nameBox: {
    backgroundColor: "green",
    width: 220,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
  },
  imageShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "white",
  },
  gridContainer: {
    width: "90%",
    aspectRatio: 1,
    marginTop: 20,
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
  },
  gridItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});