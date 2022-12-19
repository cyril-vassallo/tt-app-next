import { FETCH_HEADERS } from "../core/constants";
class JwtService {
  public jwtTokenExist: boolean = false;

  public getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  public setToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  };

  public does = (): JwtService => {
    this.jwtTokenExist = this.getToken() ? true : false;
    return this;
  };

  public getHeaders = () => {
    const hasAccessToken = this.does().jwtTokenExist;
    if (hasAccessToken) {
      return {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${jwtService.getToken()}`,
      };
    }
    return {
      ...FETCH_HEADERS,
    };
  };
}

/**
 * Create an instance of user services.
 */
export const jwtService = new JwtService();
