import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function ProfileScreen({ navigation }) {
  // Dados mockados do usuário
  const { logout } = useAuth();
  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    photo: 'https://via.placeholder.com/150',
    stats: {
      visited: 24,
      favorites: 12,
      friends: 18,
    },
  };

  const handleLogout = () => {
  Alert.alert(
    'Sair',
    'Tem certeza que deseja sair?',
    [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Sair', 
        style: 'destructive',
        onPress: () => {
          logout();
        }
      },
    ]
  );
};

  const MenuItem = ({ icon, title, onPress, danger }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={danger ? COLORS.error : COLORS.darkGray} 
      />
      <Text style={[styles.menuText, danger && styles.dangerText]}>
        {title}
      </Text>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={COLORS.gray} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header com foto e nome */}
        <View style={styles.header}>
          <Image
            source={{ uri: user.photo }}
            style={styles.photo}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.visited}</Text>
            <Text style={styles.statLabel}>Visitados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.favorites}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.friends}</Text>
            <Text style={styles.statLabel}>Amigos</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          <MenuItem
            icon="person-outline"
            title="Editar Perfil"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          />
          <MenuItem
            icon="heart-outline"
            title="Meus Favoritos"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          />
          <MenuItem
            icon="people-outline"
            title="Amigos"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          />
          <MenuItem
            icon="settings-outline"
            title="Configurações"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Ajuda"
            onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          />
          <MenuItem
            icon="log-out-outline"
            title="Sair"
            onPress={handleLogout}
            danger
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: COLORS.gray,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.gray,
  },
  menu: {
    backgroundColor: COLORS.white,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 15,
  },
  dangerText: {
    color: COLORS.error,
  },
});