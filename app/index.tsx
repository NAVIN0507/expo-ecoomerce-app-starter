import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
  Animated
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

type Props = {};

const WelcomeScreen = (props: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1589363460779-dc892eaea70c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80',
    'https://images.unsplash.com/photo-1623002518151-02f7a7fc0r4i?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80',
    'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-1.2.1&auto=format&fit=crop&w=3302&q=80',
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=2240&q=80',
  ];

  // Luxury features list with enhanced descriptions
  const features = [
    {
      icon: "diamond",
      text: "Curated Luxury",
      description: "Handpicked premium collections"
    },
    {
      icon: "shield-check",
      text: "Authenticity",
      description: "100% verified authentic items"
    },
    {
      icon: "shipping-fast",
      text: "White Glove Service",
      description: "Premium delivery experience"
    },
  ];

  // Smooth crossfade transition between images
  const crossfadeImages = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
  };

  // Entrance animation for content
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Auto-rotate background images with crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      crossfadeImages();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Haptic feedback for buttons
  const handleButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Background Image with Animated Fade */}
      <Animated.View style={[styles.backgroundContainer, { opacity: fadeAnim }]}>
        <ImageBackground
          source={{ uri: backgroundImages[currentImage] }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.85)']}
            locations={[0, 0.7, 1]}
            style={styles.overlay}
          />
        </ImageBackground>
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        {/* Logo and Brand Section */}
        <Animated.View
          style={[
            styles.brandContainer,
            {transform: [{ translateY: translateY }]}
          ]}
        >
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#FF6B6B', '#FF416C']}
              style={styles.logoGradient}
            >
              <MaterialCommunityIcons name="shopping" size={38} color="#FFF" />
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>LUXE</Text>
          <Text style={styles.tagline}>Elevate Your Lifestyle</Text>
        </Animated.View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>Experience Excellence</Text>
          <Text style={styles.welcomeSubtitle}>
            Discover a world of curated luxury at your fingertips
          </Text>

          {/* Enhanced Features List */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <LinearGradient
                  colors={['rgba(255,65,108,0.8)', 'rgba(255,75,43,0.8)']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.featureIconContainer}
                >
                  <FontAwesome5 name={feature.icon} size={22} color="#FFF" />
                </LinearGradient>
                <Text style={styles.featureText}>{feature.text}</Text>
                <Text style={styles.featureSubtext}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Enhanced Pagination Dots */}
        <View style={styles.paginationContainer}>
          {backgroundImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentImage === index && styles.paginationDotActive
              ]}
            />
          ))}
        </View>

        {/* Buttons Container with Glass Effect */}
        <BlurView intensity={20} tint="dark" style={styles.buttonsContainerBlur}>
          <View style={styles.buttonsContainer}>
            <Link href="/signin" asChild>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleButtonPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF416C', '#FF4B2B']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.signInButtonText}>SIGN IN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>

            <Link href="/signup" asChild>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleButtonPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Link>

            <Link href="/(tabs)" asChild>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={handleButtonPress}
                activeOpacity={0.7}
              >
                <Text style={styles.guestButtonText}>Explore as Guest</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </BlurView>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundContainer: {
    position: 'absolute',
    width: width,
    height: height,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: "#FF4B2B",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
  },
  logoGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 6,
    textShadowColor: 'rgba(255, 65, 108, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 15,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 10,
    letterSpacing: 1.5,
    fontWeight: '300',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 50,
    paddingHorizontal: 20,
    fontWeight: '300',
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3 - 30,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: "#FF416C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  featureText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  featureSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 5,
    transition: 'all 0.3s ease',
  },
  paginationDotActive: {
    backgroundColor: '#FF416C',
    width: 24,
  },
  buttonsContainerBlur: {
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 30 : 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buttonsContainer: {
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
  signInButton: {
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: "#FF4B2B",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  signUpButton: {
    height: 58,
    borderRadius: 29,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  guestButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});