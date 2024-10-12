import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./toolkits/store";
import { router } from "./routers";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorBgBase: "#fff",
        colorBgHeader: "#006666",
        borderRadius: 8,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 12,
        colorPrimary: "#2668f6",
        fontFamily: `Roboto, sans-serif !important`,
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
          borderColor: "#d6d9dc",
          headerBg: "#2668f6",
          headerColor: "#fff",
          headerSortHoverBg: "#3e79f7",
          headerSortActiveBg: "#3e79f7",
        },
        Button: {
          primaryShadow: "",
        },
        Modal: {
          contentBg: "#fff",
          headerBg: "#fff",
        },
        Statistic: {},
        Menu: {},
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
