import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Animated,
  RefreshControl,
  Platform
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = CARD_WIDTH * 1.6;

type Props = {};

const HomeScreen = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Simulate a refreshing state
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  // Luxury product categories with icons
  const categories = [
    { name: 'All', icon: 'view-grid' },
    { name: 'Apparel', icon: 'tshirt' },
    { name: 'Accessories', icon: 'watch' },
    { name: 'Bags', icon: 'shopping-bag' },
    { name: 'Shoes', icon: 'shoe-heel' },
    { name: 'Jewelry', icon: 'diamond' }
  ];

  // Luxury product data with Unsplash images
  const products = [
    {
      id: '1',
      name: 'Refined Silk Blazer',
      price: '$1,295',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80',
      category: 'Apparel',
      rating: 4.8,
      isFavorite: true,
      isNew: true
    },
    {
      id: '2',
      name: 'Signature Leather Bag',
      price: '$2,750',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80',
      category: 'Bags',
      rating: 4.9,
      isFavorite: false,
      discount: '15%'
    },
    {
      id: '3',
      name: 'Diamond Pendant',
      price: '$4,500',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
      category: 'Jewelry',
      rating: 5.0,
      isFavorite: true,
      isNew: true
    },
    {
      id: '4',
      name: 'Artisan Watch',
      price: '$12,800',
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80',
      category: 'Accessories',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '5',
      name: 'Designer Heels',
      price: '$895',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      category: 'Shoes',
      rating: 4.7,
      isFavorite: true,
      discount: '10%'
    },
    {
      id: '6',
      name: 'Cashmere Coat',
      price: '$3,250',
      image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
      category: 'Apparel',
      rating: 4.8,
      isFavorite: false,
      isNew: true
    },
    {
      id: '7',
      name: 'Silk Evening Gown',
      price: '$4,750',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1035&q=80',
      category: 'Apparel',
      rating: 4.9,
      isFavorite: true
    },
    {
      id: '8',
      name: 'Leather Weekender',
      price: '$1,895',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=996&q=80',
      category: 'Bags',
      rating: 4.6,
      isFavorite: false,
      discount: '20%'
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  // Function to toggle favorite with haptic feedback
  const toggleFavorite = (id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would update state
  };

  // Toggle filter modal with haptic feedback
  const toggleFilterModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowFilterModal(!showFilterModal);
  };

  // Render each product card
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.9}
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <BlurView intensity={80} tint="dark" style={styles.blurButton}>
            <FontAwesome5
              name={item.isFavorite ? "heart" : "heart"}
              size={16}
              color={item.isFavorite ? "#FF416C" : "rgba(255,255,255,0.7)"}
              solid={item.isFavorite}
            />
          </BlurView>
        </TouchableOpacity>

        {/* New Tag */}
        {item.isNew && (
          <BlurView intensity={80} tint="dark" style={styles.newTag}>
            <Text style={styles.newTagText}>NEW</Text>
          </BlurView>
        )}

        {/* Discount Tag */}
        {item.discount && (
          <LinearGradient
            colors={['#FF416C', '#FF4B2B']}
            style={styles.discountTag}
          >
            <Text style={styles.discountTagText}>{item.discount}</Text>
          </LinearGradient>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome5 name="star" size={12} color="#FFC107" solid />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render category button
  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.name}
      style={[
        styles.categoryButton,
        selectedCategory === category.name && styles.categoryButtonActive
      ]}
      onPress={() => {
        setSelectedCategory(category.name);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    >
      <MaterialIcons
        name={category.icon}
        size={20}
        color={selectedCategory === category.name ? '#FF416C' : '#888'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category.name && styles.categoryTextActive
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Animated Header */}
      <Animated.View style={[styles.headerShadow, { opacity: headerOpacity }]}>
        <BlurView intensity={80} tint="light" style={styles.headerBlur} />
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF416C"
          />
        }
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.headerTitle}>Discover Luxury</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="search-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="notifications-outline" size={24} color="#333" />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Featured Banner */}
          <TouchableOpacity activeOpacity={0.9} style={styles.featureBanner}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80' }}
              style={styles.featureImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.featureGradient}
            >
              <View style={styles.featureContent}>
                <Text style={styles.featureBadge}>EXCLUSIVE</Text>
                <Text style={styles.featureTitle}>Summer Collection</Text>
                <Text style={styles.featureSubtitle}>Up to 30% off select styles</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={toggleFilterModal}>
              <View style={styles.filterButton}>
                <Ionicons name="options-outline" size={16} color="#333" />
                <Text style={styles.filterText}>Filter</Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => renderCategoryButton(category))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productsGrid}>
            {filteredProducts.map(item => (
              <View key={item.id} style={styles.productCardWrapper}>
                {renderProductCard({ item })}
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Filter Modal */}
      {showFilterModal && (
        <BlurView intensity={40} tint="dark" style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalDismiss}
            onPress={toggleFilterModal}
            activeOpacity={1}
          >
            <View style={styles.filterModal}>
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>Filter Products</Text>
                <TouchableOpacity onPress={toggleFilterModal}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.priceSlider}>
                  <View style={styles.sliderTrack}>
                    <View style={styles.sliderFill} />
                    <View style={[styles.sliderHandle, styles.sliderHandleStart]} />
                    <View style={[styles.sliderHandle, styles.sliderHandleEnd]} />
                  </View>
                  <View style={styles.priceLabels}>
                    <Text style={styles.priceLabel}>$100</Text>
                    <Text style={styles.priceLabel}>$10,000+</Text>
                  </View>
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Sort By</Text>
                <View style={styles.sortOptions}>
                  {['Newest', 'Popularity', 'Price: High-Low', 'Price: Low-High'].map(option => (
                    <TouchableOpacity key={option} style={styles.sortOption}>
                      <Text style={styles.sortOptionText}>{option}</Text>
                      {option === 'Newest' && (
                        <View style={styles.checkmark}>
                          <Ionicons name="checkmark" size={18} color="#FFF" />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterActions}>
                <TouchableOpacity style={styles.resetButton}>
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={toggleFilterModal}
                >
                  <LinearGradient
                    colors={['#FF416C', '#FF4B2B']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.applyButtonGradient}
                  >
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  scrollViewContent: {
    paddingBottom: 30
  },
  headerShadow: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 100 : 70,
    zIndex: 10,
  },
  headerBlur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF416C'
  },
  featureBanner: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  featureImage: {
    width: '100%',
    height: '100%'
  },
  featureGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 20
  },
  featureContent: {
    justifyContent: 'flex-end'
  },
  featureBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#FF416C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4
  },
  featureSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)'
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4
  },
  categoriesContainer: {
    paddingRight: 20
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(255,65,108,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,65,108,0.3)'
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8
  },
  categoryTextActive: {
    color: '#FF416C',
    fontWeight: '600'
  },
  productsSection: {
    paddingHorizontal: 20
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF416C',
    fontWeight: '500'
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  productCardWrapper: {
    width: '48%',
    marginBottom: 20
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.3,
    position: 'relative'
  },
  productImage: {
    width: '100%',
    height: '100%'
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  blurButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    overflow: 'hidden'
  },
  newTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF'
  },
  discountTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4
  },
  discountTagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF'
  },
  productInfo: {
    padding: 12
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    height: 44
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000
  },
  modalDismiss: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  filterModal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111'
  },
  filterSection: {
    marginBottom: 20
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15
  },
  priceSlider: {
    marginHorizontal: 10
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 12,
    position: 'relative'
  },
  sliderFill: {
    position: 'absolute',
    height: 4,
    left: '20%',
    right: '30%',
    backgroundColor: '#FF416C',
    borderRadius: 2
  },
  sliderHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF416C',
    top: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  },
  sliderHandleStart: {
    left: '20%',
    marginLeft: -10
  },
  sliderHandleEnd: {
    right: '30%',
    marginRight: -10
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceLabel: {
    fontSize: 14,
    color: '#666'
  },
  sortOptions: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden'
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  sortOptionText: {
    fontSize: 15,
    color: '#333'
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF416C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterActions: {
    flexDirection: 'row',
    marginTop: 10
  },
  resetButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    marginRight: 10
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500'
  },
  applyButton: {
    flex: 2,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  applyButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF'
  }
});