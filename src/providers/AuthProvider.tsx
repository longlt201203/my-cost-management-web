import { useEffect } from "react";
import AuthContext from "../contexts/auth.context";
import AuthService, { AuthProfileResponse } from "../apis/auth.service";
import { Outlet } from "react-router-dom";
import handleError from "../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

export default function AuthProvider() {
  const { t } = useTranslation();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, error } = useQuery<AuthProfileResponse>({
    queryKey: ["getAuthProfile"],
    initialData: {
      id: 0,
      email: "",
      phone: "",
      createdAt: "",
      updatedAt: "",
    },
    queryFn: AuthService.getAuthProfile,
    retry: 0,
  });

  useEffect(() => {
    if (!isLoading && error) {
      handleError(error, showBoundary, messageApi, t);
    }
  }, [isLoading, error]);

  return (
    <AuthContext.Provider value={{ profile: data }}>
      {contextHolder}
      <Outlet />
    </AuthContext.Provider>
  );
}
