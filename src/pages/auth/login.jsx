import { Button, Flex, Image, Input, Space, Typography } from "antd";
import bg from "../../assets/img-17.jpg";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import authSlice from "../../toolkits/auth/slice";
import { useDispatch } from "react-redux";
import { checkBackendAvailability } from "../../utils/checkApi";
import TextInput from "../../components/Form/textinput";

const backendIps = [
  import.meta.env.VITE_BASE_BE_URL,
  import.meta.env.VITE_BASE_BE_INTERNAL_URL,
  import.meta.env.VITE_BASE_BE_PUBLIC_URL,
];

export default function Login() {
  const [backendURL, setBackendURL] = useState(
    localStorage.getItem("backendURL") || ""
  );

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // window.location.href = "/";
    dispatch(
      authSlice.actions.login({
        UserName: username,
        Password: password,
      })
    );
  };

  useEffect(() => {
    async function checkAndSetBackend() {
      const availableIP = await checkBackendAvailability(backendIps);
      if (availableIP) {
        setBackendURL(availableIP);
      } else {
        alert("Không có máy chủ backend nào khả dụng!");
      }
    }
    if (!backendURL) {
      checkAndSetBackend();
    }
  }, [backendURL]);

  useEffect(() => {
    if (backendURL) {
      localStorage.setItem("backendURL", backendURL);
    }
  }, [backendURL]);

  return (
    <Flex
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      justify="center"
      align="center"
    >
      <Flex
        style={{
          width: 400,
          height: 600,
          backgroundColor: "#fff",
          borderRadius: 10,
          boxShadow: `10px 10px 15px rgba(0, 0, 0, 0.3)`,
        }}
        vertical
        justify="space-around"
        align="center"
      >
        <span>
          <Image src={logo} height={120} preview={false} />
        </span>

        <Space direction="vertical" style={{ width: "80%" }} size={(10, 10)}>
          <Flex vertical gap={10} justify="center" align="center">
            <Typography.Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: 15,
              }}
            >
              Hệ thống quản lý <br /> mạng máy tính quân sự trực tuyến
            </Typography.Text>
          </Flex>
          <Input
            placeholder="Tên đăng nhập ?"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <Input.Password
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            onPressEnter={onSubmit}
          />

          <Button block type="primary" onClick={onSubmit}>
            Đăng nhập
          </Button>

          {/* {errorMessage !== false && (
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            )} */}
        </Space>
        <Typography.Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            height: 50,
          }}
        >
          © Phát triển bởi Cụm 23 - Trung tâm 286
        </Typography.Text>

        <Flex align="center" gap={10} style={{ width: "80%" }}>
          <TextInput
            // title="Địa chỉ Backend"
            property={"backendURL"}
            value={backendURL}
            width={80}
            onChange={(key, event) => {
              setBackendURL(event.target.value);
            }}
          />
          <Button type="primary" onClick={() => window.location.reload()}>
            Lưu lại
          </Button>
        </Flex>

        {/* <p>Đang kết nối đến Backend: {backendURL || "Đang kiểm tra..."}</p> */}
      </Flex>
    </Flex>
  );
}
