import api from "../services/api";

export async function getCat() {
  try {
    const response = await api.get("");
    return response.data[0];
  } catch (error) {
    console.error("Error fetching cat:", error);
    return [];
  }
};

export async function getCatImg() {
  try {
    const response = await api.get("");
    return response.data[0].url;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return [];
  }
};

export async function getCats(count: number) {
    try {
        const response = await api.get(`?limit=${count}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
    }
};
