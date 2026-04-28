import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

export default function GraphScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [isOpenTemperature, setIsOpenTemperature] = useState(false);
  const [isOpenPressure, setIsOpenPressure] = useState(false);
  const [isOpenCarbonDioxide, setIsOpenCarbonDioxide] = useState(false);
  const [isOpenMethane, setIsOpenMethane] = useState(false);
  const [isOpenEthanol, setIsOpenEthanol] = useState(false);
  const [isOpenNitrogen, setIsOpenNitrogen] = useState(false);
  const [isOpenAmmonia, setIsOpenAmmonia] = useState(false);
  const [isOpenNitrogenDioxide, setIsOpenNitrogenDioxide] = useState(false);

  const [tempData, setTempData] = useState([25, 26, 25, 27, 28, 30]);
  const [pressureData, setPressureData] = useState([1010, 1012, 1011, 1013, 1012, 1014]);
  const [carbonDioxideData, setCarbonDioxideData] = useState([400, 410, 405, 415, 420, 430]);
  const [methaneData, setMethaneData] = useState([10, 15, 12, 18, 20, 15]);
  const [ethanolData, setEthanolData] = useState([5, 8, 10, 7, 12, 9]);
  const [nitrogenData, setNitrogenData] = useState([100, 120, 110, 130, 125, 115]);
  const [ammoniaData, setAmmoniaData] = useState([1, 2, 1, 3, 2, 2]);
  const [nitrogenDioxideData, setNitrogenDioxideData] = useState([10, 15, 12, 18, 20, 14]);
  const [labels, setLabels] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
      const newPressure = Math.floor(Math.random() * (1100 - 950 + 1)) + 950;
      const newCarbonDioxide = Math.floor(Math.random() * (1200 - 200 + 1)) + 200;
      const newMethane = Math.floor(Math.random() * (6000 - 800 + 1)) + 800;
      const newEthanol = Math.floor(Math.random() * (600 - 50 + 1)) + 50;
      const newNitrogen = Math.floor(Math.random() * (6000 - 800 + 1)) + 800;
      const newAmmonia = Math.floor(Math.random() * (70 - 15 + 1)) + 15;
      const newNitrogenDioxide = Math.floor(Math.random() * (120 - 20 + 1)) + 20;

      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setTempData((prev) => {
        const updated = [...prev, newTemp];
        return updated.slice(-6); // เก็บข้อมูลไว้แค่ 6 จุดล่าสุด
      });

      setPressureData((prev) => {
        const updated = [...prev, newPressure];
        return updated.slice(-6);
      });

      setCarbonDioxideData((prev) => {
        const updated = [...prev, newCarbonDioxide];
        return updated.slice(-6);
      });

      setMethaneData((prev) => {
        const updated = [...prev, newMethane];
        return updated.slice(-6);
      });

      setEthanolData((prev) => {
        const updated = [...prev, newEthanol];
        return updated.slice(-6);
      });

      setNitrogenData((prev) => {
        const updated = [...prev, newNitrogen];
        return updated.slice(-6);
      });

      setAmmoniaData((prev) => {
        const updated = [...prev, newAmmonia];
        return updated.slice(-6);
      });

      setNitrogenDioxideData((prev) => {
        const updated = [...prev, newNitrogenDioxide];
        return updated.slice(-6);
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
  const latestPressure = pressureData[pressureData.length - 1];
  const latestCarbonDioxide = carbonDioxideData[carbonDioxideData.length - 1];
  const latestMethane = methaneData[methaneData.length - 1];
  const latestEthanol = ethanolData[ethanolData.length - 1];
  const latestNitrogen = nitrogenData[nitrogenData.length - 1];
  const latestAmmonia = ammoniaData[ammoniaData.length - 1];
  const latestNitrogenDioxide = nitrogenDioxideData[nitrogenDioxideData.length - 1];

  const getLineColor = (temp: number) => {
    if (temp >= 30) return `rgba(255, 67, 54, 1)`;
    if (temp >= 20) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  };

  const getPressureLineColor = (pressure: number) => {
    if (pressure >= 1020) return `rgba(255, 67, 54, 1)`;
    if (pressure >= 1000) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getCarbonDioxideLineColor = (co2: number) => {
    if (co2 >= 1000) return `rgba(255, 67, 54, 1)`;
    if (co2 >= 400) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getMethaneLineColor = (methane: number) => {
    if (methane >= 5000) return `rgba(255, 67, 54, 1)`;
    if (methane >= 1000) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getEthanolLineColor = (ethanol: number) => {
    if (ethanol >= 500) return `rgba(255, 67, 54, 1)`;
    if (ethanol >= 100) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getNitrogenLineColor = (nitrogen: number) => {
    if (nitrogen >= 5000) return `rgba(255, 67, 54, 1)`;
    if (nitrogen >= 1000) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getAmmoniaLineColor = (ammonia: number) => {
    if (ammonia >= 50) return `rgba(255, 67, 54, 1)`;
    if (ammonia >= 25) return `rgba(76, 175, 80, 1)`;
    return `rgba(33, 150, 243, 1)`;
  }

  const getNitrogenDioxideLineColor = (no2: number) => {
    if (no2 >= 100) return `rgba(255, 67, 54, 1)`;
    if (no2 >= 50) return `rgba(76, 175, 80, 1)`;
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

  const pressureChartData = {
    labels: labels,
    datasets: [{
      data: pressureData,
      color: (opacity = 1) => getPressureLineColor(latestPressure),
      strokeWidth: 2
    }],
  };

  const carbonDioxideChartData = {
    labels: labels,
    datasets: [{
      data: carbonDioxideData,
      color: (opacity = 1) => getCarbonDioxideLineColor(latestCarbonDioxide),
      strokeWidth: 2
    }],
  };

  const methaneChartData = {
    labels: labels,
    datasets: [{
      data: methaneData,
      color: (opacity = 1) => getMethaneLineColor(latestMethane),
      strokeWidth: 2
    }],
  };

  const ethanolChartData = {
    labels: labels,
    datasets: [{
      data: ethanolData,
      color: (opacity = 1) => getEthanolLineColor(latestEthanol),
      strokeWidth: 2
    }],
  };

  const nitrogenChartData = {
    labels: labels,
    datasets: [{
      data: nitrogenData,
      color: (opacity = 1) => getNitrogenLineColor(latestNitrogen),
      strokeWidth: 2
    }],
  };

  const ammoniaChartData = {
    labels: labels,
    datasets: [{
      data: ammoniaData,
      color: (opacity = 1) => getAmmoniaLineColor(latestAmmonia),
      strokeWidth: 2
    }],
  };

  const nitrogenDioxideChartData = {
    labels: labels,
    datasets: [{
      data: nitrogenDioxideData,
      color: (opacity = 1) => getNitrogenDioxideLineColor(latestNitrogenDioxide),
      strokeWidth: 2
    }],
  };

  return (
    <ScrollView style={styles.container}>
      {isDesktop ? (
        <ThemedText type="title" style={{ margin: 20 }}>
          Graph for Desktop
        </ThemedText>
      ) : (
        <>
          {/* Graph for Temperature */}
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
                  data={tempChartData}
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

          {/* Graph for Pressure */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenPressure(!isOpenPressure)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/pressure-gauge.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Pressure</ThemedText>
              </View>
              <AntDesign name={isOpenPressure ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenPressure && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={pressureChartData}
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
                    color: (opacity = 1) => getPressureLineColor(latestPressure),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getPressureLineColor(latestPressure),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  ความดันล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getPressureLineColor(latestPressure) }}>{latestPressure} hPa</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Carbon Dioxide */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenCarbonDioxide(!isOpenCarbonDioxide)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/carbon-dioxide.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Carbon Dioxide</ThemedText>
              </View>
              <AntDesign name={isOpenCarbonDioxide ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenCarbonDioxide && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={carbonDioxideChartData}
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
                    color: (opacity = 1) => getCarbonDioxideLineColor(latestCarbonDioxide),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getCarbonDioxideLineColor(latestCarbonDioxide),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  คาร์บอนไดออกไซด์ล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getCarbonDioxideLineColor(latestCarbonDioxide) }}>{latestCarbonDioxide} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Methane */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenMethane(!isOpenMethane)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/methane.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Methane</ThemedText>
              </View>
              <AntDesign name={isOpenMethane ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenMethane && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={methaneChartData}
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
                    color: (opacity = 1) => getMethaneLineColor(latestMethane),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getMethaneLineColor(latestMethane),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  เมธานล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getMethaneLineColor(latestMethane) }}>{latestMethane} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Ethanol */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenEthanol(!isOpenEthanol)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/ethanol.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Ethanol</ThemedText>
              </View>
              <AntDesign name={isOpenEthanol ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenEthanol && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={ethanolChartData}
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
                    color: (opacity = 1) => getEthanolLineColor(latestEthanol),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getEthanolLineColor(latestEthanol),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  แอลกอฮอล์ล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getEthanolLineColor(latestEthanol) }}>{latestEthanol} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Nitrogen */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenNitrogen(!isOpenNitrogen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/dioxide.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Nitrogen</ThemedText>
              </View>
              <AntDesign name={isOpenNitrogen ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenNitrogen && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={nitrogenChartData}
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
                    color: (opacity = 1) => getNitrogenLineColor(latestNitrogen),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getNitrogenLineColor(latestNitrogen),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  ไนโตรเจนล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getNitrogenLineColor(latestNitrogen) }}>{latestNitrogen} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Ammonia */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenAmmonia(!isOpenAmmonia)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/ammonia.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Ammonia</ThemedText>
              </View>
              <AntDesign name={isOpenAmmonia ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenAmmonia && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={ammoniaChartData}
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
                    color: (opacity = 1) => getAmmoniaLineColor(latestAmmonia),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getAmmoniaLineColor(latestAmmonia),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  แอมโมเนียล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getAmmoniaLineColor(latestAmmonia) }}>{latestAmmonia} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>

          {/* Graph Nitrogen Dioxide */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenNitrogenDioxide(!isOpenNitrogenDioxide)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image source={require('@/assets/images/atmospheric-chemistry.png')} style={{ width: 24, height: 24 }} />
                <ThemedText style={styles.menuMobileTitle}>Nitrogen Dioxide</ThemedText>
              </View>
              <AntDesign name={isOpenNitrogenDioxide ? 'up' : 'down'} size={16} color="#3b3b3b" />
            </TouchableOpacity>

            {isOpenNitrogenDioxide && (
              <View style={styles.menuMobileContent}>
                <LineChart
                  data={nitrogenDioxideChartData}
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
                    color: (opacity = 1) => getNitrogenDioxideLineColor(latestNitrogenDioxide),
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForLabels: {
                      fontSize: 10,
                    },

                    fillShadowGradientFrom: getNitrogenDioxideLineColor(latestNitrogenDioxide),
                    fillShadowGradientTo: "#ffffff",
                    fillShadowGradientOpacity: 0.2,
                  }}
                  bezier
                  style={{ borderRadius: 16, marginVertical: 8 }}
                />
                <ThemedText style={{ textAlign: 'center', marginTop: 10 }}>
                  ไนโตรเจนไดออกไซด์ล่าสุด: <ThemedText style={{ fontWeight: 'bold', color: getNitrogenDioxideLineColor(latestNitrogenDioxide) }}>{latestNitrogenDioxide} ppm</ThemedText>
                </ThemedText>
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
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
});