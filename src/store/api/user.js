import Api from "../api";
import DataService from "../dataService";
const getUserList = async () => {
  try {
    const response = await DataService.get(Api.users);
    return response.data;
  } catch (error) {
    throw error || "An error occurred";
  }
};

export { getUserList };
