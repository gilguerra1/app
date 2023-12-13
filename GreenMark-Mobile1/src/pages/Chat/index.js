import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import socket from "../../utils/socket";
import { styles } from "./chatStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function JoinChat() {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState([]);
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);
  
  const [favorites, setFavorites] = useState([]);

  const [chat, setChat] = useState([]);


  const getName = async () => {
    const storagedName = await AsyncStorage.getItem("name");
    socket.emit("set_username", storagedName);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });
    getName();
    return () => socket.off("receive_message");
  }, [socket]);

  const handleSubmit = () => {

    socket.emit("message", message);
    clearInput();
  };

  const clearInput = () => {
    setMessage("");
  };

  return (
    
      <View style={styles.container}>
        {messageList.map((message, index) => (
          <Text key={index}>
              {message.author}: {message.text}
          </Text>
        ))}
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Mensagem"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
      
  );
}
