import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import useLocation from '../../hooks/useLocation';
import { COLORS } from '../../constants/colors';

export default function MapScreen() {
  const mapRef = useRef(null);
  const { location, region, loading, error, refreshLocation } = useLocation();
  const [restaurants, setRestaurants] = useState([]);

  // Dados mockados de restaurantes
  const mockRestaurants = [
    {
      id: '1',
      name: 'Restaurante Italiano',
      latitude: -27.5954,
      longitude: -48.5480,
      cuisine: 'Italiana',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Sushi Bar',
      latitude: -27.5900,
      longitude: -48.5500,
      cuisine: 'Japonesa',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Churrascaria',
      latitude: -27.5980,
      longitude: -48.5460,
      cuisine: 'Brasileira',
      rating: 4.3,
    },
  ];

  React.useEffect(() => {
    setRestaurants(mockRestaurants);
  }, []);

  // Centralizar mapa na sua localização
  const centerOnUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  // Quando clicar em um restaurante
  const handleMarkerPress = (restaurant) => {
    Alert.alert(
      restaurant.name,
      `${restaurant.cuisine} • ${restaurant.rating} ⭐`,
      [
        { text: 'Ver Detalhes', onPress: () => console.log('Ver detalhes') },
        { text: 'Fechar', style: 'cancel' },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  if (error || !region) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="location-outline" size={64} color={COLORS.gray} />
        <Text style={styles.errorTitle}>Localização não disponível</Text>
        <Text style={styles.errorText}>
          {error || 'Não foi possível obter sua localização'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={refreshLocation}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        loadingEnabled={true}
        loadingIndicatorColor={COLORS.primary}
        loadingBackgroundColor={COLORS.white}
      >
        {/* Markers dos restaurantes */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={`${restaurant.cuisine} • ${restaurant.rating} ⭐`}
            onPress={() => handleMarkerPress(restaurant)}
          >
            {/* Ícone customizado do marker */}
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Ionicons name="restaurant" size={20} color={COLORS.white} />
              </View>
              <View style={styles.markerArrow} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Botão para centralizar na sua localização */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={centerOnUserLocation}
      >
        <Ionicons name="locate" size={24} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Informação da sua localização (opcional, para debug) */}
      {location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationInfoText}>
            📍 Lat: {location.latitude.toFixed(4)} | Long: {location.longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  locationInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  locationInfoText: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontFamily: 'monospace',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
    marginTop: -1,
  },
});