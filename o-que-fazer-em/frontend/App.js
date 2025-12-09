import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapScreen from './src/screens/MapScreen/MapScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <MapScreen />
    </>
  );
}
