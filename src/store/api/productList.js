import Api from "../api";
import DataService from "../dataService";
const getProductList = async () => {
  try {
    const response = await DataService.get(Api.products);
    return response.data;
  } catch (error) {
    throw error || "An error occurred";
  }
};

export { getProductList };
