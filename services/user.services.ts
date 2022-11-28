import { User } from "../interfaces/user.interface";

const API = "https://jsonplaceholder.typicode.com/users";

const UserAPI = {
  getUsers: async (): Promise<User[]> => {
    return await fetch(API)
      .then((response) => response.json())
      .then((json) => json);
  },
  getUser: async (id: number): Promise<User> => {
    return await fetch(`${API}/${id}`)
      .then((response) => response.json())
      .then((json) => json);
  },
};

export default UserAPI;
