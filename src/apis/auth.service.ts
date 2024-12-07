import AxiosService from "./axios.service";

export default class AuthService {
  static async loginBasic(data: LoginBasicRequest) {
    const url = "/api/auth/basic";
    const response = await AxiosService.post<TokenResponse>(url, data);
    return response.data;
  }

  static async getAuthProfile() {
    const url = "/api/auth/profile";
    const response = await AxiosService.get<AuthProfileResponse>(url);
    return response.data;
  }
}

export interface LoginBasicRequest {
  email: string;
  password: string;
}
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface AuthProfileResponse {
  id: number;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
