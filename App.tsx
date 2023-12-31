import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { getTheme } from './theme';
import Home from './pages/Home';

import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.MindfulSession,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
    ],
  },
} as HealthKitPermissions;

AppleHealthKit?.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }
});

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={getTheme(colorScheme)}>
      <Home />
    </PaperProvider>
  );
}
