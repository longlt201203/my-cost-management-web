import { ConfigProvider } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import i18n from "./etc/i18n";
import { I18nextProvider } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function MyApp() {
  const { theme, colorPrimary } = useSelector((state: RootState) => state.theme);

  const AntdThemeConfig = {
    token: {
      colorPrimary,
      colorTextHeading: colorPrimary,
      colorText: theme.palette.text.primary,
      colorBgBase: theme.palette.background.default,
      colorBgContainer: theme.palette.background.default,
      colorTextPlaceholder: theme.palette.text.secondary,
      colorBorder: theme.palette.divider,
      colorTextDisabled: theme.palette.divider,
    },
    components: {
      Card: {
        actionsBg: theme.palette.background.default,
      },
      Modal: {
        contentBg: theme.palette.background.default,
        headerBg: theme.palette.background.default,
      },
      Button: {
        defaultBg: theme.palette.background.default,
        defaultBorderColor: theme.palette.background.default,
        defaultColor: theme.palette.text.primary,
        defaultHoverBg: theme.palette.background.default,
      },
      Select: {
        clearBg: theme.palette.background.default,
        optionActiveBg: theme.palette.background.default,
        selectorBg: theme.palette.background.default,
      }
    }
  }

  return (
    <ConfigProvider
      theme={AntdThemeConfig}
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
