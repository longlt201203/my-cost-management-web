import AxiosService from "./axios.service";

export default class AccountService {
  static async createAccount(dto: CreateAccountRequest) {
    const url = `/api/account`;
    const response = await AxiosService.post(url, dto);
    return response.data;
  }

  static async checkExists(dto: CheckExistsAccountRequest) {
    const url = `/api/account/exists`;
    const response = await AxiosService.post<boolean>(url, dto);
    return response.data;
  }
}

export interface CreateAccountRequest {
  email: string;
  phone: string;
  password: string;
}

export interface CheckExistsAccountRequest {
  field: string;
  value: string;
}
