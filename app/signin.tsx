import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

type Props = {}

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const handleSignIn = () => {
    // Add authentication logic here
    router.dismissAll()
    router.push('/(tabs)')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image with Overlay */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={styles.overlay}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          {/* Top Brand Section */}
          <View style={styles.brandContainer}>
            <View style={styles.logoWrapper}>
              <MaterialCommunityIcons name="shopping" size={30} color="#FFF" />
            </View>
            <Text style={styles.brandName}>LUXE</Text>
            <Text style={styles.tagline}>Premium Shopping Experience</Text>
          </View>

          {/* Main Content Card */}
          <View style={styles.cardContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>Sign in to continue shopping</Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#555" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {/* Remember me & Forgot Password Row */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberMeContainer}>
                <TouchableOpacity style={styles.checkbox}>
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FF416C', '#FF4B2B']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.signInGradient}
              >
                <Text style={styles.signInButtonText}>SIGN IN</Text>
                <View style={styles.arrowContainer}>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                <FontAwesome5 name="google" size={18} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
                <FontAwesome5 name="apple" size={18} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                <FontAwesome5 name="facebook-f" size={18} color="#4267B2" />
              </TouchableOpacity>
            </View>

            {/* Guest Checkout Option */}
            <TouchableOpacity style={styles.guestCheckoutButton} onPress={() => router.push('/(tabs)')}>
              <Text style={styles.guestCheckoutText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section with Additional Info */}
          <View style={styles.bottomSection}>
            <View style={styles.featuresRow}>
              <View style={styles.featureItem}>
                <Ionicons name="cube-outline" size={16} color="#FFF" />
                <Text style={styles.featureText}>Fast Delivery</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark-outline" size={16} color="#FFF" />
                <Text style={styles.featureText}>Secure Payment</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="refresh-outline" size={16} color="#FFF" />
                <Text style={styles.featureText}>Easy Returns</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: 20,
  },
  logoWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,70,60,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#FF4B2B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
    letterSpacing: 1,
  },
  cardContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  welcomeContainer: {
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    height: 55,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#FF4B2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    color: '#555',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#FF4B2B',
    fontSize: 14,
    fontWeight: '600',
  },
  signInButton: {
    height: 55,
    borderRadius: 12,
    marginBottom: 25,
    overflow: 'hidden',
  },
  signInGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  googleButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  appleButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  facebookButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  guestCheckoutButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestCheckoutText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  signUpText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
  },
  signUpButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginLeft: 5,
  },
});