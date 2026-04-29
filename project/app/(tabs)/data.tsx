import React from 'react';
import { StyleSheet, useWindowDimensions, View, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme();
  const [isOpenTemperature, setIsOpenTemperature] = React.useState(false);
  const [isOpenHumidity, setIsOpenHumidity] = React.useState(false);
  const [isOpenAlcohol, setIsOpenAlcohol] = React.useState(false);
  const [isOpenAirQuality, setIsOpenAirQuality] = React.useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1c1e1f' : '#f5f5f5' }]}>
      {isDesktop ? (
        <View style={{ flex: 1 }}>

          <View style={styles.menuDesktopRow}>
            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/temperature.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Temperature
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อุณหภูมิในช่วงนี้มีค่าต่ำกว่าปกติ เช่น ในกรณีที่อุณหภูมิต่ำกว่า 20°C อาจส่งผลให้ระบบบางอย่างทำงานได้ไม่เต็มประสิทธิภาพ หรือส่งผลกระทบต่อร่างกาย เช่น หนาวสั่น หรือเป็นไข้
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ช่วงอุณหภูมิที่เหมาะสม อยู่ระหว่างประมาณ 20°C - 39°C เป็นช่วงที่ปลอดภัย เหมาะสำหรับการทำงานของเครื่องจักรและสภาพร่างกายของมนุษย์
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เมื่ออุณหภูมิเกินกว่า 40°C จะถือว่าสูง อาจก่อให้เกิดความร้อนเกินในระบบอุปกรณ์ หรือเสี่ยงต่อปัญหาสุขภาพ เช่น โรคลมแดด หรือการขาดน้ำ
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/humidity.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Humidity
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ความชื้นในช่วงนี้มีค่าต่ำกว่าปกติ เช่น ต่ำกว่า 50 RH อาจทำให้อากาศแห้ง ส่งผลกระทบต่อร่างกาย เช่น ผิวแห้ง ระคายเคืองตาและทางเดินหายใจ รวมถึงอาจเกิดไฟฟ้าสถิตที่กระทบต่ออุปกรณ์อิเล็กทรอนิกส์ได้
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ช่วงความชื้นที่เหมาะสมอยู่ระหว่างประมาณ 51 RH - 84 RH เป็นช่วงที่สบายต่อการอยู่อาศัย ไม่แห้งหรือชื้นเกินไป เหมาะสำหรับสุขภาพของมนุษย์ และช่วยลดการสะสมของเชื้อราและแบคทีเรีย
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เมื่อความชื้นมากกว่า 80 RH จะถือว่าสูง อาจทำให้อากาศอับชื้น เหนียวตัว และเสี่ยงต่อการเกิดเชื้อรา กลิ่นอับ รวมถึงส่งผลเสียต่ออุปกรณ์และเฟอร์นิเจอร์ เช่น การเกิดความชื้นสะสมหรือการเสื่อมสภาพ
              </ThemedText>
            </View>
          </View>

          <View style={styles.menuDesktopRow}>
            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/alcohol-free.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Alcohol
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ความเข้มข้นของไอแอลกอฮอล์อยู่ในระดับต่ำมาก มีค่าช่วงน้อยกว่า 200 ppm แสดงว่าสภาพอากาศในห้องปกติ ไม่มีการรั่วไหลหรือการสะสมของแอลกอฮอล์ ถือว่าปลอดภัยต่อการใช้งาน
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                มีไอแอลกอฮอล์ในอากาศเล็กน้อย มีค่าช่วง 200 ppm - 399 ppm อาจเกิดจากการใช้งานทั่วไป เช่น การใช้เจลแอลกอฮอล์ หรือการทำความสะอาด ยังไม่เป็นอันตราย แต่ควรมีการระบายอากาศที่ดี
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เมื่อความเข้มข้นของไอแอลกอฮอล์สูง มีค่าช่วงมากกว่า 400 ppm อาจบ่งชี้ว่ามีการสะสมหรือการรั่วไหลในห้อง เสี่ยงต่อความปลอดภัย
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/planet-earth.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Air Quality
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                คุณภาพอากาศดีมากหรือสะอาดมาก มีค่าช่วงน้อยกว่า 30 ppm มีมลพิษน้อยมาก อากาศสดชื่น เหมาะสมที่สุดต่อสุขภาพและการใช้งานภายในห้อง
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                คุณภาพอากาศอยู่ในเกณฑ์ดี มีค่าช่วงอยู่ที่ 31 ppm - 69 ppm อากาศสะอาด ปลอดภัยต่อสุขภาพ เหมาะสำหรับการอยู่อาศัยและทำงาน ไม่มีผลกระทบต่อร่างกาย
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                คุณภาพอากาศแย่ มีมลพิษหรือก๊าซปนเปื้อนในระดับสูง มีค่าสูงกว่า 70 ppm อาจส่งผลกระทบต่อสุขภาพ เช่น ระคายเคืองตา แสบจมูก ไอ หายใจลำบาก และไม่เหมาะสำหรับการอยู่อาศัย
              </ThemedText>
            </View>
          </View>
        </View>
      ) : (
        <>

          {/* Temperature */}
          <View style={[styles.menuMobile,
          { marginTop: 10, backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
          ]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenTemperature(!isOpenTemperature)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/temperature.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Temperature</ThemedText>
              </View>
              <AntDesign
                name={isOpenTemperature ? 'up' : 'down'}
                size={16}
                color="#858585"
              />
            </TouchableOpacity>
            {isOpenTemperature && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  อุณหภูมิในช่วงนี้มีค่าต่ำกว่าปกติ เช่น ในกรณีที่อุณหภูมิต่ำกว่า 20°C อาจส่งผลให้ระบบบางอย่างทำงานได้ไม่เต็มประสิทธิภาพ หรือส่งผลกระทบต่อร่างกาย เช่น หนาวสั่น หรือเป็นไข้{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  ช่วงอุณหภูมิที่เหมาะสม อยู่ระหว่างประมาณ 20°C - 39°C เป็นช่วงที่ปลอดภัย เหมาะสำหรับการทำงานของเครื่องจักรและสภาพร่างกายของมนุษย์{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  เมื่ออุณหภูมิเกินกว่า 40°C จะถือว่าสูง อาจก่อให้เกิดความร้อนเกินในระบบอุปกรณ์ หรือเสี่ยงต่อปัญหาสุขภาพ เช่น โรคลมแดด หรือการขาดน้ำ{'\n'}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Humidity */}
          <View style={[styles.menuMobile,
          { marginTop: 10, backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
          ]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenHumidity(!isOpenHumidity)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/humidity.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Humidity</ThemedText>
              </View>
              <AntDesign
                name={isOpenHumidity ? 'up' : 'down'}
                size={16}
                color="#858585"
              />
            </TouchableOpacity>
            {isOpenHumidity && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ความชื้นในช่วงนี้มีค่าต่ำกว่าปกติ เช่น ต่ำกว่า 50 RH อาจทำให้อากาศแห้ง ส่งผลกระทบต่อร่างกาย เช่น ผิวแห้ง ระคายเคืองตาและทางเดินหายใจ รวมถึงอาจเกิดไฟฟ้าสถิตที่กระทบต่ออุปกรณ์อิเล็กทรอนิกส์ได้{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  ช่วงความชื้นที่เหมาะสมอยู่ระหว่างประมาณ 51 RH - 84 RH เป็นช่วงที่สบายต่อการอยู่อาศัย ไม่แห้งหรือชื้นเกินไป เหมาะสำหรับสุขภาพของมนุษย์ และช่วยลดการสะสมของเชื้อราและแบคทีเรีย{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  เมื่อความชื้นมากกว่า 80 RH จะถือว่าสูง อาจทำให้อากาศอับชื้น เหนียวตัว และเสี่ยงต่อการเกิดเชื้อรา กลิ่นอับ รวมถึงส่งผลเสียต่ออุปกรณ์และเฟอร์นิเจอร์ เช่น การเกิดความชื้นสะสมหรือการเสื่อมสภาพ
                </ThemedText>
              </View>
            )}
          </View>

          {/* Alcohol */}
          <View style={[styles.menuMobile,
          { marginTop: 10, backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
          ]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenAlcohol(!isOpenAlcohol)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/alcohol-free.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Ammonia</ThemedText>
              </View>
              <AntDesign
                name={isOpenAlcohol ? 'up' : 'down'}
                size={16}
                color="#858585"
              />
            </TouchableOpacity>
            {isOpenAlcohol && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ความเข้มข้นของไอแอลกอฮอล์อยู่ในระดับต่ำมาก มีค่าช่วงน้อยกว่า 200 ppm แสดงว่าสภาพอากาศในห้องปกติ ไม่มีการรั่วไหลหรือการสะสมของแอลกอฮอล์ ถือว่าปลอดภัยต่อการใช้งาน{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  มีไอแอลกอฮอล์ในอากาศเล็กน้อย มีค่าช่วง 200 ppm - 399 ppm อาจเกิดจากการใช้งานทั่วไป เช่น การใช้เจลแอลกอฮอล์ หรือการทำความสะอาด ยังไม่เป็นอันตราย แต่ควรมีการระบายอากาศที่ดี{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  เมื่อความเข้มข้นของไอแอลกอฮอล์สูง มีค่าช่วงมากกว่า 400 ppm อาจบ่งชี้ว่ามีการสะสมหรือการรั่วไหลในห้อง เสี่ยงต่อความปลอดภัย
                </ThemedText>
              </View>
            )}
          </View>

          {/* Air Quality */}
          <View style={[styles.menuMobile,
          { marginTop: 10, backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
          ]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenAirQuality(!isOpenAirQuality)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/planet-earth.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Air Quality</ThemedText>
              </View>
              <AntDesign
                name={isOpenAirQuality ? 'up' : 'down'}
                size={16}
                color="#858585"
              />
            </TouchableOpacity>
            {isOpenAirQuality && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  คุณภาพอากาศดีมากหรือสะอาดมาก มีค่าช่วงน้อยกว่า 30 ppm มีมลพิษน้อยมาก อากาศสดชื่น เหมาะสมที่สุดต่อสุขภาพและการใช้งานภายในห้อง{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  คุณภาพอากาศอยู่ในเกณฑ์ดี มีค่าช่วงอยู่ที่ 31 ppm - 69 ppm อากาศสะอาด ปลอดภัยต่อสุขภาพ เหมาะสำหรับการอยู่อาศัยและทำงาน ไม่มีผลกระทบต่อร่างกาย{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  คุณภาพอากาศแย่ มีมลพิษหรือก๊าซปนเปื้อนในระดับสูง มีค่าสูงกว่า 70 ppm อาจส่งผลกระทบต่อสุขภาพ เช่น ระคายเคืองตา แสบจมูก ไอ หายใจลำบาก และไม่เหมาะสำหรับการอยู่อาศัย
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
    height: 500,
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
});
