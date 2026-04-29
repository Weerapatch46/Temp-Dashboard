import { StyleSheet, useWindowDimensions, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function SettingScreen() {
    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();
    const isDesktop = width >= 768;

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1c1e1f' : '#f5f5f5' }]}>
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
