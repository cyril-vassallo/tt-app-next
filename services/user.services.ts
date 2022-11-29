import { API_RESOURCES_PATHS, FETCH_HEADERS } from "../core/constants";
import { HTTP_VERB } from "../enums/http.enums";
import {
  User,
  ILoginThunkArgs,
  IUserThunkArgs,
} from "../interfaces/user.interface";

class UserServices {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private ALL_SUFFIX = API_RESOURCES_PATHS.ALL;
  private LOGIN_SUFFIX = API_RESOURCES_PATHS.LOGIN;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.USER;

  /**
   * Fetch all the user list.
   */
  public getUsers = async (): Promise<User[]> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers: FETCH_HEADERS,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}${this.ALL_SUFFIX}`,
      requestInit
    )
      .then((response) => response.json())
      .then((json) => json.data);
  };

  /**
   * Fetch one user by id.
   */
  public getUser = async (user: IUserThunkArgs): Promise<User> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers: FETCH_HEADERS,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}/${user.id}`,
      requestInit
    )
      .then((response) => response.json())
      .then((json) => json.data);
  };

  /**
   * Fetch login, get an existing user by a given email and password.
   * @param loginThunkArgs  { email , password }.
   */
  public login = async (loginThunkArgs: ILoginThunkArgs): Promise<User> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.POST,
      headers: FETCH_HEADERS,
      body: JSON.stringify(loginThunkArgs),
    };

    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}${this.LOGIN_SUFFIX}`,
      requestInit
    )
      .then((response) => response.json())
      .then((json) => json.data);
  };
}

/**
 * Create an instance of user services.
 */
export const userServices = new UserServices();
