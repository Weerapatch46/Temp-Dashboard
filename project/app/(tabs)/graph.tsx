import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

export default function GraphScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [isOpenTemperature, setIsOpenTemperature] = useState(false);

  const [tempData, setTempData] = useState([25, 26, 25, 27, 28, 30]);
  const [labels, setLabels] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * (35 - 15 + 1)) + 15;

      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setTempData((prev) => {
        const updated = [...prev, newTemp];
        return updated.slice(-6); // เก็บข้อมูลไว้แค่ 6 จุดล่าสุด
      });

      setLabels((prev) => {
        const updated = [...prev, timeString];
        return updated.slice(-6); 
      });
    }, 2000);

    return () => clearInterval(interval); 
  }, []);

  // 3. กำหนดสีเส้นตามอุณหภูมิล่าสุด
  const latestTemp = tempData[tempData.length - 1];
  const getLineColor = (temp: number) => {
    if (temp >= 30) return `rgba(255, 67, 54, 1)`;   
    if (temp >= 20) return `rgba(76, 175, 80, 1)`;   
    return `rgba(33, 150, 243, 1)`;                 
  };

  const chartData = {
    labels: labels,
    datasets: [{
      data: tempData,
      color: (opacity = 1) => getLineColor(latestTemp),
      strokeWidth: 2
    }],
  };

  return (
    <ScrollView style={styles.container}>
      {!isDesktop && (
        <View style={[styles.menuMobile, { marginTop: 10 }]}>
          <TouchableOpacity
            style={styles.menuMobileButton}
            onPress={() => setIsOpenTemperature(!isOpenTemperature)}
            activeOpacity={0.7}
          >
            <View style={styles.menuMobileHeader}>
              <Image source={require('@/assets/images/temperature.png')} style={{ width: 24, height: 24 }} />
              <ThemedText style={styles.menuMobileTitle}>Temperature</ThemedText>
            </View>
            <AntDesign name={isOpenTemperature ? 'up' : 'down'} size={16} color="#3b3b3b" />
          </TouchableOpacity>

          {isOpenTemperature && (
            <View style={styles.menuMobileContent}>
              <LineChart
                data={chartData}
                width={width - 60}
                height={220}
                formatXLabel={(label) => {
                  const isLastLabel = label === labels[labels.length - 1];
                  return isLastLabel ? label : ""; 
                }}
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => getLineColor(latestTemp),
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForLabels: {
                    fontSize: 10,
                  },

                  fillShadowGradientFrom: getLineColor(latestTemp),
                  fillShadowGradientTo: "#ffffff",
                  fillShadowGradientOpacity: 0.2,
                }}
                bezier
                style={{ borderRadius: 16, marginVertical: 8 }}
              />
              <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                อุณหภูมิล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getLineColor(latestTemp) }}>{latestTemp}°C</ThemedText>
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  menuMobile: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
    overflow: 'hidden'
  },
  menuMobileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.02)'
  },
  menuMobileHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuMobileTitle: { fontSize: 16, fontWeight: '600' },
  menuMobileContent: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    alignItems: 'center'
  }
});