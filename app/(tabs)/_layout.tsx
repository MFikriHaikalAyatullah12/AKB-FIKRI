import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
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
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
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
      {/* Hidden screens - not displayed in tab bar */}
      <Tabs.Screen 
        name="categories/[id]" 
        options={{
          title: "Category Details",
          href: null,
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
        name="featured/[id]" 
        options={{
          title: "Featured Details",
          href: null,
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
        name="user/[id]" 
        options={{
          title: "User Details",
          href: null,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen 
        name="search" 
        options={{
          title: "Search Results",
          href: null 
        }}
      />
      
      <Tabs.Screen 
        name="trends" 
        options={{
          title: "Trending Items",
          href: null 
        }}
      />
      
      <Tabs.Screen 
        name="cart" 
        options={{
          title: "Shopping Cart",
          href: null 
        }}
      />
      
      <Tabs.Screen 
        name="profil" 
        options={{
          title: "User Profile",
          href: null 
        }}
      />

      {/* Visible tabs with improved icons and functionality */}
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
          ),
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
        name="profile-new"
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
  );
}
