import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './cartStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const carrinhoVazio = true;

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Inicialize o valor total com 0

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
    
          // Certifique-se de que o preço é um número
          const validatedCart = parsedCart.map(product => ({
            ...product,
            price: parseFloat(product.price),
          }));
    
          setCart(validatedCart);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho do AsyncStorage', error);
      }
    };

    loadCartFromStorage();
  }, []);

  
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart]);
  

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Animatable.Image
          animation="bounceIn"
          duration={1000}
          source={require('../../assets/carrinho.png')}
          style={styles.containerLogo}
          resizeMode="contain"
        />
      ) : (
        <ScrollView style={{ marginBottom: 102 }}>
          {cart.map((product, index) => (
            <View key={product.id || index} style={styles.productContainer}>
              <Image
                source={{ uri: product.thumbnail_url }}
                style={styles.imagemProduto}
              />
              <Text>{product.name}</Text>
              <Text>Quantidade: {product.quantity}</Text>
              <Text>Preço: R$ {product.price}</Text>
            </View>
            
          ))}
          {cart.length > 0 && (
        <Text style={styles.textTotal}>Total: R$ {totalPrice}</Text>

      )}
          <TouchableOpacity
        style={styles.buttonComprar}
        onPress={() => navigation.navigate('Pay')} 
        
        >
        <Text style={styles.textButtonComprar}>Continuar</Text>
      </TouchableOpacity>
        </ScrollView>
      )}

      {cart.length === 0 && (
        <Text style={styles.textVazio}>O carrinho está vazio</Text>
      )}

      

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
          <Icon name="cart" size={37} color="black" />

        
        </TouchableOpacity>
      </View>
    </View>
  );
}
