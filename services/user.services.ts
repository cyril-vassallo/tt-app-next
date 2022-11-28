import { User } from "../interfaces/user.interface";

const API = "http://localhost:8080/user/all";

const UserAPI = {
  getUsers: async (): Promise<User[]> => {
    return await fetch(API)
      .then((response) => response.json())
      .then((json) => json.data);
  },
  getUser: async (id: number): Promise<User> => {
    return await fetch(`${API}/${id}`)
      .then((response) => response.json())
      .then((json) => json.data);
  },
};

export default UserAPI;
