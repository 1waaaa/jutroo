import axios from "axios";

export const api = axios.create({
  baseURL: "https://confidant-busboy-blooper.ngrok-free.dev/",
});
