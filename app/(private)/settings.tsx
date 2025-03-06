import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useGetProfileQuery } from "@/services/wsavingsAPI";

export default function TabSettings() {
  const { data, isLoading } = useGetProfileQuery({});

  console.log("data is", data);

  return (
    <View style={styles.wrapper}>
      <Text>Full Name: {data?.user.fullName}</Text>
      <Text>Email: {data?.user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
