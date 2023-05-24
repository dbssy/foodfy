import APIError from '@/errors/APIError';
import delay from '@/utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      headers: options?.headers,
      body: options?.body,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      headers: options?.headers,
      body: options?.body,
    });
  }

  patch(path, options) {
    return this.makeRequest(path, {
      method: 'PATCH',
      headers: options?.headers,
      body: options?.body,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
      body: options?.body,
    });
  }

  async makeRequest(path, options) {
    await delay(500);

    const headers = new Headers();

    if (options.body instanceof FormData) {
      const hasFiles = [...options.body.values()].some((value) => value instanceof File);

      if (!hasFiles && !options.headers.get('Content-Type')) {
        headers.append('Content-Type', 'application/json');
      }
    } else if (!headers.has('Content-Type')) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: options.body,
      headers,
      signal: options.signal,
    });

    const contentType = response.headers.get('Content-Type');
    const responseBody = contentType?.includes('application/json') ? await response.json() : null;

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
