import { Button, Flex, Image, Input, Space, Typography } from "antd";
import bg from "../../assets/img-17.jpg";
import logo from "../../assets/logo.png";
import { useState } from "react";
import authSlice from "../../toolkits/auth/slice";
import { useDispatch } from "react-redux";

export default function Login() {
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
              Hệ thống giám sát dải địa chỉ IP
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
      </Flex>
    </Flex>
  );
}
