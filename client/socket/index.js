import { BASE_API } from "../utils/const";
import io from "socket.io-client";

export const socket = io(BASE_API, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
