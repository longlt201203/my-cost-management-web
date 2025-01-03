import {
  Dropdown,
  Flex,
  FloatButton,
  MenuProps,
  message,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import { Languages } from "../../etc/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Register from "./Register";
import { useSearchParams } from "react-router-dom";
import { TFunction } from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { Title } = Typography;

const getTabItems = (
  t: TFunction<"translation", undefined>
): TabsProps["items"] => [
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
];

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { t, i18n } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.theme);
  const tabItems = getTabItems(t)!;
  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    localStorage.setItem("currentLanguage", e.key);
    i18n.changeLanguage(e.key);
  };
  const [currentKey, setCurrentKey] = useState(
    searchParams.get("tab") || tabItems[0].key
  );

  useEffect(() => {
    if (searchParams.get("status") == "success") {
      window.location.href = "/";
    } else {
      const error = searchParams.get("error");
      if (error) {
        messageApi.error(t(error));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({ tab: currentKey });
  }, [currentKey]);

  return (
    <>
      {contextHolder}
      <Flex
        vertical
        justify="center"
        align="center"
        className="mx-auto max-w-sm min-h-screen"
        style={{ background: theme.palette.background.paper }}
      >
        <Title level={2}>{t(currentKey)}</Title>
        <Tabs
          centered
          tabPosition="top"
          className="w-full"
          activeKey={currentKey}
          onChange={(k) => setCurrentKey(k)}
          items={tabItems}
          style={{ background: theme.palette.background.default }}
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
