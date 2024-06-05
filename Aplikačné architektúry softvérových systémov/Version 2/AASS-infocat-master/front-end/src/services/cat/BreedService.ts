import type { AxiosError, AxiosInstance } from 'axios';
import type { Breed } from 'src/contracts';
import axios from 'axios';

// Define a function to create Axios instance with custom base URL for a specific port
function createApi(port: number): AxiosInstance {
  return axios.create({
    baseURL: `http://localhost:${port}`, // Custom base URL with the specified port
  });
}

// Define the 'api' object with Axios instances for different microservices
export const addcatApi: AxiosInstance = createApi(3333);

class BreedService {
  async breeds(): Promise<Breed[] | null> {
    return addcatApi
      .get('breeds/all')
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null;
        }

        return Promise.reject(error);
      });
  }
}

export default new BreedService();
