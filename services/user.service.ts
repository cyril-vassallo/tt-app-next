import { API_RESOURCES_PATHS } from "../core/constants";
import { HTTP_VERB } from "../enums/http.enums";
import {
  UserInterface,
  LoginThunkArgsInterface,
  UserThunkArgsInterface,
  UsersResponseInterface,
  UserResponseInterface,
} from "../interfaces/user.interface";
import { jwtService } from "./jwt.service";

class UserService {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private ALL_SUFFIX = API_RESOURCES_PATHS.ALL;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.USER;

  /**
   * Fetch all the user list.
   */
  public findAll = async (): Promise<UserInterface[]> => {
    const headers = jwtService.getHeaders();
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers,
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
    const headers = jwtService.getHeaders();
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}/${user.id}`,
      requestInit
    )
      .then((response) => response.json())
      .then((userResponse: UserResponseInterface) => userResponse.data);
  };

  /**
   * Fetch current user account with bearer token.
   */
  public findCurrentUserAccount = async (): Promise<UserInterface> => {
    const headers = jwtService.getHeaders();
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers,
    };

    return fetch(`${this.API_DOMAINE}${this.MAIN_RESOURCE}`, requestInit)
      .then((response) => response.json())
      .then((userResponse: UserResponseInterface) => userResponse.data);
  };

  /**
   * Fetch to create new account, create and get a new user.
   * @param loginThunkArgs  { email , password, firstName, lastName }.
   */
  public createOne = async (
    loginThunkArgs: LoginThunkArgsInterface
  ): Promise<UserInterface> => {
    const headers = jwtService.getHeaders();
    const requestInit: RequestInit = {
      method: HTTP_VERB.POST,
      headers,
      body: JSON.stringify(loginThunkArgs),
    };

    return fetch(`${this.API_DOMAINE}${this.MAIN_RESOURCE}`, requestInit)
      .then((response) => response.json())
      .then((userResponse: UserResponseInterface) => userResponse.data);
  };
}

/**
 * Create an instance of user services.
 */
export const userService = new UserService();
