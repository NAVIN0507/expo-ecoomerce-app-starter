import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

type Props = {}

const SignUpScreen = (props: Props) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSignUp = () => {
    // Add registration logic here
    router.dismissAll()
    router.push('/(tabs)')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Image with Overlay */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            style={styles.keyboardAvoid}
          >
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Top Brand Section */}
            <View style={styles.brandContainer}>
              <View style={styles.logoWrapper}>
                <MaterialCommunityIcons name="shopping" size={30} color="#FFF" />
              </View>
              <Text style={styles.brandName}>LUXE</Text>
              <Text style={styles.tagline}>Create Your Shopping Account</Text>
            </View>

            {/* Main Content Card */}
            <View style={styles.cardContainer}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Join LUXE</Text>
                <Text style={styles.subtitleText}>Sign up for exclusive offers & rewards</Text>
              </View>

              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={22} color="#555" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={setFullName}
                />
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

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#555" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  secureTextEntry={secureConfirmTextEntry}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={secureConfirmTextEntry ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>

              {/* Terms & Conditions Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                >
                  {agreedToTerms && <Ionicons name="checkmark" size={16} color="#FFF" />}
                </TouchableOpacity>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>{' '}
                    and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[styles.signUpButton, !agreedToTerms && styles.disabledButton]}
                onPress={handleSignUp}
                activeOpacity={0.8}
                disabled={!agreedToTerms}
              >
                <LinearGradient
                  colors={agreedToTerms ? ['#FF416C', '#FF4B2B'] : ['#CCCCCC', '#AAAAAA']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.signUpGradient}
                >
                  <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                  <FontAwesome5 name="google" size={18} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
                  <FontAwesome5 name="apple" size={18} color="#000" />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              {/* Facebook Button */}
              <TouchableOpacity style={[styles.socialButton, styles.facebookButtonFull]}>
                <FontAwesome5 name="facebook-f" size={18} color="#4267B2" />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Section with Benefits */}
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Shopping with LUXE includes:</Text>

              <View style={styles.benefitRow}>
                <View style={styles.benefitIconContainer}>
                  <Ionicons name="gift-outline" size={18} color="#FF416C" />
                </View>
                <Text style={styles.benefitText}>Exclusive first-time user discounts</Text>
              </View>

              <View style={styles.benefitRow}>
                <View style={styles.benefitIconContainer}>
                  <Ionicons name="star-outline" size={18} color="#FF416C" />
                </View>
                <Text style={styles.benefitText}>LUXE Rewards Program</Text>
              </View>

              <View style={styles.benefitRow}>
                <View style={styles.benefitIconContainer}>
                  <Ionicons name="notifications-outline" size={18} color="#FF416C" />
                </View>
                <Text style={styles.benefitText}>New release alerts & early access</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SignUpScreen

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
  scrollContainer: {
    flexGrow: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: height * 0.06,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
    paddingRight: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF4B2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: '#FF4B2B',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: '#FF4B2B',
    fontWeight: '600',
  },
  signUpButton: {
    height: 55,
    borderRadius: 12,
    marginBottom: 25,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.7,
  },
  signUpGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
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
    paddingHorizontal: 15,
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
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
    flex: 1,
    marginRight: 8,
  },
  appleButton: {
    flex: 1,
    marginLeft: 8,
  },
  facebookButtonFull: {
    marginBottom: 16,
  },
  socialButtonText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  signInText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
  },
  signInButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  benefitsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    padding: 20,
  },
  benefitsTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
});