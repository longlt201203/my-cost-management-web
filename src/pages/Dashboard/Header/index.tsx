import { Flex, Layout, theme } from "antd";
import Language from "./Language";

export default function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header
      className="px-8 max-md:p-4"
      style={{ background: colorBgContainer }}
    >
      <Flex justify="end" align="center" gap="middle" className="h-full">
        <Language />
      </Flex>
    </Layout.Header>
  );
}
