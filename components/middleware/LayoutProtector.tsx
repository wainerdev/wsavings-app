import React, { useEffect } from "react";
import { router } from "expo-router";
import { Text } from "react-native";
import { useGetProfileQuery } from "@/services/wsavingsAPI";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function LayoutProtector({ children }: Props) {
  const { isLoading } = useGetProfileQuery({});
  const { isInitialized, signedUser } = useSelector(
    ({ session }: RootState) => session 
  );

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
    return <Text>...Loading</Text>;
  }

  return children;
}
