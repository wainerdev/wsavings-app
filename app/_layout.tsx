import "react-native-reanimated";
import "react-native-gesture-handler";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "@/store";
import LayoutProtector from "@/components/middleware/LayoutProtector";
import { PaperProvider } from "react-native-paper";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import merge from "deepmerge";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
// const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

function RootLayoutNav() {
  const { colorScheme } = useTheme();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  console.log("paper", paperTheme);
  console.log("navigation", NavigationDarkTheme);

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme as unknown as Theme}>
        <Provider store={store}>
          <LayoutProtector>
            <Stack>
              <Stack.Screen
                name="(public)"
                options={{ title: "Welcome", headerShown: false }}
              />
              <Stack.Screen
                name="(private)"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ title: "Not Found" }}
              />
            </Stack>
          </LayoutProtector>
          <StatusBar style="auto" />
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
