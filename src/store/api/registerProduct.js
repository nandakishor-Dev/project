import Api from "../api";
import DataService from "../dataService";
const registerProduct = async (payload) => {
  try {
    const response = await DataService.post(Api.products,payload);
    return response.data;
  } catch (error) {
    throw error || "An error occurred";
  }
};

export { registerProduct };
