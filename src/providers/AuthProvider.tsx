import { useEffect, useState } from "react";
import AuthContext from "../contexts/auth.context";
import AuthService, { AuthProfileResponse } from "../apis/auth.service";
import { Outlet } from "react-router-dom";
import handleError from "../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export default function AuthProvider() {
  const { t } = useTranslation();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [profile, setProfile] = useState<AuthProfileResponse>({
    id: 0,
    email: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
  });

  const fetchProfile = async () => {
    try {
      const profile = await AuthService.getAuthProfile();
      setProfile(profile);
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ profile }}>
      {contextHolder}
      <Outlet />
    </AuthContext.Provider>
  );
}
