import axios from "axios";
import { getCredentials } from "./auth";

const getAllProducts = async () => {
  const response = await axios.get("http://10.5.1.91:5000/api/products", {
    headers: {
      Authorization: await getCredentials(),
    },
  });

  if (response.status == 200) {
    return {
      products: response.data.data,
    };
  } else {
    return {
      status: 401,
    };
  }
};

export { getAllProducts };
