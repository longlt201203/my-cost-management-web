import { Button, Dropdown, Flex, Layout, MenuProps, theme } from "antd";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";

export default function Header() {
  const { i18n } = useTranslation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    localStorage.setItem("currentLanguage", e.key);
    i18n.changeLanguage(e.key);
  };

  return (
    <Layout.Header
      className="px-8 max-md:p-4"
      style={{ background: colorBgContainer }}
    >
      <Flex justify="end" align="center" className="h-full">
        <Dropdown
          menu={{
            items: [
              {
                key: "en",
                label: "English",
              },
              {
                key: "vi",
                label: "Tiếng Việt",
              },
            ],
            onClick: handleChangeLanguage,
          }}
          placement="bottomRight"
        >
          <Button size="small" type="text">
            <LanguageIcon fontSize="small" />
          </Button>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
}
