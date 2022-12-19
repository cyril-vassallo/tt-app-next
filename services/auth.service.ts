import { API_RESOURCES_PATHS, FETCH_HEADERS } from "../core/constants";
import { LoginThunkArgsInterface } from "../interfaces/user.interface";
import { HTTP_VERB } from "../enums/http.enums";
import { AccessTokenResponseInterface } from "../interfaces/auth.interface";

class AuthService {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private LOGIN_SUFFIX = API_RESOURCES_PATHS.LOGIN;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.AUTH;

  /**
   * Fetch login with credential, get a jwt token
   * @param loginThunkArgs  { email , password }.
   */
  public requestCredential = async (
    loginThunkArgs: LoginThunkArgsInterface
  ): Promise<AccessTokenResponseInterface> => {
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
      .then(
        (credentialResponse: AccessTokenResponseInterface) => credentialResponse
      );
  };
}

/**
 * Create an instance of user services.
 */
export const authService = new AuthService();
