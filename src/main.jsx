import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./toolkits/store";
import { router } from "./routers";

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
        colorPrimary: "#3e79f7",
        fontFamily: `Roboto, sans-serif !important`,
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
          borderColor: "#d6d9dc",
          headerBg: "#3e79f7",
          headerColor: "#fff",
        },
        Button: {
          primaryShadow: "",
        },
        Modal: {
          contentBg: "#fff",
          headerBg: "#fff",
        },
        Statistic: {},
        Menu: {
          // darkItemBg: "#006666",
          // darkSubMenuItemBg: "#006666",
          // darkItemColor: "#fff",
          // darkItemHoverBg: "#009999",
          // darkItemSelectedBg: "#008080",
          // itemSelectedBg: "#009999",
          // darkPopupBg: "#008080",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
