import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../../hooks/useLocation';

export default function MapScreen() {
  const { location, errorMsg, loading } = useLocation();
  
  const [restaurants, setRestaurants] = useState([
    {
      id: '1',
      name: 'Pizzaria Bella',
      type: 'Italiana',
      latitude: -27.5969,
      longitude: -48.5482,
      category: 'visited'
    },
    {
      id: '2',
      name: 'Sushi Place',
      type: 'Japonesa',
      latitude: -27.5950,
      longitude: -48.5450,
      category: 'favorite'
    }
  ]);

  const getMarkerColor = (category) => {
    switch(category) {
      case 'visited': return '#4CAF50';
      case 'favorite': return '#FF5722';
      case 'recommended': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {errorMsg}</Text>
        <Text style={styles.hintText}>
          Verifique se permitiu acesso à localização nas configurações
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        loadingEnabled={true}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={restaurant.type}
            pinColor={getMarkerColor(restaurant.category)}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Visitados</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF5722' }]} />
          <Text style={styles.legendText}>Favoritos</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
          <Text style={styles.legendText}>Recomendados</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#FF5722',
    textAlign: 'center',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  legend: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});