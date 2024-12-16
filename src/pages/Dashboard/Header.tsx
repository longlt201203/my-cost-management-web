import { Button, Dropdown, Flex, Layout, MenuProps, theme } from "antd";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import { Languages } from "../../etc/i18n";

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
            items: Object.entries(Languages).map(([key, value]) => ({
              key: key,
              label: value,
            })),
            onClick: handleChangeLanguage,
          }}
          placement="bottomRight"
        >
          <Button type="text">
            <GlobalOutlined />
          </Button>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
}
