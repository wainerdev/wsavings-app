import { Button, Text } from "react-native-paper";
import { StyleSheet, View, Appearance } from "react-native";
import { useGetProfileQuery } from "@/services/wsavingsAPI";
import { useTheme } from "@/hooks/useTheme";

export default function TabSettings() {
  const { data, isLoading } = useGetProfileQuery({});
  const { toggleTheme, colorScheme } = useTheme();

  console.log("data is", data);

  return (
    <View style={styles.wrapper}>
      <Text>Full Name: {data?.user.fullName}</Text>
      <Text>Email: {data?.user.email}</Text>
      <Text>{colorScheme}</Text>
      <Button onPress={toggleTheme}>Light</Button>
      <Button onPress={() => Appearance.setColorScheme('dark')}>Dark</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
