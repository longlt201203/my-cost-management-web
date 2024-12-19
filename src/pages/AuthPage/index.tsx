import { Dropdown, Flex, FloatButton, MenuProps, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import { Languages } from "../../etc/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Register from "./Register";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    localStorage.setItem("currentLanguage", e.key);
    i18n.changeLanguage(e.key);
  };
  const [currentKey, setCurrentKey] = useState(
    searchParams.get("tab") || "login"
  );

  useEffect(() => {
    setSearchParams({ tab: currentKey });
  }, [currentKey]);

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        className="mx-auto max-w-sm min-h-screen"
      >
        <Title level={2}>{t(currentKey)}</Title>
        <Tabs
          centered
          tabPosition="top"
          className="w-full"
          activeKey={currentKey}
          onChange={(k) => setCurrentKey(k)}
          items={[
            {
              key: "login",
              label: t("login"),
              children: <Login />,
            },
            {
              key: "register",
              label: t("register"),
              children: <Register />,
            },
          ]}
        />
      </Flex>
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
        <FloatButton icon={<GlobalOutlined />} />
      </Dropdown>
    </>
  );
}
