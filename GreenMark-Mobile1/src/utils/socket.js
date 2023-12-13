import { io } from "socket.io-client";
const socket = io.connect("http://10.5.1.91:5001");
export default socket;