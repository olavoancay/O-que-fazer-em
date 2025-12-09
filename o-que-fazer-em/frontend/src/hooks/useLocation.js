import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Pedir permissão
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permissão de localização negada');
        Alert.alert(
          'Permissão Necessária',
          'Precisamos da sua localização para mostrar restaurantes próximos.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      // 2. Pegar localização atual
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      setLocation({
        latitude,
        longitude,
      });

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01, // Zoom mais próximo
        longitudeDelta: 0.01,
      });

      setLoading(false);
    } catch (err) {
      console.error('Erro ao obter localização:', err);
      setError(err.message);
      setLoading(false);
      
      Alert.alert(
        'Erro',
        'Não foi possível obter sua localização. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  const refreshLocation = () => {
    getCurrentLocation();
  };

  return {
    location,
    region,
    loading,
    error,
    refreshLocation,
  };
}