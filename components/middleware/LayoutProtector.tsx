import React, { useEffect, useMemo } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useGetProfileQuery } from "@/services/wsavingsAPI";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { MOTIVATIONAL_QUOTES } from "@/constants/Loading";

interface Props {
  children: React.ReactNode;
}


export default function LayoutProtector({ children }: Props) {
  const theme = useTheme();
  const { isLoading } = useGetProfileQuery({});
  const { isInitialized, signedUser } = useSelector(
    ({ session }: RootState) => session
  );

  const randomQuote = useMemo(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)], []);

  useEffect(() => {
    if (!isInitialized) return; // initial fetch is not done yet

    // if signed user changes validate if it is signed or not
    if (!signedUser) {
      router.replace("/(public)");
      return;
    }

    router.replace("/(private)");
  }, [signedUser, isInitialized]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <View>
          <ActivityIndicator animating={true} color={theme.colors.secondary} />
          <View style={{ marginTop: 12, marginBottom: 12 }}>
            <Text variant="bodyMedium">{randomQuote}</Text>
          </View>
        </View>
      </View>
    );
  }

  return children;
}
