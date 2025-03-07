import React from "react";
import { useGetProfileQuery } from "@/services/wsavingsAPI";
import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

import { StyleSheet } from "react-native";

export default function BannerProfile() {
  const { data, isLoading } = useGetProfileQuery({});
  return (
    <MotiView
      style={styles.wrapper}
      transition={{
        type: "timing",
      }}
    >
      <View style={styles.container}>
        <View style={styles.profile}>
          <View>
            <Text variant="titleMedium">
              Hi,{" "}
              {isLoading ? (
                <Skeleton width={100} height={14} />
              ) : (
                data?.user.fullName
              )}
            </Text>
            <Text variant="bodyLarge">
              Balance:{" "}
              {isLoading ? <Skeleton width={100} height={14} /> : `${data?.user.balance}k`}
            </Text>
          </View>
          <Avatar.Image
            size={34}
            source={require("../assets/images/react-logo.png")}
          />
        </View>
        <Text variant="labelLarge">Let's make this day productive</Text>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    color: "red",
    padding: 16,
    borderRadius: 8,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
