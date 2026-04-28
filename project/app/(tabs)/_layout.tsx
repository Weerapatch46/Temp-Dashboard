import React from 'react';
import { Tabs, Link, usePathname } from 'expo-router';
import { useWindowDimensions, View, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const isDesktop = width >= 768;

  const isActive = (name: string) => pathname.includes(name);

  if (isDesktop) {
    return (
      <ThemedView style={styles.desktopContainer}>
        <View
          style={{
            ...styles.sidebar,
            borderRightColor: colorScheme === 'dark' ? '#333' : '#eee',
          }}
        >
          <ThemedText type="defaultSemiBold" style={styles.sidebarLogo}>
            Air Quality
          </ThemedText>

          <Link href="/data" asChild>
            <Pressable
              style={{
                ...styles.sidebarItem,
                ...(isActive('data') ? styles.activeItem : {}),
              }}
            >
              <IconSymbol
                name="house.fill"
                color={isActive('data') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b')}
              />
              <ThemedText
                style={{
                  color: isActive('data') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b'),
                  ...(isActive('data') ? styles.activeText : {}),
                }}
              >
                Data
              </ThemedText>
            </Pressable>
          </Link>

          <Link href="/graph" asChild>
            <Pressable
              style={{
                ...styles.sidebarItem,
                ...(isActive('graph') ? styles.activeItem : {}),
              }}
            >
              <IconSymbol
                name="paperplane.fill"
                color={isActive('graph') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b')}
              />
              <ThemedText
                style={{
                  color: isActive('graph') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b'),
                  ...(isActive('graph') ? styles.activeText : {}),
                }}
              >
                Graph
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        <View style={styles.mainContent}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' }
            }}
          >
            <Tabs.Screen name="data" />
            <Tabs.Screen name="graph" />
          </Tabs>
        </View>
      </ThemedView>
    );
  }

  // MOBILE 
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
      }}>
      <Tabs.Screen
        name="data"
        options={{
          title: 'Data',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: 'Graph',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    height: '100%',
    padding: 20,
    borderRightWidth: 1,
  },
  sidebarLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 12,
    marginVertical: 4,
  },
  activeItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
});