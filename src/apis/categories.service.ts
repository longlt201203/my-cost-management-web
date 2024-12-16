import AxiosService from "./axios.service";

export default class CategoriesService {
  static async listCategories() {
    const url = "/api/category";
    const response = await AxiosService.get<CategoryResponse[]>(url);
    return response.data;
  }

  static async create(dto: CreateCategoryRequest) {
    const url = "/api/category";
    const response = await AxiosService.post(url, dto);
    return response.data;
  }

  static async update(id: number, dto: UpdateCategoryRequest) {
    const url = `/api/category/${id}`;
    const response = await AxiosService.put(url, dto);
    return response.data;
  }

  static async delete(dto: DeleteCategoriesRequest) {
    const url = "/api/category/delete";
    const response = await AxiosService.post(url, dto);
    return response.data;
  }
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {}

export interface DeleteCategoriesRequest {
  ids: number[];
}

export interface CategoryResponse {
  id: number;
  name: string;
}
