import { Button, Flex, FloatButton, Layout, Menu, theme, Typography } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenuItemType } from "antd/es/menu/interface";
import * as Styled from './styled';
import { MenuOutlined } from "@mui/icons-material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const { Text } = Typography;

export default function DashboardLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const keys = location.pathname.split("/");

  const [open, setOpen] = useState(false);
  const menuItems: MenuItemType[] = [
    {
      key: "",
      label: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      key: "boards",
      label: "Boards",
      icon: <GridViewIcon />,
      onClick: () => navigate("/boards"),
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: <AnalyticsIcon />,
      onClick: () => navigate("/analytics"),
    },
    {
      key: "categories",
      label: "Categories",
      icon: <CategoryIcon />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Layout.Sider collapsible className="max-md:hidden">
        <Menu
          items={menuItems}
          theme="dark"
          selectedKeys={keys.slice(1)}
        />
      </Layout.Sider>
      <Layout className="p-8 pb-0 max-md:p-4">
        <Flex>
          <Button
            type="link"
            icon={<KeyboardBackspaceOutlinedIcon fontSize="small" />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Flex>
        <Layout.Content
          style={{ background: colorBgContainer }}
          className="rounded-lg"
        >
          <Outlet />
        </Layout.Content>
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
        icon={<MenuOutlined style={{ fontSize: '20px'}}/>}
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
          onSelect={() => setOpen(false)}
        />
      </Styled.DrawerStyled>
    </Layout>
  );
}
