import { ConfigProvider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import i18n from "./etc/i18n";
import { I18nextProvider } from "react-i18next";

function MyApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#81BFDA",
        },
      }}
    >
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Outlet />
        </ErrorBoundary>
      </I18nextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
