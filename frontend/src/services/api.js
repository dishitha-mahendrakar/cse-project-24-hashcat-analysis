// services/api.js
import axios from "axios";

export default axios.create({
  baseURL: "http://KALI_IP:5000",
});

