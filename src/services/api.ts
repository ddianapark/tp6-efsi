import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/images/search",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "<YOUR_API_KEY>"
  },
});