import * as Font from 'expo-font';

// Additional fonts to load lazily after app startup
const additionalFonts = {
  MontserratItalic: require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
  OpenSansItalic: require("../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf"),
  RalewayItalic: require("../assets/fonts/Raleway-Italic-VariableFont_wght.ttf"),
  Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  SpaceMonoBoldItalic: require("../assets/fonts/SpaceMono-BoldItalic.ttf"),
  UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
  IndieFlower: require("../assets/fonts/IndieFlower-Regular.ttf"),
};

let additionalFontsLoaded = false;

export const loadAdditionalFonts = async (): Promise<void> => {
  if (additionalFontsLoaded) {
    return;
  }

  try {
    await Font.loadAsync(additionalFonts);
    additionalFontsLoaded = true;
    console.log('Additional fonts loaded successfully');
  } catch (error) {
    console.warn('Failed to load additional fonts:', error);
  }
};

export const areAdditionalFontsLoaded = (): boolean => {
  return additionalFontsLoaded;
};
