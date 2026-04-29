import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View, Image, ScrollView, useColorScheme, Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

export default function GraphScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme();
  const [isOpenTemperature, setIsOpenTemperature] = useState(false);
  const [isOpenHumidity, setIsOpenHumidity] = useState(false);
  const [isOpenAlcohol, setIsOpenAlcohol] = useState(false);
  const [isOpenAirQuality, setIsOpenAirQuality] = useState(false);

  const [tempData, setTempData] = useState([0, 0, 0, 0, 0, 0]);
  const [humidityData, setHumidityData] = useState([0, 0, 0, 0, 0, 0]);
  const [alcoholData, setAlcoholData] = useState([0, 0, 0, 0, 0, 0]);
  const [airQualityData, setAirQualityData] = useState([0, 0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState(["", "", "", "", "", ""]);

  const [showWarning, setShowWarning] = useState(false);
  const [hasWarned, setHasWarned] = useState(false);
  const [isLoding, setIsLoading] = useState(true);

  const latestTemp = tempData[tempData.length - 1];
  const latestHumidity = humidityData[humidityData.length - 1];
  const latestAlcohol = alcoholData[alcoholData.length - 1];
  const latestAirQuality = airQualityData[airQualityData.length - 1];

  const getLineColor = (temp: number) => {
    if (temp >= 40) return `rgba(255, 67, 54, 1)`;
    if (temp >= 20) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  };

  const getHumidityLineColor = (humidity: number) => {
    if (humidity >= 85) return `rgba(255, 67, 54, 1)`;
    if (humidity >= 50) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getAlcoholLineColor = (alcohol: number) => {
    if (alcohol >= 400) return `rgba(255, 67, 54, 1)`;
    if (alcohol >= 200) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getAirQualityLineColor = (airquality: number) => {
    if (airquality >= 70) return `rgba(255, 67, 54, 1)`;
    if (airquality >= 30) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const tempChartData = {
    labels: labels,
    datasets: [{
      data: tempData,
      color: (opacity = 1) => getLineColor(latestTemp),
      strokeWidth: 2
    }],
  };

  const humidityChartData = {
    labels: labels,
    datasets: [{
      data: humidityData,
      color: (opacity = 1) => getHumidityLineColor(latestHumidity),
      strokeWidth: 2
    }],
  };

  const alcoholChartData = {
    labels: labels,
    datasets: [{
      data: alcoholData,
      color: (opacity = 1) => getAlcoholLineColor(latestAlcohol),
      strokeWidth: 2
    }],
  };

  const airQualityChartData = {
    labels: labels,
    datasets: [{
      data: airQualityData,
      color: (opacity = 1) => getAirQualityLineColor(latestAirQuality),
      strokeWidth: 2
    }],
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://temp-dashboard-rc7z.onrender.com/sensor/latest/esp32-01', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const data = await response.json();
      console.log("Check Data:", data);

      const newTemp = parseFloat(data.temperature);
      const newHumidity = parseFloat(data.humidity);
      const newAlcohol = parseFloat(data.alcohol);
      const newAirQuality = parseFloat(data.air_quality);

      if (!isNaN(newTemp)) {
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        setTempData((prev) => [...prev.slice(1), newTemp]);
        if (newTemp >= 40) {
          console.log("Temperature high! Opening Modal...");
          setShowWarning(true);
        }
        setLabels((prev) => [...prev.slice(1), timeString]);

        setHumidityData((prev) => [...prev.slice(1), newHumidity]);
        if (newHumidity >= 85) {
          console.log("Pressure high! Opening Modal...");
          setShowWarning(true);
        }

        setAlcoholData((prev) => [...prev.slice(1), newAlcohol]);
        if (newAlcohol >= 400) {
          console.log("CarbonDioxide high! Opening Modal...");
          setShowWarning(true);
        }

        setAirQualityData((prev) => [...prev.slice(1), newAirQuality]);
        if (newAirQuality >= 70) {
          console.log("Methane high! Opening Modal...");
          setShowWarning(true);
        }

      }

      setIsLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // เรียกครั้งแรก
    const interval = setInterval(fetchData, 2000); // ดึงทุก 2 วิ
    return () => clearInterval(interval);
  }, [hasWarned]); // เพิ่ม hasWarned เพื่อให้ Modal ทำงานสัมพันธ์กัน

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1c1e1f' : '#f5f5f5' }]}>
        {isDesktop ? (
          <View style={{ flex: 1 }}>
            <View style={styles.menuDesktopRow}>
              <View style={[styles.menuDesktop,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              }
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image
                    source={require('@/assets/images/temperature.png')}
                    style={{ width: 40, height: 40, margin: 10 }}
                  />
                </View>
                <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                  Temperature
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 150,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      อุณหภูมิ (°C)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: tempData,
                        },
                        {
                          data: [50],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={(width / 3) - 200}
                    height={290}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getLineColor(latestTemp),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getLineColor(latestTemp),
                      },

                      fillShadowGradientFrom: getLineColor(latestTemp),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,

                      formatYLabel: (yValue) => Math.round(parseFloat(yValue)).toString(),

                    }}
                    bezier={false}
                    yAxisInterval={10}
                    verticalLabelRotation={0}
                    style={{
                      borderRadius: 16,
                      marginVertical: 8,
                      paddingRight: 40,
                    }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  อุณหภูมิล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getLineColor(latestTemp) }}>{latestTemp} °C</ThemedText>
                </ThemedText>
              </View>

              <View style={[styles.menuDesktop,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              }
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image
                    source={require('@/assets/images/humidity.png')}
                    style={{ width: 40, height: 40, margin: 10 }}
                  />
                </View>
                <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                  Humidity
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 150,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      ความชื้น (RH)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: humidityData,
                        },
                        {
                          data: [100],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={(width / 3) - 200}
                    height={290}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getLineColor(latestTemp),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getHumidityLineColor(latestHumidity),
                      },

                      fillShadowGradientFrom: getHumidityLineColor(latestHumidity),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,

                      formatYLabel: (yValue) => Math.round(parseFloat(yValue)).toString(),

                    }}
                    bezier={false}
                    yAxisInterval={20}
                    verticalLabelRotation={0}
                    style={{
                      borderRadius: 16,
                      marginVertical: 8,
                      paddingRight: 40,
                    }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  ความชื้นล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getHumidityLineColor(latestHumidity) }}>{latestHumidity} RH</ThemedText>
                </ThemedText>
              </View>
            </View>

            <View style={styles.menuDesktopRow}>
              <View style={[styles.menuDesktop,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              }
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image
                    source={require('@/assets/images/alcohol-free.png')}
                    style={{ width: 40, height: 40, margin: 10 }}
                  />
                </View>
                <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                  Alcohol
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 150,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      Alcohol (ppm)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: alcoholData,
                        },
                        {
                          data: [1000],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={(width / 3) - 200}
                    height={290}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getAlcoholLineColor(latestAlcohol),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getAlcoholLineColor(latestAlcohol),
                      },

                      fillShadowGradientFrom: getAlcoholLineColor(latestAlcohol),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    bezier={false}
                    yAxisInterval={200}
                    verticalLabelRotation={0}
                    style={{
                      borderRadius: 16,
                      marginVertical: 8,
                      paddingRight: 40,
                    }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  แอลกอฮอร์ล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getAlcoholLineColor(latestAlcohol) }}>{latestAlcohol} ppm</ThemedText>
                </ThemedText>
              </View>

              <View style={[styles.menuDesktop,
              {
                backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              }
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image
                    source={require('@/assets/images/planet-earth.png')}
                    style={{ width: 40, height: 40, margin: 10 }}
                  />
                </View>
                <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                  Air Quality
                </ThemedText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 150,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      Air Quality (ppm)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: airQualityData,
                        },
                        {
                          data: [100],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={(width / 3) - 200}
                    height={290}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getAirQualityLineColor(latestAirQuality),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getAirQualityLineColor(latestAirQuality),
                      },

                      fillShadowGradientFrom: getAirQualityLineColor(latestAirQuality),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    bezier={false}
                    yAxisInterval={20}
                    verticalLabelRotation={0}
                    style={{
                      borderRadius: 16,
                      marginVertical: 8,
                      paddingRight: 40,
                    }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  สภาพอากาศล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getAirQualityLineColor(latestAirQuality) }}>{latestAirQuality} ppm</ThemedText>
                </ThemedText>
              </View>
            </View>


            <View style={{ flex: 1 }}>
            </View>
          </View>


        ) : (
          <>
            {/* Graph for Temperature */}
            <View style={[styles.menuMobile,
            {
              marginTop: 10,
              backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
              borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              paddingBottom: 15 // เพิ่ม padding ล่างให้สวยงาม
            }
            ]}>
              <View style={[styles.menuMobileButton, { backgroundColor: 'transparent' }]}>
                <View style={styles.menuMobileHeader}>
                  <Image source={require('@/assets/images/temperature.png')} style={{ width: 24, height: 24 }} />
                  <ThemedText style={styles.menuMobileTitle}>Temperature</ThemedText>
                </View>
              </View>

              {/* แสดงเนื้อหาทันที ไม่ต้องมีเงื่อนไข isOpenTemperature */}
              <View style={styles.menuMobileContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 150,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      อุณหภูมิ (°C)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: tempData,
                        },
                        {
                          data: [50],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={width - 80} // ปรับความกว้างให้กว้างขึ้นเล็กน้อยเพราะไม่มีลูกศรแล้ว
                    height={220}
                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}
                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getLineColor(latestTemp),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',
                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getLineColor(latestTemp),
                      },
                      fillShadowGradientFrom: getLineColor(latestTemp),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    bezier={false}
                    yAxisInterval={10}
                    verticalLabelRotation={0}
                    style={{ borderRadius: 16, marginVertical: 8 }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  อุณหภูมิล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getLineColor(latestTemp) }}>{latestTemp}°C
                  </ThemedText>
                </ThemedText>
              </View>
            </View>

            {/* Graph Humidity */}
            <View style={[styles.menuMobile,
            {
              marginTop: 10,
              backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
              borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              paddingBottom: 15 // เพิ่ม padding ล่างให้สวยงาม
            }
            ]}>
              <View style={[styles.menuMobileButton, { backgroundColor: 'transparent' }]}>
                <View style={styles.menuMobileHeader}>
                  <Image source={require('@/assets/images/humidity.png')} style={{ width: 24, height: 24 }} />
                  <ThemedText style={styles.menuMobileTitle}>Humidity</ThemedText>
                </View>
              </View>
              <View style={styles.menuMobileContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 300,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      Humidity (RH)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: humidityData,
                        },
                        {
                          data: [100],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={width - 120}
                    height={220}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getHumidityLineColor(latestHumidity),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getHumidityLineColor(latestHumidity),
                      },

                      fillShadowGradientFrom: getHumidityLineColor(latestHumidity),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    bezier={false}
                    yAxisInterval={20}
                    verticalLabelRotation={0}
                    style={{ borderRadius: 16, marginVertical: 8 }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  ความชื่นล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getHumidityLineColor(latestHumidity) }}>{latestHumidity} RH</ThemedText>
                </ThemedText>
              </View>
            </View>

            {/* Graph Alcohol */}
            <View style={[styles.menuMobile,
            {
              marginTop: 10,
              backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
              borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              paddingBottom: 15 // เพิ่ม padding ล่างให้สวยงาม
            }
            ]}>
              <View style={[styles.menuMobileButton, { backgroundColor: 'transparent' }]}>
                <View style={styles.menuMobileHeader}>
                  <Image source={require('@/assets/images/alcohol-free.png')} style={{ width: 24, height: 24 }} />
                  <ThemedText style={styles.menuMobileTitle}>Alcohol</ThemedText>
                </View>
              </View>
              <View style={styles.menuMobileContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 300,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      Alcohol (ppm)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: alcoholData,
                        },
                        {
                          data: [1000],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={width - 120}
                    height={220}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getAlcoholLineColor(latestAlcohol),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getAlcoholLineColor(latestAlcohol),
                      },

                      fillShadowGradientFrom: getAlcoholLineColor(latestAlcohol),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    bezier={false}
                    yAxisInterval={200}
                    verticalLabelRotation={0}
                    style={{ borderRadius: 16, marginVertical: 8 }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  แอลกอฮอล์ล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getAlcoholLineColor(latestAlcohol) }}>{latestAlcohol} ppm</ThemedText>
                </ThemedText>
              </View>
            </View>

            {/* Graph Air Quality */}
            <View style={[styles.menuMobile,
            {
              marginTop: 10,
              backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
              borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9',
              paddingBottom: 15 
            }
            ]}>
              <View style={[styles.menuMobileButton, { backgroundColor: 'transparent' }]}>
                <View style={styles.menuMobileHeader}>
                  <Image source={require('@/assets/images/planet-earth.png')} style={{ width: 24, height: 24 }} />
                  <ThemedText style={styles.menuMobileTitle}>Air Quality</ThemedText>
                </View>
              </View>
              <View style={styles.menuMobileContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <ThemedText style={{
                      transform: [{ rotate: '-90deg' }],
                      width: 300,
                      textAlign: 'center',
                      fontSize: 14,
                      color: colorScheme === 'dark' ? '#ffffff' : '#555555',
                    }}>
                      Air Quality (ppm)
                    </ThemedText>
                  </View>
                  <LineChart
                    data={{
                      labels: labels.map((label, index) =>
                        index === labels.length - 1 ? label : ""
                      ),
                      datasets: [
                        {
                          data: airQualityData,
                        },
                        {
                          data: [1000],
                          withDots: false,
                          color: () => `transparent`,
                        }
                      ]
                    }}
                    width={width - 120}
                    height={220}

                    fromZero={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={true}
                    segments={5}

                    chartConfig={{
                      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      backgroundGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => getAirQualityLineColor(latestAirQuality),
                      labelColor: (opacity = 1) => colorScheme === 'dark' ? '#ffffff' : '#555555',

                      propsForBackgroundLines: {
                        strokeWidth: 1,
                        stroke: colorScheme === 'dark' ? '#444444' : '#e3e3e3',
                        strokeDasharray: '',
                      },

                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: getAirQualityLineColor(latestAirQuality),
                      },

                      fillShadowGradientFrom: getAirQualityLineColor(latestAirQuality),
                      fillShadowGradientTo: colorScheme === 'dark' ? '#333333' : '#ffffff',
                      fillShadowGradientOpacity: 0.1,
                    }}
                    yAxisInterval={20}
                    verticalLabelRotation={0}
                    bezier={false}
                    style={{ borderRadius: 16, marginVertical: 8 }}
                  />
                </View>
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  สภาพอากาศล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getAirQualityLineColor(latestAirQuality) }}>{latestAirQuality} ppm</ThemedText>
                </ThemedText>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showWarning}
        onRequestClose={() => setShowWarning(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }]}>
            <AntDesign name="close" size={50} color="#ff4336" />
            <ThemedText style={styles.modalTitle}>แจ้งเตือน!</ThemedText>
            <ThemedText style={styles.modalText}>สภาพอากาศไม่ดี</ThemedText>

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowWarning(false)}
            >
              <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>รับทราบ</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  menuDesktopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    gap: 30,
    marginBottom: 10,
    width: '100%',
  },
  menuDesktop: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    height: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuMobile: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  menuMobileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  menuMobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuMobileTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuMobileContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#ff4336',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff4336',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});