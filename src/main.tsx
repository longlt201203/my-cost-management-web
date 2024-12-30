import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./etc/router.tsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);
import { DefaultTheme, ThemeProvider } from "styled-components";
import { createStyledBreakpointsTheme } from "styled-breakpoints";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "./store/index.ts";

export const breakpoints = {
  xs: "360px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
} as const;

const theme: DefaultTheme = createStyledBreakpointsTheme({
  breakpoints,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
);
