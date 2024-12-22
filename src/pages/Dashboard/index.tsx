import {
  Button,
  Flex,
  FloatButton,
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import CategoryIcon from "@mui/icons-material/Category";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuItemType } from "antd/es/menu/interface";
import * as Styled from "./styled";
import { MenuOutlined } from "@mui/icons-material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import Header from "./Header";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export default function DashboardLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const keys = location.pathname.split("/");

  const [open, setOpen] = useState(false);
  const menuItems: MenuItemType[] = [
    {
      key: "",
      label: t("home"),
      icon: <HomeIcon />,
    },
    {
      key: "boards",
      label: t("boards"),
      icon: <GridViewIcon />,
    },
    {
      key: "analytics",
      label: t("analytics"),
      icon: <AnalyticsIcon />,
    },
    {
      key: "categories",
      label: t("categories"),
      icon: <CategoryIcon />,
    },
    {
      key: "account",
      label: t("account"),
      icon: <AccountCircleOutlinedIcon />,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Layout.Sider collapsible className="max-md:hidden">
        <Menu
          items={menuItems}
          theme="dark"
          selectedKeys={keys.slice(1)}
          onSelect={(e) => navigate(e.key)}
        />
      </Layout.Sider>
      <Layout>
        <Header />
        <Layout className="px-8 max-md:p-4">
          <Flex className="my-4">
            <Button
              type="link"
              icon={<KeyboardBackspaceOutlinedIcon fontSize="small" />}
              onClick={() => navigate(-1)}
            >
              {t("back")}
            </Button>
          </Flex>
          <Layout.Content
            style={{ background: colorBgContainer }}
            className="rounded-lg"
          >
            <Outlet />
          </Layout.Content>
        </Layout>
        <Layout.Footer>
          <Flex justify="center">
            <Text className="text-center">
              &copy; 2024 Le Thanh Long, Bui Phan Long. All rights reserved.
            </Text>
          </Flex>
        </Layout.Footer>
      </Layout>
      <FloatButton
        onClick={() => setOpen(true)}
        className="md:hidden"
        icon={<MenuOutlined style={{ fontSize: "20px" }} />}
      />
      <Styled.DrawerStyled
        title="My cost management"
        placement="left"
        closable={true}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          items={menuItems}
          selectedKeys={[keys[keys.length - 1]]}
          onSelect={(e) => {
            navigate(e.key);
            setOpen(false);
          }}
        />
      </Styled.DrawerStyled>
    </Layout>
  );
}
