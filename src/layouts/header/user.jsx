import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Typography } from "antd";
// import { sessionUser } from "../../toolkits/auth/selector";

export default function User({ sessionUser, logout }) {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "PROFILE",
            label: (
              <Flex gap={10}>
                <UserOutlined /> <span>Cá nhân</span>
              </Flex>
            ),
          },
          {
            key: "LOGOUT",
            label: (
              <Flex gap={10}>
                <LogoutOutlined /> <span>Đăng xuất</span>
              </Flex>
            ),
          },
        ],
        onClick: (e) => {
          const { key } = e;
          if (key === "LOGOUT") {
            logout();
          } else if (key === "PROFILE") {
            console.log(key);
          }
        },
      }}
      placement="bottom"
      arrow
      // onClick={navigatePath}
      trigger={["click"]}
      style={{ minWidth: 300 }}
    >
      <Flex align="center" gap={10}>
        <Avatar
          style={{
            backgroundColor: "#87d068",
            minWidth: 30,
          }}
          icon={<UserOutlined />}
        />
        <Flex vertical style={{ width: "100%" }}>
          <Typography.Text style={{ fontSize: 15, fontWeight: 600 }}>
            {sessionUser?.full_name || "Trực ban giám sát"}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 10 }}>
            {sessionUser?.groups || "Cụm 23"}
          </Typography.Text>
        </Flex>
      </Flex>
    </Dropdown>
  );
}
