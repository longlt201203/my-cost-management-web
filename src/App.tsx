import { ConfigProvider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

function MyApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#81BFDA",
        },
      }}
    >
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default MyApp;
