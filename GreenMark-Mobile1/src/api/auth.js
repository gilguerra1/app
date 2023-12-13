import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authenticate = async (email, password) => {
  const response = await axios.post("http://10.5.1.91:5000/api/login", {
    email: email,
    password: password,
  });

  if (response.status == 200) {
    await AsyncStorage.setItem("token", response.data.access_token);
    await AsyncStorage.setItem("name", response.data.user.name);

    return {
      access_token: response.data.access_token,
      email: response.data.user.email,
      id: response.data.user.id,
      name: response.data.user.name,
      password: response.data.user.password,
    };
  } else {
    return {
      status: 401,
    };
  }
};

const getCredentials = async () => {
  return await AsyncStorage.getItem("token");
};

export { authenticate, getCredentials };
