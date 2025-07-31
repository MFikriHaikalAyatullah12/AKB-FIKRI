import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

// Efek samping untuk splash screen harus di dalam useEffect
export default function RootLayout() {
  const [loaded, error] = useFonts({
    // 5 Font Statis
    MontserratItalic: require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    OpenSansItalic: require("../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf"),
    OpenSansVariable: require("../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    RalewayItalic: require("../assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),

    // 5 Font Dinamis
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    SpaceMonoBoldItalic: require("../assets/fonts/SpaceMono-BoldItalic.ttf"),
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    IndieFlower: require("../assets/fonts/IndieFlower-Regular.ttf"),
    RobotoVariable: require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }

      if (loaded && !error) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  // return (
  //   <Stack
  //     screenOptions={{
  //       header: ({ navigation }) => (
  //         <View
  //           style={{
  //             height: 60,
  //             backgroundColor: "#f8f8f8",
  //             justifyContent: "center",
  //             alignItems: "flex-start",
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               width: 60,
  //               marginLeft: 10,
  //             }}
  //             onPress={() => navigation.navigate("index")} // atau sesuaikan nama route-nya
  //           >
  //             <Entypo name="home" size={24} color="black" />
  //           </TouchableOpacity>
  //         </View>
  //       ),
  //     }}
  //   />
  // );

  return(
    <Stack>
      <Stack.Screen
        name= "(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
