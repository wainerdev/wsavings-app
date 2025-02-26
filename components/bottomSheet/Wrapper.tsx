import { StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';

type Props = {
  children: React.ReactNode;
}

const BACKGROUND_COLOR = { light: '#D0D0D0', dark: '#353636' }

export default function ButtonSheetWrapper({ children }: Props) {
   const colorScheme = useColorScheme() ?? 'light';
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        { backgroundColor: BACKGROUND_COLOR[colorScheme] },
      ]}  
    >
      <BottomSheetModalProvider>
        {children}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
