import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './favoritesStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FavoriteProducts ({ favorites }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 102 }}>
        {favorites.map((product, index) => (
          <View key={product.id || index} style={styles.productContainer}>
            <Image source={{ uri: product.thumbnail }} style={styles.imagemProduto} />
            <Text>{product.title}</Text>
            <Text>Preço: R$ {product.price}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.containerBar}>
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="home" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="cart" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Icon name="heart" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Icon name="chat" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};