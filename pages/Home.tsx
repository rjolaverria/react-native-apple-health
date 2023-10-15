import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeartRate from '../components/HeartRate';
import Steps from '../components/Steps';
import Sleep from '../components/Sleep';
import Mindfulness from '../components/Mindfulness';
import { DateProvider } from '../context/Date';

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <DateProvider>
      <View style={{ paddingTop: insets.top + 24, paddingBottom: 0 }}>
        <Text variant='headlineLarge' style={{ marginLeft: 16 }}>
          Today
        </Text>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 16,
              gap: 16,
            }}
          >
            <HeartRate />
            <Steps />
            <Sleep />
            <Mindfulness />
          </View>
        </ScrollView>
      </View>
    </DateProvider>
  );
};

export default Home;
