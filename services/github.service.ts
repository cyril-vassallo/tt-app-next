import { API_RESOURCES_PATHS, FETCH_HEADERS } from "../core/constants";
import { HTTP_VERB } from "../enums/http.enums";
import {
  GithubInterface,
  GithubResponseInterface,
} from "../interfaces/github.interface";
import { UserThunkArgsInterface } from "../interfaces/user.interface";

class GithubService {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.GITHUB;
  private USER_SUFFIX = API_RESOURCES_PATHS.USER;

  /**
   * Fetch all the user list.
   */
  public findOneByUserId = async (
    user: UserThunkArgsInterface
  ): Promise<GithubInterface> => {
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers: FETCH_HEADERS,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}${this.USER_SUFFIX}/${user.id}`,
      requestInit
    )
      .then((response) => response.json())
      .then((githubResponse: GithubResponseInterface) => githubResponse.data);
  };
}

/**
 * Create an instance of user services.
 */
export const githubService = new GithubService();
