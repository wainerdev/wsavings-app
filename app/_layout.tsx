import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@/store";
import LayoutProtector from "@/components/middleware/LayoutProtector";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";

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

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
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
      {/* </ThemeProvider> */}
    </PaperProvider>
  );
}
