import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

export default class AxiosService {
  static getConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    const accessToken = localStorage.getItem("accessToken");
    return {
      ...config,
      headers: {
        Authorization: accessToken && `Bearer ${accessToken}`,
        ...config?.headers,
      },
    };
  }

  static async get<T>(url: string, config?: AxiosRequestConfig) {
    const processedConfig = this.getConfig(config);
    const response = await axios.get<ApiResponseDto<T>>(url, processedConfig);
    return response.data;
  }

  static async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    const processedConfig = this.getConfig(config);
    const response = await axios.post<ApiResponseDto<T>>(
      url,
      data,
      processedConfig
    );
    return response.data;
  }

  static async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    const processedConfig = this.getConfig(config);
    const response = await axios.put<ApiResponseDto<T>>(
      url,
      data,
      processedConfig
    );
    return response.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig) {
    const processedConfig = this.getConfig(config);
    const response = await axios.delete<ApiResponseDto<T>>(
      url,
      processedConfig
    );
    return response.data;
  }
}

export interface ApiResponseDto<T> {
  data: T;
  pagination: unknown;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  detail?: unknown;
}
