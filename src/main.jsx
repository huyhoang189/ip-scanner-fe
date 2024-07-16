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
        colorText: "#2b3d55",
        colorBorder: "#2b3d55",
        borderRadius: 3,
        colorBorderSecondary: "#d6d9dc",
        fontSize: 14,
        colorPrimary: "#007bff",
      },
      components: {
        Table: {
          rowHoverBg: "#f9f9f9",
          borderColor: "#2b3d55",
          fontSize: 13,
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
        // Card: {
        //   borderColor: "#2b3d55",
        // },
      },
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);
