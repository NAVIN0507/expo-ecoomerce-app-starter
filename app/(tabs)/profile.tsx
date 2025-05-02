import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';

type Props = {};

const ProfileScreen = (props: Props) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <LinearGradient colors={['#6C63FF', '#3F3D56']} style={styles.headerBackground}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Navin N</Text>
          <Text style={styles.email}>navinofficial2005@gmail.com</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Cart</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Feather name="user" size={20} color="#6C63FF" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="notifications-outline" size={22} color="#6C63FF" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Feather name="settings" size={20} color="#6C63FF" />
          <Text style={styles.optionText}>App Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Feather name="log-out" size={20} color="#FF4757" />
          <Text style={[styles.optionText, { color: '#FF4757' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerBackground: {
    paddingBottom: 100,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  profileCard: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#dcdcdc',
  },
  optionsContainer: {
    marginTop: -60,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#333',
  },
});
