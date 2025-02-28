import { Stack } from "expo-router";
export default function PublicLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Sign In", headerShown: false }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: "Sign Up", headerShown: false }}
      />
    </Stack>
  );
}
