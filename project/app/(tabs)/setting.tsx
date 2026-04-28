import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function SettingScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      {isDesktop ? (
        <ThemedText type="title" style={styles.titleContainerDesktop}>
          Content Setting for Desktop
        </ThemedText>
      ) : (
        <ThemedText type="title" style={styles.titleContainerMobile}>
          Content Setting for Mobile
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainerDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  titleContainerMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
    fontSize: 24,
  },
});
