import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';

export default function ProfileScreen() {
  // Dados de exemplo (depois virão do backend/context)
  const userData = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&size=150&background=FF5722&color=fff',
    stats: {
      visited: 24,
      favorites: 12,
      wantToGo: 8,
    }
  };

  const restaurantLists = [
    { id: '1', name: '❤️ Favoritos', count: 12 },
    { id: '2', name: '⭐ Quero Ir', count: 8 },
    { id: '3', name: '☕ Cafés para Estudar', count: 5 },
    { id: '4', name: '🍣 Comida Asiática', count: 7 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header com avatar e info */}
      <View style={styles.header}>
        <Image 
          source={{ uri: userData.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userData.stats.visited}</Text>
          <Text style={styles.statLabel}>Visitados</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userData.stats.favorites}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userData.stats.wantToGo}</Text>
          <Text style={styles.statLabel}>Quero Ir</Text>
        </View>
      </View>

      {/* Listas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas Listas</Text>
        
        {restaurantLists.map((list) => (
          <TouchableOpacity 
            key={list.id}
            style={styles.listItem}
            onPress={() => console.log('Abrir lista:', list.name)}
          >
            <Text style={styles.listName}>{list.name}</Text>
            <View style={styles.listCount}>
              <Text style={styles.listCountText}>{list.count}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addListButton}>
          <Text style={styles.addListText}>+ Nova Lista</Text>
        </TouchableOpacity>
      </View>

      {/* Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🍴 Preferências Alimentares</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔔 Notificações</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔒 Privacidade</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>👥 Gerenciar Amigos</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de sair */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginTop: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listName: {
    fontSize: 16,
    color: '#333',
  },
  listCount: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  listCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addListButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addListText: {
    fontSize: 16,
    color: '#FF5722',
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  logoutText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    height: 40,
  },
});