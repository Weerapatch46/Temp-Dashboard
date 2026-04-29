import React from 'react';
import { Tabs, Link, usePathname } from 'expo-router';
import { useWindowDimensions, View, StyleSheet, Pressable, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

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
            <Image
              source={require('@/assets/images/bu-removebg-preview.png')}
              style={{ width: 40, height: 24 }}
            />
            <ThemedText style={{ color: colorScheme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Air </ThemedText>
            <ThemedText style={{ color: '#FF6984', fontWeight: 'bold' }}>Quality</ThemedText>
          </ThemedText>

          <Link href="/data" asChild>
            <Pressable
              style={{
                ...styles.sidebarItem,
                ...(isActive('data') ? styles.activeItem : {}),
              }}
            >
              <AntDesign
                name="info-circle"
                size={20}
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
              <AntDesign
                name="line-chart"
                size={20}
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

          <Link href="/setting" asChild>
            <Pressable
              style={{
                ...styles.sidebarItem,
                ...(isActive('setting') ? styles.activeItem : {}),
              }}
            >
              <Feather
                name="settings"
                size={20}
                color={isActive('setting') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b')}
              />
              <ThemedText
                style={{
                  color: isActive('setting') ? '#007AFF' : (colorScheme === 'dark' ? '#fff' : '#3b3b3b'),
                  ...(isActive('setting') ? styles.activeText : {}),
                }}
              >
                Settings
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
            <Tabs.Screen name="setting" />
          </Tabs>
        </View>
      </ThemedView>
    );
  }

  // MOBILE 
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
        }
      }}>
      <Tabs.Screen
        name="data"
        options={{
          title: 'Data',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image
                source={require('@/assets/images/bu-removebg-preview.png')}
                style={{ width: 24, height: 24 }}
              />
              <ThemedText style={{ color: colorScheme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Air</ThemedText>
              <ThemedText style={{ color: '#FF6984', fontWeight: 'bold' }}>Quality</ThemedText>
            </View>
          ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <AntDesign name="info-circle" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: 'Graph',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image
                source={require('@/assets/images/bu-removebg-preview.png')}
                style={{ width: 24, height: 24 }}
              />
              <ThemedText style={{ color: colorScheme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Air</ThemedText>
              <ThemedText style={{ color: '#FF6984', fontWeight: 'bold' }}>Quality</ThemedText>
            </View>
          ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <AntDesign name="bar-chart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image
                source={require('@/assets/images/bu-removebg-preview.png')}
                style={{ width: 24, height: 24 }}
              />
              <ThemedText style={{ color: colorScheme === 'dark' ? '#ffffff' : '#000000', fontWeight: 'bold' }}>Air</ThemedText>
              <ThemedText style={{ color: '#FF6984', fontWeight: 'bold' }}>Quality</ThemedText>
            </View>
          ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <Feather name="settings" size={28} color={color} />,
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