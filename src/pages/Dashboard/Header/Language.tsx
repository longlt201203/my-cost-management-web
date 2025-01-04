import { Button, Dropdown, MenuProps } from "antd";
import { Languages } from "../../../etc/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Language() {
  const { i18n } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    localStorage.setItem("currentLanguage", e.key);
    i18n.changeLanguage(e.key);
  };

  return (
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
        <GlobalOutlined style={{ color: theme.palette.text.primary }}/>
      </Button>
    </Dropdown>
  );
}
