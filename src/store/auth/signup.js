import Api from "../api";
import DataService from "../dataService";

const signUp = async (payload) => {
  try {
    const response = await DataService.post(Api.signUp, payload);
    return response.data;
  } catch (error) {
    throw error || "An error occurred";
  }
};

export { signUp };
