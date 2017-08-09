import Axios from 'axios';

// TODO: Remove ApiKey when OAuth is implemented
import { ApiKey } from '../../conf/api-key';
import { Environment } from '../../conf/environment';
import { Action } from '../../models/action';

export class ActionsService {
  private key: string;
  private env: Environment;

  constructor() {
    this.env = new Environment();
    this.key = ApiKey;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${this.key}`;
    Axios.defaults.headers.common['Content-Type'] = `application/json`;
  }

  /**
   * List all of the actions that have been executed on the current account.
   * Limited to 25 actions per page unless otherwise specified.
   *
   * @param {number} [page]
   * @param {number} [perPage]
   * @returns {Promise<Action[]>}
   * @memberof ActionsService
   */
  public getAllActions(page?: number, perPage?: number): Promise<Action[]> {
    page = page ? page : 1;
    perPage = perPage ? perPage : 25;
    return new Promise((resolve, reject) => {
      let url = `${this.env.baseUrl}/actions`;
      url += `?page=${page}`;
      url += `&per_page=${perPage}`;
      Axios.get(url).then((response) => {
        // Return actual actions instead of wrapped actions
        resolve(response.data.actions);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * Returns an existing action based on the provided ID
   *
   * @param {number} id
   * @returns {Promise<Action>}
   * @memberof ActionsService
   */
  public getExistingAction(id: number): Promise<Action> {
    return new Promise((resolve, reject) => {
      let url = `${this.env.baseUrl}/actions/${id}`;
      Axios.get(url).then((response) => {
        // Return actual action instead of wrapped action
        resolve(response.data.action);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}