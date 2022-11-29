import { User, IUserId } from "../interfaces/user.interface";

class UserServices {
  private API = "http://localhost:8080/user";

  constructor() {}

  public getUsers = async (): Promise<User[]> => {
    return fetch(`${this.API}/all`)
      .then((response) => response.json())
      .then((json) => json.data);
  };

  public getUser = (userId: IUserId): Promise<User> => {
    return fetch(`${this.API}/${userId.id}`)
      .then((response) => response.json())
      .then((json) => json.data);
  };
}

export const userServices = new UserServices();
