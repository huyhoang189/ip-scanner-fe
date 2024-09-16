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
        borderRadius: 2,
        colorBorderSecondary: "#d6d9dc",
        colorBorder: "#d6d9dc",
        fontSize: 14,
        colorPrimary: "#008080",
      },
      components: {
        Table: {
          rowHoverBg: "#fff",
          borderColor: "#d6d9dc",
          headerBg: "#008080",
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
          darkItemBg: "#006666",
          darkSubMenuItemBg: "#006666",
          darkItemColor: "#fff",
          darkItemHoverBg: "#009999",
          darkItemSelectedBg: "#008080",
          itemSelectedBg: "#009999",
          darkPopupBg: "#008080",
        },
        Divider: {
          colorBgBase: "#d6d9dc",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
