import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

function MyApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#81BFDA",
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}

export default MyApp;
