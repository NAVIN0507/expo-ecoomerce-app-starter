import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    description: 'Your order #1234 has been confirmed.',
    time: '2 min ago',
    icon: 'check-circle',
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'Delivery Scheduled',
    description: 'Your item will be delivered tomorrow.',
    time: '1 hour ago',
    icon: 'truck',
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Promotion',
    description: 'Get 30% off on your next purchase!',
    time: '3 hours ago',
    icon: 'gift',
    color: '#FF9800',
  },
  {
    id: '4',
    title: 'Payment Received',
    description: 'We have received your payment of $129.99.',
    time: 'Yesterday',
    icon: 'credit-card',
    color: '#9C27B0',
  },
  {
    id: '5',
    title: 'Review Reminder',
    description: 'Rate your recent purchase.',
    time: '2 days ago',
    icon: 'star',
    color: '#FFC107',
  },
];

const NotificationsScreen = () => {
  const renderItem = ({ item, index }: { item: Notification; index: number }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
        <Feather name={item.icon} size={22} color={item.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4A00E0', '#8E2DE2']} style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </LinearGradient>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default NotificationsScreen;
