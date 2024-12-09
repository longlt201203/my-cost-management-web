import { Flex, Layout, Menu, theme, Typography } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { MenuItemType } from "antd/es/menu/interface";

const { Text } = Typography;

// const menuItems: MenuItemType[] = [];

export default function DashboardLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const keys = location.pathname.split("/");

  return (
    <Layout className="min-h-screen">
      <Layout.Sider collapsible>
        <Menu
          items={[
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
              key: "categories",
              label: "Categories",
              icon: <CategoryIcon />,
            },
            {
              key: "settings",
              label: "Settings",
              icon: <SettingsIcon />,
            },
          ]}
          theme="dark"
          selectedKeys={[keys[keys.length - 1]]}
        />
      </Layout.Sider>
      <Layout className="p-8 pb-0">
        <Layout.Content
          style={{ background: colorBgContainer }}
          className="rounded-lg"
        >
          <Outlet />
        </Layout.Content>
        <Layout.Footer>
          <Flex justify="center">
            <Text>
              &copy; 2024 Le Thanh Long, Bui Phan Long. All rights reserved.
            </Text>
          </Flex>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
