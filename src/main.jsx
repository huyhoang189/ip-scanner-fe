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
        colorBgHome: "#d6d9dc",
        colorBgHeader: "#101720",
        borderRadius: 3,
        colorBorderSecondary: "#d6d9dc",
        fontSize: 13,
        colorPrimary: "#007bff",
      },
      components: {
        Table: {
          // headerBg: "#1e1e1e",
          rowHoverBg: "#f9f9f9",
          // colorText: "#d6d9dc",
          // colorBgBase: "#1e1e1e",
        },
        Tree: {},
        Menu: {
          darkItemBg: "#101720",
          darkPopupBg: "#2b3d55",
          darkItemSelectedBg: "#2b3d55",
        },
        Button: {
          primaryShadow: "",
        },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
