import { Input, Space, Typography } from "antd";
import PropTypes from "prop-types";

const PasswordInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  placeholder = "Nhập dữ liệu",
  disabled = false,
  size = 0,
  width = 100,
  status = "",
}) => {
  return (
    <Space
      direction="vertical"
      style={{ width: `${width}%`, marginTop: 5, marginBottom: 5 }}
      size={size}
    >
      <Typography.Text>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <Input.Password
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(property, e)}
        disabled={disabled}
        status={status}
      />
    </Space>
  );
};

PasswordInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  status: PropTypes.string,
};

export default PasswordInput;
