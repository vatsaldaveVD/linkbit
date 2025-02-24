import axios from "axios";

const API_URL = "/api";

export const fetchMessage = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
