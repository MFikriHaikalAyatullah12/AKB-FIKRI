import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { AuthGuard } from "../../components/AuthGuard";

export default function TabLayout() {
  return (
    <AuthGuard>
      <Tabs 
        screenOptions={{ 
          tabBarActiveTintColor: "#FF6B6B",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E5EA',
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            paddingTop: 8,
            height: Platform.OS === 'ios' ? 80 : 70,
            elevation: 8,
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: -2,
            marginBottom: 3,
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
      {/* Hide all other tabs - only show 5 main tabs */}
      <Tabs.Screen name="cart" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="trends" options={{ href: null }} />
      <Tabs.Screen name="reviews" options={{ href: null }} />
      <Tabs.Screen name="index-new" options={{ href: null }} />
      <Tabs.Screen name="search-new" options={{ href: null }} />
      <Tabs.Screen name="cart-backup" options={{ href: null }} />
      <Tabs.Screen name="about-backup" options={{ href: null }} />
      <Tabs.Screen name="index-backup" options={{ href: null }} />
      <Tabs.Screen name="profil-backup" options={{ href: null }} />
      <Tabs.Screen name="search-backup" options={{ href: null }} />
      <Tabs.Screen name="profile-new" options={{ href: null }} />
      <Tabs.Screen name="about-new" options={{ href: null }} />
      <Tabs.Screen name="cart-new-backup" options={{ href: null }} />
      <Tabs.Screen name="categories" options={{ href: null }} />
      <Tabs.Screen name="categories/[id]" options={{ href: null }} />
      <Tabs.Screen name="featured/[id]" options={{ href: null }} />
      <Tabs.Screen name="user/[id]" options={{ href: null }} />
      <Tabs.Screen name="user/[id]-backup" options={{ href: null }} />

      {/* Essential tabs for e-commerce app - only these 5 will show */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          )
        }}
      />
      
      <Tabs.Screen
        name="about"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons 
              name="category" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="featured"
        options={{
          title: "Featured",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "star" : "star-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart-new"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      </Tabs>
    </AuthGuard>
  );
}
