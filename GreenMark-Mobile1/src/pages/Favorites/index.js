import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./favoritesStyles";
import FavoriteProducts from "./favoritesProducts";

export default function Favorites() {
  const navigation = useNavigation();
  const route = useRoute();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavoritesFromStorage = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem("favorites");
        if (favoritesData) {
          setFavorites([]);
          setFavorites(JSON.parse(favoritesData));
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos do AsyncStorage", error);
      }
    };

    loadFavoritesFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 102 }}>
        {favorites.length === 0 ? (
          <View style={styles.containerLogo}>
            <Animatable.Image
              animation="bounceIn"
              duration={1000}
              source={require("../../assets/heart.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.textVazio}>
              Nenhum item favorito encontrado
            </Text>
          </View>
        ) : (
          favorites.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <Image
                source={{ uri: product.thumbnail_url }}
                style={styles.imagemProduto}
              />
              <Text>{product.name}</Text>
              <Text>Preço: R$ {product.price}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.containerBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={30} color={"black"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cart")}
        >
          <Icon name="cart" size={30} color={"black"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Icon name="heart" size={30} style={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chat")}
        >
          <Icon name="chat" size={30} style={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
