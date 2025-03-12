import {
  Avatar,
  Card,
  Divider,
  Icon,
  IconButton,
  Text,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useGetProfileQuery, useSignOutMutation } from "@/services/wsavingsAPI";
import { Box } from "@/components/ui/Box";
import { useTheme } from "@/hooks/useTheme";
import { SkeletonWrapper, Skeleton } from "@/components/ui/Skeleton";
import { useEffect } from "react";
import { Redirect } from "expo-router";
import { router } from "expo-router";

export default function TabProfile() {
  const { toggleTheme, colorScheme } = useTheme();
  const { data, isLoading: isGetProfileLoading } = useGetProfileQuery({});
  const [signOut, { isLoading: isSignOutLoading, isSuccess }] =
    useSignOutMutation({});

  const isLoading = isGetProfileLoading || isSignOutLoading;

  const sections = [
    {
      name: "Config",
      items: [
        {
          name: "Dark Mode",
          leftIcon: "theme-light-dark",
          rightIcon:
            colorScheme === "light"
              ? "toggle-switch-off-outline"
              : "toggle-switch",
          action: () => toggleTheme(),
        },
      ],
    },
    {
      name: "Money",
      items: [
        {
          name: "Currency",
          leftIcon: "cash",
          rightIcon: "plus",
          action: () => {},
        },
      ],
    },
    {
      name: "Account",
      items: [
        {
          name: "Logout",
          leftIcon: "logout",
          rightIcon: "chevron-right",
          action: () => signOut({}),
        },
        {
          name: "Change Password",
          leftIcon: "lock",
          rightIcon: "chevron-right",
          action: () => {},
        }
      ],
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(public)");
    }
  }, [isSuccess]);

  console.log("data is", data);

  return (
    <Box style={styles.wrapper}>
      <SkeletonWrapper
        transition={{
          type: "timing",
          backgroundColor: {
            duration: 500,
          },
        }}
      >
        <View>
          {isGetProfileLoading ? (
            <Skeleton width={200} height={30} />
          ) : (
            <Text variant="titleLarge">Profile</Text>
          )}
        </View>
        <Card style={styles.profileCard}>
          <View style={styles.profileCardFlex}>
            <Avatar.Image
              size={64}
              source={require("../../assets/images/react-logo.png")}
            />
            <View style={styles.profileCardText}>
              {isGetProfileLoading ? (
                <Skeleton width={200} height={20} />
              ) : (
                <>
                  <Text variant="titleLarge">{data?.user.fullName}</Text>
                </>
              )}
              {isGetProfileLoading ? (
                <Skeleton width={200} height={20} />
              ) : (
                <>
                  <Text variant="titleSmall">{data?.user.email}</Text>
                </>
              )}
            </View>
          </View>
        </Card>
      </SkeletonWrapper>
      {sections.map((section) => (
        <View style={styles.section}>
          <Text variant="bodyLarge">{section.name}</Text>
          <Card style={styles.section}>
            {section.items.map((item, idx) => (
              <>
                <Box>
                  <View style={styles.sectionItem}>
                    <View style={styles.sectionItemText}>
                      <View style={styles.sectionItemIcon}>
                        <Icon source={item.leftIcon} size={20} />
                      </View>
                      <Text variant="bodyMedium">{item.name}</Text>
                    </View>
                    <IconButton
                      disabled={isLoading}
                      icon={item.rightIcon}
                      onPress={item.action}
                    />
                  </View>
                </Box>
                {idx !== section.items.length - 1 && <Divider />}
              </>
            ))}
          </Card>
        </View>
      ))}
    </Box>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  profileCard: {
    marginTop: 12,
    padding: 12,
  },
  profileCardFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileCardText: {
    marginLeft: 16,
    gap: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionItemText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionItemIcon: {
    marginRight: 8,
  },
});
