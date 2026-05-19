import axios from "axios";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/images/search",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "live_OjfXOJuAkPueXHxdAtxLMSfoVS7IqoYk342RMtpGKeZRCnqjxFwzIk5nAuJBtV8T"
  },
});

export default api;