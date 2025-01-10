import {
  Col,
  Dropdown,
  Flex,
  FloatButton,
  MenuProps,
  message,
  Popover,
  Row,
  Select,
  Switch,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import { Languages } from "../../etc/i18n";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Register from "./Register";
import { useSearchParams } from "react-router-dom";
import { TFunction } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { Palette } from "@mui/icons-material";
import { setPrimaryColor, toggleTheme } from "../../store/themeSlice";
import { primaryColors } from "../../theme";
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
  const { theme, isDarkMode, colorPrimary } = useSelector(
    (state: RootState) => state.theme
  );
  const dispatch = useDispatch();
  const tabItems = getTabItems(t)!;
  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    localStorage.setItem("currentLanguage", e.key);
    i18n.changeLanguage(e.key);
  };
  const [currentKey, setCurrentKey] = useState(
    searchParams.get("tab") || tabItems[0].key
  );
  const getColorComponent = primaryColors.find(
    (component) => component.color === colorPrimary
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
        className="min-h-screen"
        style={{ background: theme.palette.background.paper }}
      >
        <Title level={2}>{t(currentKey)}</Title>
        <Tabs
          centered
          tabPosition="top"
          className="w-1/5 max-2xl:w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-80"
          activeKey={currentKey}
          onChange={(k) => setCurrentKey(k)}
          items={tabItems}
          style={{ background: theme.palette.background.default }}
        />
      </Flex>
      <FloatButton.Group trigger="hover" icon={<SettingOutlined />}>
        {/* LANGUAGE SETTINGS */}
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

        {/* THEME SETTINGS */}
        <Popover
          placement="left"
          title={t("themeModal.themeSettings")}
          content={
            <>
              <Flex vertical gap={12}>
                <Row justify={"space-between"}>
                  <Col>{t("themeModal.darkMode")}:</Col>
                  <Col>
                    <Switch
                      onChange={() => dispatch(toggleTheme())}
                      value={isDarkMode}
                    />
                  </Col>
                </Row>

                <Row justify={"space-between"}>
                  <Col>{t("themeModal.colorTheme")}: </Col>
                  <Col>
                    <Select
                      value={getColorComponent?.name}
                      style={{ width: 80 }}
                      options={primaryColors.map((color) => ({
                        value: color.color,
                        label: color.name,
                      }))}
                      onChange={(e) => dispatch(setPrimaryColor(e))}
                    />
                  </Col>
                </Row>
              </Flex>
            </>
          }
        >
          <FloatButton icon={<Palette sx={{ fontSize: 20 }} />} />
        </Popover>
      </FloatButton.Group>
    </>
  );
}
