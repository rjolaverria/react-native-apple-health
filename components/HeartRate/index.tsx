import { useCallback, useEffect, useState } from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import { useDate } from '../../context/Date';

const HeartRate = () => {
  const [heartRate, setHeartRate] = useState(0);
  const { startDate, endDate } = useDate();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const getAverageHeartRate = (results: HealthValue[]) => {
    const heartRateSum = results?.reduce((sum, { value }) => sum + value, 0);

    return heartRateSum ? heartRateSum / results.length : 0;
  };

  const fetchHeartRate = useCallback(() => {
    AppleHealthKit?.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        setHeartRate(getAverageHeartRate(results));

        if (callbackError) {
          console.error(callbackError);
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchHeartRate();
  }, [fetchHeartRate]);

  return (
    <BiometricCard
      icon='heart'
      iconColor='red'
      title='Heart Rate'
      value={heartRate}
      unit='bpm'
    />
  );
};

export default HeartRate;
