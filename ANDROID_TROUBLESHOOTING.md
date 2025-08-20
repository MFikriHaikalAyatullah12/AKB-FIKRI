# 🔧 Android Build 100% Tapi Tidak Masuk - Troubleshooting Guide
#   cd /workspaces/AKB-FIKRI && npx expo start --clear --tunnel
## 🚨 Masalah yang Sering Terjadi

### 1. **App Crash Setelah Bundle Loading Selesai**
Build berhasil 100% tapi aplikasi crash atau stuck di splash screen.

### 2. **JavaScript Bundle Loading Issues**
Metro bundler berhasil tapi JavaScript tidak ter-load dengan benar.

### 3. **Network/Tunnel Connection Issues**
Aplikasi tidak bisa connect ke development server.

## 🛠️ Solusi Troubleshooting

### **Step 1: Clear All Cache & Restart**
```bash
# Stop semua proses
pkill -f expo
pkill -f metro

# Clear cache
cd /workspaces/AKB-FIKRI
npx expo start --clear --tunnel

# Atau gunakan reset cache yang lebih agresif
rm -rf node_modules/.cache
rm -rf .expo
npm run start:clear
```

### **Step 2: Check App Logs (PENTING)**
Di Expo Go:
1. **Shake device** untuk buka developer menu
2. Pilih **"Show Performance Monitor"**
3. Pilih **"Debug Remote JS"**
4. Check console untuk error messages

### **Step 3: Android-Specific Fixes**

#### **A. Check AndroidManifest.xml Issues**
```bash
# Check jika ada permission issues
cd /workspaces/AKB-FIKRI
npx expo config --type introspect
```

#### **B. Network Security Issues**
Tambah ke `app.json`:
```json
{
  "expo": {
    "android": {
      "usesCleartextTraffic": true,
      "networkSecurityConfig": "network_security_config"
    }
  }
}
```

#### **C. Memory Issues**
```json
{
  "expo": {
    "android": {
      "softwareKeyboardLayoutMode": "pan"
    }
  }
}
```

### **Step 4: Font Loading Issues (Paling Sering)**
Karena kita mengoptimasi font loading, kemungkinan ada masalah:

```bash
# Check if fonts are accessible
cd /workspaces/AKB-FIKRI
ls -la assets/fonts/
```

### **Step 5: JavaScript Bundle Issues**
```bash
# Start dengan mode yang lebih verbose
npx expo start --tunnel --max-workers 1 --reset-cache

# Atau coba tanpa optimasi
npx expo start --no-dev --minify
```

## 🔍 Debug Commands

### **1. Check Device Connection**
```bash
adb devices
adb logcat | grep -i expo
```

### **2. Check Metro Status**
```bash
curl http://localhost:8081/status
```

### **3. Check Bundle Loading**
```bash
curl http://localhost:8081/index.bundle?platform=android
```

## ⚡ Quick Fixes to Try

### **Fix 1: Restart Expo dengan Mode Aman**
```bash
cd /workspaces/AKB-FIKRI
npx expo start --tunnel --dev --clear
```

### **Fix 2: Bypass Font Optimization (Temporary)**
Edit `app/_layout.tsx`:
```tsx
// Temporarily disable font loading for testing
const [loaded, error] = useFonts({
  // Comment out all fonts temporarily
  // PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
});
```

### **Fix 3: Check AuthContext Loading**
Edit `context/AuthContext.tsx`:
```tsx
// Set immediate initialization for testing
const initializeAuth = async () => {
  dispatch({ type: 'AUTH_INITIALIZE', payload: { user: null, tokens: null } });
  // Skip all async operations temporarily
};
```

### **Fix 4: Simple Loading Test**
Edit `app/(tabs)/index.tsx`:
```tsx
// Bypass all loading logic for testing
const [isLoading, setIsLoading] = useState(false); // Change to false
```

## 🎯 Most Likely Solutions

### **1. Font Path Issues (90% kemungkinan)**
```bash
# Check font paths
cd /workspaces/AKB-FIKRI
find . -name "*.ttf" -type f
```

### **2. Bundle Loading Issues**
```bash
# Try different bundle strategy
npx expo start --tunnel --lan
```

### **3. Memory/Performance Issues**
```bash
# Reduce memory usage
npx expo start --tunnel --max-workers 2
```

## 🚨 Emergency Bypass

Jika masih tidak bisa, coba bypass semua optimasi:

```tsx
// app/_layout.tsx - Emergency mode
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

## 📱 Next Steps

1. **Coba satu solusi per waktu**
2. **Check logs setelah setiap perubahan**
3. **Test di device yang berbeda jika perlu**
4. **Report error message yang spesifik**
