import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const cartItems = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 59.99,
    image:
      'https://images.unsplash.com/photo-1585386959984-a4155224b4d3?auto=format&fit=crop&w=100&q=80',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 129.49,
    image:
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=100&q=80',
    quantity: 2,
  },
  {
    id: '3',
    name: 'Portable Speaker',
    price: 89.0,
    image:
      'https://images.unsplash.com/photo-1606813902914-0e032a706b9f?auto=format&fit=crop&w=100&q=80',
    quantity: 1,
  },
];

const CartScreen = () => {
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }: any) => (
    <View style={styles.glassCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <Icon name="remove-circle-outline" size={22} color="#38ef7d" />
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Icon name="add-circle-outline" size={22} color="#38ef7d" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0f2027', '#2c5364']} style={styles.header}>
        <Text style={styles.headerText}>🛒 Your Cart</Text>
      </LinearGradient>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <LinearGradient colors={['#38ef7d', '#11998e']} style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Icon name="card-outline" size={20} color="#fff" />
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  glassCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    backdropFilter: 'blur(10px)', // iOS only
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 14,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemPrice: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkoutButton: {
    backgroundColor: '#0f0f0f70',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});


export default CartScreen;
