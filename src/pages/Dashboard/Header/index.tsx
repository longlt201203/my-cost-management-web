import { Button, Flex, Layout, Typography } from "antd";
import Language from "./Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const { Text } = Typography;

export default function Header() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { t } = useTranslation();
  const handleLogout = () => {
    const callback = encodeURIComponent(`${window.location.origin}/auth`);
    window.location.href = `/api/auth/2/logout?callback=${callback}`;
  };

  return (
    <Layout.Header
      className="px-8 max-md:p-4"
      style={{ background: theme.palette.background.default }}
    >
      <Flex justify="end" align="center" gap="small" className="h-full">
        <Button
          iconPosition="end"
          icon={<LogoutIcon fontSize="small" style={{ color: theme.palette.text.primary }} />}
          type="text"
          onClick={handleLogout}
        >
          <Text style={{ color: theme.palette.text.primary }}>
            {t("logout")}
          </Text>
        </Button>
        <Language />
        <Theme />
      </Flex>
    </Layout.Header>
  );
}
