# 🔍 TROUBLESHOOTING: Port Status Tidak Muncul di Terminal

## ✅ **STATUS SAAT INI (WORKING):**

Terminal sekarang menampilkan:
```
› Metro waiting on exp://zqndyhs-fikrimberr-8081.exp.direct
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
› Web is waiting on http://localhost:8081
```

## 🚨 **ALASAN PORT STATUS TIDAK MUNCUL SEBELUMNYA:**

### **1. Proses Expo Tidak Berjalan**
```bash
# Check jika expo running
ps aux | grep expo
# Jika kosong = tidak ada proses expo
```

### **2. Terminal Background Process**
```bash
# Jika dijalankan dengan &
npx expo start --tunnel &
# Status tidak terlihat karena di background
```

### **3. Cache Issues**
```bash
# Cache corrupt bisa menyebabkan hang
rm -rf .expo
rm -rf node_modules/.cache
```

### **4. Port Conflict**
```bash
# Port sudah digunakan proses lain
lsof -i :8081
# Akan tampil proses yang menggunakan port
```

## 📋 **CARA MEMASTIKAN STATUS PORT MUNCUL:**

### **Method 1: Foreground Process (Recommended)**
```bash
cd /workspaces/AKB-FIKRI
npx expo start --tunnel --clear
# Akan tampil status di terminal
```

### **Method 2: Verbose Output**
```bash
cd /workspaces/AKB-FIKRI
npx expo start --tunnel --clear --verbose
# Lebih banyak informasi debug
```

### **Method 3: Check Port Manually**
```bash
# Cek port yang digunakan
lsof -i :8081
lsof -i :8082

# Cek proses expo
ps aux | grep expo
```

## 🎯 **OUTPUT YANG NORMAL (HARUS MUNCUL):**

### **Starting Phase:**
```
Starting project at /workspaces/AKB-FIKRI
Starting Metro Bundler
Tunnel connected.
Tunnel ready.
```

### **Ready Phase:**
```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █   █▄▄▀▄ ▀▀▀██ ▄▄▄▄▄ █
[QR CODE]

› Metro waiting on exp://xxxxx-8081.exp.direct
› Web is waiting on http://localhost:8081
```

### **Interactive Commands:**
```
› Press a │ open Android
› Press w │ open web
› Press j │ open debugger
› Press r │ reload app
```

## 🔧 **TROUBLESHOOTING COMMANDS:**

### **If No Status Shown:**
```bash
# 1. Kill all processes
pkill -f expo
pkill -f metro
pkill -f node

# 2. Clear cache
cd /workspaces/AKB-FIKRI
rm -rf .expo
rm -rf node_modules/.cache

# 3. Restart fresh
npx expo start --tunnel --clear
```

### **If Port Conflict:**
```bash
# Use different port
npx expo start --tunnel --port 8082 --clear
npx expo start --tunnel --port 8083 --clear
```

### **If Network Issues:**
```bash
# Try LAN instead of tunnel
npx expo start --lan --clear

# Try localhost only
npx expo start --localhost --clear
```

## 📊 **EXPECTED TIMELINE:**

| Stage | Duration | What Should Show |
|-------|----------|------------------|
| Starting | 5-10s | "Starting project..." |
| Metro | 10-30s | "Starting Metro Bundler" |
| Tunnel | 5-15s | "Tunnel connected" |
| Ready | 0s | QR Code + Status |

## 🚨 **RED FLAGS (Something Wrong):**

### **❌ No Output After 60s**
```bash
# Stuck or crashed
Ctrl+C
# Restart dengan:
npx expo start --tunnel --clear --verbose
```

### **❌ "Port in use" Error**
```bash
# Find what's using port
lsof -i :8081
# Kill process or use different port
```

### **❌ "Network Error" Messages**
```bash
# Check network connectivity
# Try LAN mode instead of tunnel
```

## ✅ **CURRENT WORKING STATUS:**

**🟢 Port**: 8081
**🟢 Tunnel**: `exp://zqndyhs-fikrimberr-8081.exp.direct`
**🟢 Web**: `http://localhost:8081`
**🟢 QR Code**: Visible in terminal
**🟢 Interactive Commands**: Available

## 🎯 **NEXT ACTIONS:**

1. **✅ Status sudah muncul** - Terminal showing port info
2. **✅ QR Code visible** - Ready untuk di-scan
3. **✅ Web URL available** - `http://localhost:8081`
4. **✅ Interactive commands** - Press 'w' untuk web, 'a' untuk Android

---

**🎉 MASALAH SOLVED! Status port sekarang sudah muncul dengan jelas di terminal.**

**Scan QR code atau buka web di `http://localhost:8081` untuk test aplikasi!**
