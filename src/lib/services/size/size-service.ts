import Axios from 'axios';

import { DigitalOcean } from '../../digitalocean';
import { Environment } from '../../conf/environment';
import { Size } from '../../models/size';

export class SizeService extends DigitalOcean {
  private baseUrl: string;

  constructor(accessToken: string) {
    super(accessToken);
    const env = new Environment();
    this.baseUrl = env.baseUrl;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
    Axios.defaults.headers.common['Content-Type'] = `application/json`;
  }

  /**
   * Get all sizes
   *
   * @returns {Promise<Size[]>}
   * @memberof SizeService
   */
  public getAllSizes(): Promise<Size[]> {
    return new Promise((resolve, reject) => {
      Axios.get(`${this.baseUrl}/sizes`).then((response) => {
        // Return actual sizes instead of wrapped sizes
        resolve(response.data.sizes);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
