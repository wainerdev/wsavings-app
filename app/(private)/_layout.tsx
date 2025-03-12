import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Icon } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        sceneStyle: {
          // backgroundColor: 'red',
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon source="home" color={color} size={32} />,
        }}
      />
       <Tabs.Screen
        name="categories"
        options={{
          title: 'categories',
          tabBarIcon: ({ color }) => <Icon source="fruit-cherries" color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon source="account" color={color} size={32} />,
        }}
      />
    </Tabs>
  );
}
