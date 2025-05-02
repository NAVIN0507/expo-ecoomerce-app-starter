import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Image, TextInput, FlatList, SafeAreaView, StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

// Types
type CategoryItemProps = {
  title: string;
  icon: string;
  active?: boolean;
  onPress: () => void;
};

type ProductItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  onPress: () => void;
  isGrid?: boolean;
};

// Mock data
const categories = [
  { id: '1', title: 'All', icon: 'grid' },
  { id: '2', title: 'Clothing', icon: 'shopping-bag' },
  { id: '3', title: 'Electronics', icon: 'smartphone' },
  { id: '4', title: 'Home', icon: 'home' },
  { id: '5', title: 'Beauty', icon: 'star' },
  { id: '6', title: 'Sports', icon: 'activity' },
];

const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Fitness Tracker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&q=80',
    rating: 4.0,
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Wireless Charger',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1618441213093-ac8e11fdf28f?w=500&q=80',
    rating: 3.9,
  },
  {
    id: '6',
    name: 'Phone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1541877590-a280a81eedcd?w=500&q=80',
    rating: 4.1,
  },
];

// Components
const CategoryItem = ({ title, icon, active = false, onPress }: CategoryItemProps) => (
  <TouchableOpacity
    style={[styles.categoryItem, active && styles.categoryItemActive]}
    onPress={onPress}
  >
    <Feather name={icon as any} size={20} color={active ? '#FFFFFF' : '#333333'} />
    <Text style={[styles.categoryTitle, active && styles.categoryTitleActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const ProductItem = ({ name, price, image, rating, onPress, isGrid = false }: ProductItemProps) => (
  <TouchableOpacity
    style={[styles.productCard, isGrid && styles.gridCard]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Image source={{ uri: image }} style={[styles.productImage, isGrid && styles.gridImage]} />
    {isGrid && (
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingBadgeText}>⭐ {rating.toFixed(1)}</Text>
      </View>
    )}
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={2}>{name}</Text>
      <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const SectionHeader = ({ title, onSeeAll }: { title: string; onSeeAll: () => void }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll}>
      <Text style={styles.seeAllButton}>See All</Text>
    </TouchableOpacity>
  </View>
);

const ExploreScreen = () => {
  const [activeCategory, setActiveCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleProductPress = (productId: string) => {
    console.log(`Product pressed: ${productId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Find amazing products</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Feather name="shopping-cart" size={24} color="#333" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color="#777" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                title={category.title}
                icon={category.icon}
                active={activeCategory === category.id}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <SectionHeader title="Featured Products" onSeeAll={() => console.log('See all featured')} />
        <FlatList
          data={products.slice(0, 3)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductItem {...item} onPress={() => handleProductPress(item.id)} />
          )}
        />

        {/* Popular Products - Grid */}
        <SectionHeader title="Popular Now" onSeeAll={() => console.log('See all popular')} />
        <View style={styles.popularGrid}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              {...product}
              onPress={() => handleProductPress(product.id)}
              isGrid
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryItemActive: {
    backgroundColor: '#2A86FF',
  },
  categoryTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333333',
  },
  categoryTitleActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#2A86FF',
    fontWeight: '500',
  },
  featuredContainer: {
    paddingLeft: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  gridCard: {
    width: '47%',
    marginBottom: 16,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  gridImage: {
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A86FF',
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
