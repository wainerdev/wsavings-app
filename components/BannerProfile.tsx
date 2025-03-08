import React from "react";
import { useGetProfileQuery } from "@/services/wsavingsAPI";
import { View } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { useTheme } from "react-native-paper";

import { StyleSheet } from "react-native";

export default function BannerProfile() {
  const theme = useTheme();
  const { data, isLoading } = useGetProfileQuery({});
  return (
    <MotiView
      style={styles.wrapper}
      transition={{
        type: "timing",
      }}
    >
      <Card
        style={[
          styles.container,
          { backgroundColor: theme.colors.elevation.level1 },
        ]}
      >
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
              {isLoading ? (
                <Skeleton width={100} height={14} />
              ) : (
                `${data?.user.balance}k`
              )}
            </Text>
          </View>
          <Avatar.Image
            size={34}
            source={require("../assets/images/react-logo.png")}
          />
        </View>
        <Text variant="labelLarge">Let's make this day productive</Text>
      </Card>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
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
