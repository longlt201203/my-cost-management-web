import { Button, Flex, Layout, theme } from "antd";
import Language from "./Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

export default function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const handleLogout = () => {
    const callback = encodeURIComponent(`${window.location.origin}/auth`);
    window.location.href = `/api/auth/2/logout?callback=${callback}`;
  };

  return (
    <Layout.Header
      className="px-8 max-md:p-4"
      style={{ background: colorBgContainer }}
    >
      <Flex justify="end" align="center" gap="small" className="h-full">
        <Button
          iconPosition="end"
          icon={<LogoutIcon fontSize="small" />}
          type="text"
          onClick={handleLogout}
        >
          {t("logout")}
        </Button>
        <Language />
      </Flex>
    </Layout.Header>
  );
}
