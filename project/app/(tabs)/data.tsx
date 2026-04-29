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
  const [isOpenPressure, setIsOpenPressure] = React.useState(false);
  const [isOpenCarbon, setIsOpenCarbon] = React.useState(false);
  const [isOpenMethane, setIsOpenMethane] = React.useState(false);
  const [isOpenEthanol, setIsOpenEthanol] = React.useState(false);
  const [isOpenNitrogen, setIsOpenNitrogen] = React.useState(false);
  const [isOpenAmmonia, setIsOpenAmmonia] = React.useState(false);
  const [isOpenNitrogenDioxide, setIsOpenNitrogenDioxide] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
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
                ช่วงอุณหภูมิที่เหมาะสม อยู่ระหว่างประมาณ 20°C - 30°C เป็นช่วงที่ปลอดภัย เหมาะสำหรับการทำงานของเครื่องจักรและสภาพร่างกายของมนุษย์
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เมื่ออุณหภูมิเกินกว่า 30°C จะถือว่าสูง อาจก่อให้เกิดความร้อนเกินในระบบอุปกรณ์ หรือเสี่ยงต่อปัญหาสุขภาพ เช่น โรคลมแดด หรือการขาดน้ำ
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/pressure-gauge.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Pressure
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ความดันน้อยกว่า 1000 hPa
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อาจบ่งบอกถึงพายุหรือฝนตก ความดันต่ำอาจทำให้รู้สึกเหนื่อยหรือปวดหัวในบางคน และอาจส่งผลต่อระบบการบินหรือเครื่องจักร
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                ความดันอยู่ระหว่าง 1000 - 1020 hPa
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เป็นช่วงที่เหมาะสมต่อกิจกรรมทั่วไป สภาพอากาศปกติ อากาศแจ่มใส เครื่องจักรทำงานได้ดี
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ความดันมากกว่า 1020 hPa
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อาจสัมพันธ์กับอากาศแห้ง ท้องฟ้าแจ่มใส แต่ถ้าสูงมากเกินไปอาจส่งผลต่อผู้มีปัญหาด้านความดันโลหิตหรือความรู้สึกไม่สบายในที่สูง
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/carbon-dioxide.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Carbon Dioxide
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 400 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อากาศบริสุทธิ์ สดชื่น เหมาะกับการหายใจและการทำงานในระยะยาว
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                400 - 1000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อยู่ในช่วงปกติสำหรับพื้นที่ปิด เช่น ห้องเรียน ห้องประชุม ไม่ส่งผลกระทบต่อสุขภาพ
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                เกิน 1000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ควรระบายอากาศ อาจทำให้รู้สึกง่วง เวียนหัว สมาธิลดลง และส่งผลต่อสุขภาพในระยะยาว
              </ThemedText>
            </View>
          </View>

          <View style={styles.menuDesktopRow}>
            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/methane.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Methane
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 1000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ปลอดภัย ไม่มีความเสี่ยงต่อการติดไฟหรือระเบิด อากาศถือว่าปลอดโปร่ง
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                1000 - 5000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                เริ่มมีการสะสมของก๊าซ อาจเกิดจากการรั่วไหลเล็กน้อย ยังไม่อันตรายแต่ควรติดตาม
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                มากกว่า 5000 ppm หรือเข้าใกล้ 5% (LEL)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อันตราย! เสี่ยงต่อการระเบิดหากมีแหล่งจุดไฟ ควรระบายอากาศทันทีและตรวจสอบแหล่งรั่ว
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/ethanol.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Ethanol
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 100 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ปลอดภัย ไม่มีความเสี่ยงต่อสุขภาพ และไม่เป็นอันตรายต่อการใช้งานทั่วไป
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                100 - 500 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                สามารถพบได้ในบางสภาพแวดล้อม เช่น ห้องทดลองหรือโรงงานผลิต มีความเสี่ยงต่ำต่อสุขภาพ
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                มากกว่า 500 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ควรระวัง! ความเข้มข้นสูงเกินไปอาจทำให้เกิดผลกระทบต่อสุขภาพ เช่น อาการเวียนหัว หายใจไม่สะดวก หรือเสี่ยงต่อการเกิดเพลิงไหม้หากมีแหล่งจุดติดไฟ
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/dioxide.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Nitrogen
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 1000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ปลอดภัยในพื้นที่ที่มีการระบายอากาศดี ไม่มีผลกระทบต่อสุขภาพ
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                1000 - 5000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ความเข้มข้นของไนโตรเจนในอากาศปกติ ส่วนใหญ่ไม่ส่งผลกระทบต่อสุขภาพและการทำงาน
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                มากกว่า 5000 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อาจทำให้การหายใจลำบากและเสี่ยงต่อการขาดออกซิเจนในพื้นที่ที่มีไนโตรเจนสูง ควรระมัดระวังการทำงานในพื้นที่ปิด
              </ThemedText>
            </View>
          </View>

          <View style={styles.menuDesktopRow}>
            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/ammonia.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Ammonia
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 25 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ปลอดภัย ไม่มีผลกระทบต่อสุขภาพ การทำงานหรือการหายใจในพื้นที่นี้ถือว่าปลอดภัย
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                25 - 50 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ระดับแอมโมเนียที่ไม่เป็นอันตรายในพื้นที่ที่มีการระบายอากาศดี อาจมีการระคายเคืองเล็กน้อย
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                มากกว่า 50 ppm
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ระดับอันตราย! การหายใจในพื้นที่ที่มีระดับแอมโมเนียสูงอาจทำให้เกิดการระคายเคืองที่ระบบทางเดินหายใจ ตา และผิวหนัง ควรระมัดระวังและหลีกเลี่ยง
              </ThemedText>
            </View>

            <View style={[styles.menuDesktop,
            { backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff', borderColor: colorScheme === 'dark' ? '#555555' : '#d9d9d9' }
            ]}>
              <Image
                source={require('@/assets/images/atmospheric-chemistry.png')}
                style={{ width: 40, height: 40, margin: 10 }}
              />
              <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
                Nitrogen dioxide
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 22, color: '#080bb4' }}>
                ระดับต่ำ: (Low)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                ต่ำกว่า 50 ppb
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ปลอดภัยสำหรับการหายใจ ไม่มีผลกระทบต่อสุขภาพในระยะยาว
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#058625' }}>
                ระดับปกติ (Normal)
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22 }}>
                50 - 100 ppb
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                ความเข้มข้นปกติในอากาศที่อาจพบได้ในพื้นที่ที่มีการจราจรหรือในเมือง
              </ThemedText>
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 22, marginTop: 10, color: '#ff0000' }}>
                ระดับสูง (High)
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 22, marginRight: 10 }}>
                มากกว่า 100 ppb
              </ThemedText>
              <ThemedText style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 22, marginRight: 10 }}>
                อาจเป็นอันตรายต่อระบบทางเดินหายใจและส่งผลกระทบต่อสุขภาพในระยะยาว เช่น โรคหอบหืดและการหายใจลำบาก
              </ThemedText>
            </View>
            <View style={{ flex: 1 }} />
          </View>

        </View>
      ) : (
        <>
          {/* Temperature */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
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
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenTemperature && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  อุณหภูมิในช่วงนี้มีค่าต่ำกว่าปกติ เช่น ในกรณีที่อุณหภูมิต่ำกว่า 20°C อาจส่งผลให้ระบบบางอย่างทำงานได้ไม่เต็มประสิทธิภาพ หรือส่งผลกระทบต่อร่างกาย เช่น หนาวสั่น หรือเป็นไข้{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  ช่วงอุณหภูมิที่เหมาะสม อยู่ระหว่างประมาณ 20°C - 30°C เป็นช่วงที่ปลอดภัย เหมาะสำหรับการทำงานของเครื่องจักรและสภาพร่างกายของมนุษย์{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  เมื่ออุณหภูมิเกินกว่า 30°C จะถือว่าสูง อาจก่อให้เกิดความร้อนเกินในระบบอุปกรณ์ หรือเสี่ยงต่อปัญหาสุขภาพ เช่น โรคลมแดด หรือการขาดน้ำ
                </ThemedText>
              </View>
            )}
          </View>

          {/* Pressure */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenPressure(!isOpenPressure)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/pressure-gauge.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Pressure</ThemedText>
              </View>
              <AntDesign
                name={isOpenPressure ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenPressure && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ความดันน้อยกว่า 1000 hPa{'\n'}
                  อาจบ่งบอกถึงพายุหรือฝนตก ความดันต่ำอาจทำให้รู้สึกเหนื่อยหรือปวดหัวในบางคน และอาจส่งผลต่อระบบการบินหรือเครื่องจักร{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  ความดันอยู่ระหว่าง 1000 - 1020 hPa{'\n'}
                  เป็นช่วงที่เหมาะสมต่อกิจกรรมทั่วไป สภาพอากาศปกติ อากาศแจ่มใส เครื่องจักรทำงานได้ดี{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  ความดันมากกว่า 1020 hPa{'\n'}
                  อาจสัมพันธ์กับอากาศแห้ง ท้องฟ้าแจ่มใส แต่ถ้าสูงมากเกินไปอาจส่งผลต่อผู้มีปัญหาด้านความดันโลหิตหรือความรู้สึกไม่สบายในที่สูง
                </ThemedText>
              </View>
            )}
          </View>

          {/* Carbon Dioxide */}
          <View style={[styles.menuMobile, { marginTop: 10 }]}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenCarbon(!isOpenCarbon)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/carbon-dioxide.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Carbon Dioxide</ThemedText>
              </View>
              <AntDesign
                name={isOpenCarbon ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenCarbon && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 400 ppm{'\n'}
                  อากาศบริสุทธิ์ สดชื่น เหมาะกับการหายใจและการทำงานในระยะยาว{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  400 - 1000 ppm{'\n'}
                  อยู่ในช่วงปกติสำหรับพื้นที่ปิด เช่น ห้องเรียน ห้องประชุม ไม่ส่งผลกระทบต่อสุขภาพ{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  เกิน 1000 ppm{'\n'}
                  ควรระบายอากาศ อาจทำให้รู้สึกง่วง เวียนหัว สมาธิลดลง และส่งผลต่อสุขภาพในระยะยาว
                </ThemedText>
              </View>
            )}
          </View>

          {/* Methane */}
          <View style={styles.menuMobile}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenMethane(!isOpenMethane)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/methane.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Methane</ThemedText>
              </View>
              <AntDesign
                name={isOpenMethane ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenMethane && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 1000 ppm{'\n'}
                  ปลอดภัย ไม่มีความเสี่ยงต่อการติดไฟหรือระเบิด อากาศถือว่าปลอดโปร่ง{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  1000 - 5000 ppm{'\n'}
                  เริ่มมีการสะสมของก๊าซ อาจเกิดจากการรั่วไหลเล็กน้อย ยังไม่อันตรายแต่ควรติดตาม{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  มากกว่า 5000 ppm หรือเข้าใกล้ 5% (LEL){'\n'}
                  อันตราย! เสี่ยงต่อการระเบิดหากมีแหล่งจุดไฟ ควรระบายอากาศทันทีและตรวจสอบแหล่งรั่ว
                </ThemedText>
              </View>
            )}
          </View>

          {/* Ethanol */}
          <View style={styles.menuMobile}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenEthanol(!isOpenEthanol)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/ethanol.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Ethanol</ThemedText>
              </View>
              <AntDesign
                name={isOpenEthanol ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenEthanol && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 100 ppm{'\n'}
                  ปลอดภัย ไม่มีความเสี่ยงต่อสุขภาพ และไม่เป็นอันตรายต่อการใช้งานทั่วไป{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  100 - 500 ppm{'\n'}
                  สามารถพบได้ในบางสภาพแวดล้อม เช่น ห้องทดลองหรือโรงงานผลิต มีความเสี่ยงต่ำต่อสุขภาพ{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  มากกว่า 500 ppm{'\n'}
                  ควรระวัง! ความเข้มข้นสูงเกินไปอาจทำให้เกิดผลกระทบต่อสุขภาพ เช่น อาการเวียนหัว หายใจไม่สะดวก หรือเสี่ยงต่อการเกิดเพลิงไหม้หากมีแหล่งจุดติดไฟ
                </ThemedText>
              </View>
            )}
          </View>

          {/* Nitrogen */}
          <View style={styles.menuMobile}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenNitrogen(!isOpenNitrogen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/dioxide.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Nitrogen</ThemedText>
              </View>
              <AntDesign
                name={isOpenNitrogen ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenNitrogen && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 1000 ppm{'\n'}
                  ปลอดภัยในพื้นที่ที่มีการระบายอากาศดี ไม่มีผลกระทบต่อสุขภาพ{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  1000 - 5000 ppm{'\n'}
                  ความเข้มข้นของไนโตรเจนในอากาศปกติ ส่วนใหญ่ไม่ส่งผลกระทบต่อสุขภาพและการทำงาน{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  มากกว่า 5000 ppm{'\n'}
                  อาจทำให้การหายใจลำบากและเสี่ยงต่อการขาดออกซิเจนในพื้นที่ที่มีไนโตรเจนสูง ควรระมัดระวังการทำงานในพื้นที่ปิด
                </ThemedText>
              </View>
            )}
          </View>

          {/* Ammonia */}
          <View style={styles.menuMobile}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenAmmonia(!isOpenAmmonia)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/ammonia.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Ammonia</ThemedText>
              </View>
              <AntDesign
                name={isOpenAmmonia ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenAmmonia && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 25 ppm{'\n'}
                  ปลอดภัย ไม่มีผลกระทบต่อสุขภาพ การทำงานหรือการหายใจในพื้นที่นี้ถือว่าปลอดภัย{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  25 - 50 ppm{'\n'}
                  ระดับแอมโมเนียที่ไม่เป็นอันตรายในพื้นที่ที่มีการระบายอากาศดี อาจมีการระคายเคืองเล็กน้อย{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  มากกว่า 50 ppm{'\n'}
                  ระดับอันตราย! การหายใจในพื้นที่ที่มีระดับแอมโมเนียสูงอาจทำให้เกิดการระคายเคืองที่ระบบทางเดินหายใจ ตา และผิวหนัง ควรระมัดระวังและหลีกเลี่ยง
                </ThemedText>
              </View>
            )}
          </View>

          {/* Nitrogen Dioxide */}
          <View style={styles.menuMobile}>
            <TouchableOpacity
              style={styles.menuMobileButton}
              onPress={() => setIsOpenNitrogenDioxide(!isOpenNitrogenDioxide)}
              activeOpacity={0.7}
            >
              <View style={styles.menuMobileHeader}>
                <Image
                  source={require('@/assets/images/atmospheric-chemistry.png')}
                  style={{ width: 24, height: 24 }}
                />
                <ThemedText style={styles.menuMobileTitle}>Nitrogen Dioxide</ThemedText>
              </View>
              <AntDesign
                name={isOpenNitrogenDioxide ? 'up' : 'down'}
                size={16}
                color="#3b3b3b"
              />
            </TouchableOpacity>
            {isOpenNitrogenDioxide && (
              <View style={styles.menuMobileContent}>
                <ThemedText>
                  <ThemedText style={{ color: '#080bb4' }}>ระดับต่ำ: (Low){'\n'}</ThemedText>
                  ต่ำกว่า 50 ppb{'\n'}
                  ปลอดภัยสำหรับการหายใจ ไม่มีผลกระทบต่อสุขภาพในระยะยาว{'\n'}
                  <ThemedText style={{ color: '#058625' }}>ระดับปกติ: (Normal){'\n'}</ThemedText>
                  50 - 100 ppb{'\n'}
                  ความเข้มข้นปกติในอากาศที่อาจพบได้ในพื้นที่ที่มีการจราจรหรือในเมือง{'\n'}
                  <ThemedText style={{ color: '#ff0000' }}>ระดับสูง: (High){'\n'}</ThemedText>
                  มากกว่า 100 ppb{'\n'}
                  อาจเป็นอันตรายต่อระบบทางเดินหายใจและส่งผลกระทบต่อสุขภาพในระยะยาว เช่น โรคหอบหืดและการหายใจลำบาก
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
});
