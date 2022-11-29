import {
  User,
  ILoginThunkArgs,
  IUserThunkArgs,
} from "../interfaces/user.interface";

class UserServices {
  private API_ENTRY_POINT = "http://localhost:8080";
  private MAIN_RESOURCE = "/user";

  constructor() {}

  public getUsers = async (): Promise<User[]> => {
    return fetch(`${this.API_ENTRY_POINT}${this.MAIN_RESOURCE}/all`)
      .then((response) => response.json())
      .then((json) => json.data);
  };

  public getUser = (user: IUserThunkArgs): Promise<User> => {
    return fetch(`${this.API_ENTRY_POINT}${this.MAIN_RESOURCE}/${user.id}`)
      .then((response) => response.json())
      .then((json) => json.data);
  };

  public login = (loginArgs: ILoginThunkArgs): Promise<User> => {
    console.log(loginArgs);
    const options = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginArgs),
    };

    console.log(options);
    return fetch(`${this.API_ENTRY_POINT}${this.MAIN_RESOURCE}/login`, options)
      .then((response) => response.json())
      .then((json) => json.data);
  };
}

export const userServices = new UserServices();
