import { API_RESOURCES_PATHS, FETCH_HEADERS } from "../core/constants";
import { HTTP_VERB } from "../enums/http.enums";
import {
  UserInterface,
  LoginThunkArgsInterface,
  UserThunkArgsInterface,
  UsersResponseInterface,
  UserResponseInterface,
} from "../interfaces/user.interface";

class UserService {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private ALL_SUFFIX = API_RESOURCES_PATHS.ALL;
  private LOGIN_SUFFIX = API_RESOURCES_PATHS.LOGIN;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.USER;

  /**
   * Fetch all the user list.
   */
  public findAll = async (): Promise<UserInterface[]> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers: FETCH_HEADERS,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}${this.ALL_SUFFIX}`,
      requestInit
    )
      .then((response) => response.json())
      .then((usersResponse: UsersResponseInterface) => usersResponse.data);
  };

  /**
   * Fetch one user by id.
   */
  public findOneById = async (
    user: UserThunkArgsInterface
  ): Promise<UserInterface> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers: FETCH_HEADERS,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}/${user.id}`,
      requestInit
    )
      .then((response) => response.json())
      .then((userResponse: UserResponseInterface) => userResponse.data);
  };

  /**
   * Fetch login, get an existing user by a given email and password.
   * @param loginThunkArgs  { email , password }.
   */
  public requestLogin = async (
    loginThunkArgs: LoginThunkArgsInterface
  ): Promise<UserInterface> => {
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
      .then((userResponse: UserResponseInterface) => userResponse.data);
  };
}

/**
 * Create an instance of user services.
 */
export const userService = new UserService();
