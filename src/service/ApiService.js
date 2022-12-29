import axios from "axios";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

const ApiService = {
  // Stores the 401 interceptor position so that it can be later ejected when needed'
  // _401interceptor: null,
  i: 0,
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },
  getFile(resource) {
    return axios.get(resource, {
      responseType: "blob",
    });
  },
  setHeader() {
    axios.defaults.headers.common[
      "Authorization"
      ] = `Bearer ${TokenService.getToken()}`;
  },
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  get(resource, config = {}) {
    return axios.get(resource, config);
  },
  post(resource, data, config = {}) {
    return axios.post(resource, data, config);
  },
  put(resource, data) {
    return axios.put(resource, data);
  },
  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },
  // transformRequest: [(data, headers) => {
  //     delete headers.common.Authorization
  //     return data
  // }],
  mount401Interceptor() {   
    this._401interceptor = axios.interceptors.response.use(
      (response,) => {
        return response;
      },
      async (response) => {
        this.i++;
        if (this.i === 1) {
          if (response.request.status === 403 || response.request.status === 401) {
            await UserService.logout()
            throw response;
          } else {
            const { message, error } = response.response?.data;
            if (error) {
              throw response;
            }
            if (!message) {
              throw response;
            }
          }
        }
        this.i = 0;
        return Promise.reject(response);
      }
    );
  },
  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  },
};

export default ApiService;