import { Image, StyleSheet, Platform, Button, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch } from '@/store';
import BannerProfile from '@/components/BannerProfile';

export default function HomeScreen() {
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    dispatch({ type: 'userAuth/signOut' })
  }
  return (
    <View>
      <BannerProfile></BannerProfile>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
