import type { AxiosError, AxiosInstance } from 'axios';
import type { AllCats, AllNames, Cat, FindCat, FindName } from 'src/contracts';
import axios from 'axios';

// Define a function to create Axios instance with custom base URL for a specific port
function createApi(port: number): AxiosInstance {
  return axios.create({
    baseURL: `http://localhost:${port}`, // Custom base URL with the specified port
  });
}

// Define the 'api' object with Axios instances for api gateway
export const apiGatewayApi: AxiosInstance = createApi(3332);

// Define the 'api' object with Axios instances for different microservices
export const addCatApi: AxiosInstance = createApi(3333);
export const catNamesApi: AxiosInstance = createApi(3334);
export const searchCatApi: AxiosInstance = createApi(3335);

class CatService {
  async all(data: FindCat): Promise<AllCats | null> {
    return apiGatewayApi
      .post('cats/all/', data)
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null;
        }

        return Promise.reject(error);
      });
  }

  async names(data: FindName): Promise<AllNames | null> {
    return apiGatewayApi
      .post('cats/names/' + data.character, data)
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null;
        }

        return Promise.reject(error);
      });
  }

  async get(id: string): Promise<any> {
    return apiGatewayApi
      .get('cats/' + id)
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null;
        }
        return Promise.reject(error);
      });
  }

  public validateCat(cat: Cat): Cat {
    if (
      cat.additionalInfo?.cattery === undefined &&
      cat.additionalInfo?.titleBefore === undefined &&
      cat.additionalInfo?.titleAfter === undefined &&
      cat.additionalInfo?.chip === undefined &&
      cat.additionalInfo?.verifiedStatus === undefined
    )
      delete cat['additionalInfo'];

    if (
      cat.reference?.father === undefined &&
      cat.reference?.mother === undefined
    )
      delete cat['reference'];

    if (cat.reference?.father === undefined) delete cat.reference?.father;
    if (cat.reference?.mother === undefined) delete cat.reference?.mother;

    if (cat.links?.length === 0) delete cat['links'];

    return cat;
  }

  async update(cat: Cat): Promise<Cat | null> {
    cat = this.validateCat(cat);

    const response = await apiGatewayApi.put<Cat>('cats/' + cat.id, cat);
    return response.data;
  }

  async create(cat: Cat): Promise<{ message: string } | null> {
    cat = this.validateCat(cat);

    const response = await apiGatewayApi.post<{ message: string }>('cats/', cat);
    return response.data;
  }

  async delete(catId: string): Promise<{ message: string } | null> {
    const response = await apiGatewayApi.delete<{ message: string }>(
      'cats/' + catId
    );
    return response.data;
  }
}

export default new CatService();
