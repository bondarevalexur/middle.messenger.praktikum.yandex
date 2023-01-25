import queryStringify from "../helpers/queryStringify";

export enum Methods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Options = {
  method: Methods;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
};

export default class HTTPTransport {
  private readonly _urlPrefix: string;

  constructor(urlPrefix: string) {
    this._urlPrefix = urlPrefix;
  }

  get(url: string, data?: Record<string, any>): Promise<XMLHttpRequest> {
    if (data) {
      url = url + queryStringify(data);
    }
    return this.request(url, { method: Methods.GET });
  }

  post(url: string, data?: Record<string, any> | number | string): Promise<XMLHttpRequest> {
    return this.request(url, { data: data, method: Methods.POST });
  }

  put(
    url: string,
    data: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<XMLHttpRequest> {
    return this.request(url, { data: data, headers: headers, method: Methods.PUT });
  }

  delete(url: string, data: Record<string, any>): Promise<XMLHttpRequest> {
    return this.request(url, { data: data, method: Methods.DELETE });
  }

  request(url: string, options: Options): Promise<XMLHttpRequest> {
    const {
      method,
      data,
      headers = { "Content-Type": "application/json" },
      withCredentials = true,
      timeout = 5000,
    } = options;

    url = `${this._urlPrefix}${url}`;

    return new Promise((resolve, reject) => {
      const xhr = new window.XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([key, value]) => {
        return xhr.setRequestHeader(key, value);
      });

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        if (headers?.["Content-Type"] === "application/json") {
          data.constructor = xhr.send(JSON.stringify(data));
        } else {
          data.constructor = xhr.send(data);
        }
        // data.constructor === FormData ? xhr.send(data) : xhr.send(JSON.stringify(data));
      }
    });
  }
}

export const requests = new HTTPTransport("https://ya-praktikum.tech/api/v2");
