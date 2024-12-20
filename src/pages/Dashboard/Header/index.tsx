import { Button, Flex, Layout, theme } from "antd";
import Language from "./Language";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/auth";
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
          Logout
        </Button>
        <Language />
      </Flex>
    </Layout.Header>
  );
}
