import { API_RESOURCES_PATHS, FETCH_HEADERS } from "../core/constants";
import { HTTP_VERB } from "../enums/http.enums";
import {
  TaskInterface,
  TasksResponseInterface,
} from "../interfaces/task.interface";
import { UserThunkArgsInterface } from "../interfaces/user.interface";
import { jwtService } from "./jwt.service";

class TaskService {
  private API_DOMAINE = API_RESOURCES_PATHS.API_DOMAINE;
  private ALL_SUFFIX = API_RESOURCES_PATHS.ALL;
  private USER_SUFFIX = API_RESOURCES_PATHS.USER;
  private MAIN_RESOURCE = API_RESOURCES_PATHS.TASK;

  /**
   * Fetch tasks by one user id.
   */
  public findByUserId = async (
    user: UserThunkArgsInterface
  ): Promise<TaskInterface[]> => {
    const headers = jwtService.getHeaders();
    const requestInit: RequestInit = {
      method: HTTP_VERB.GET,
      headers,
    };
    return fetch(
      `${this.API_DOMAINE}${this.MAIN_RESOURCE}${this.USER_SUFFIX}/${user.id}`,
      requestInit
    )
      .then((response) => response.json())
      .then((tasksResponse: TasksResponseInterface) => tasksResponse.data);
  };
}
/**
 * Create an instance of task services.
 */
export const taskService = new TaskService();
