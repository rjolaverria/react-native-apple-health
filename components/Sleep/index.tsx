import { useCallback, useEffect, useState } from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import { useDate } from '../../context/Date';
import { getMinsDifference } from '../../utils';

const Sleep = () => {
  const [sleep, setSleep] = useState(0);
  const { startDate, endDate } = useDate();

  const options = {
    startDate: new Date(
      startDate.getTime() - 24 * 60 * 60 * 1000
    ).toISOString(),
    endDate: endDate.toISOString(),
  };

  const getTotalSleepTime = (results: HealthValue[]) =>
    results?.reduce(
      (sum, { endDate, startDate }) =>
        sum + getMinsDifference(startDate, endDate),
      0
    ) || 0;

  const fetchSleepSamples = useCallback(() => {
    AppleHealthKit?.getSleepSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        setSleep(+(getTotalSleepTime(results) / 60).toFixed(2));

        if (callbackError) {
          console.error(callbackError);
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchSleepSamples();
  }, [fetchSleepSamples]);

  return (
    <BiometricCard icon='bed-empty' title='Sleep' value={sleep} unit='hrs' />
  );
};

export default Sleep;
