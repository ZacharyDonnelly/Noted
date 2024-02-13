import { AllowedHTTPMethods } from '@/types/api/httpMethods';

/**
 * An asynchronous helper function that handles HTTP
 * requests using the supplied HTTP method & data. This returns the response as an object.
 * @param {string} url - The URL of
 * the API endpoint you want to make a request to. It should include the protocol
 * (e.g., "https://") and the domain name or IP address.
 * @param {AllowedHTTPMethods} method - The HTTP method
 * to be used for the request. It can be one of the following values: POST, GET, PUT for now.
 * @param {any} data - data is an optional parameter that if provided will be supplied as the request body.
 * It will be converted to a JSON string using `JSON.stringify()` before being sent in the request.
 * @returns Returns a Promise that resolves to a
 * Response object representing the response to your fetch request.
 */
const fetchHandler = async (url: string, method: AllowedHTTPMethods, data: any): Promise<Response> => {
  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response: Response = await fetch(url, options);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Assuming the response is JSON. Use response.text() if the response is plain text.
    const result: Response = await response.json();

    return result as Response;
  } catch (error) {
    console.error(`API request error: ${error}`);
    throw new Error('Authentication failed.');
  }
};
export default fetchHandler;
