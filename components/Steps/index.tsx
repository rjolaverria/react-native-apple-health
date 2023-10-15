import { useCallback, useEffect, useState } from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import { useDate } from '../../context/Date';

const Steps = () => {
  const [steps, setSteps] = useState(0);
  const { startDate, endDate } = useDate();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const fetchSteps = useCallback(() => {
    AppleHealthKit?.getStepCount(
      options,
      (callbackError: string, result: HealthValue) => {
        setSteps(result?.value || 0);

        if (callbackError) {
          console.error(callbackError);
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  return <BiometricCard icon='walk' title='Steps' value={steps} unit='steps' />;
};

export default Steps;
