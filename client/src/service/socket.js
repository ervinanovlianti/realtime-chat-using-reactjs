import { io } from "socket.io-client";
import { baseUrl } from "../api/config";

const socket = io(baseUrl);

export default socket;
