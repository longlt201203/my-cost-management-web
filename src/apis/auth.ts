import axios from "axios";
import ApiResponseDto from "../etc/api-response.dto";

const accessToken = localStorage.getItem("accessToken");

const AuthApis = {
  loginBasic: async (email: string, password: string) => {
    const response = await axios.post<ApiResponseDto<TokenResponse>>(
      "/api/auth/basic",
      {
        email,
        password,
      }
    );
    return response.data.data;
  },
  getAuthProfile: async () => {
    const response = await axios.get<ApiResponseDto<AuthProfileResponse>>(
      "/api/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  },
};

export default AuthApis;
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
