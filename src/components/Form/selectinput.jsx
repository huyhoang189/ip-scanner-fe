import { Select, Space, Typography } from "antd";
import PropTypes from "prop-types";

const SelectInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  disabled = false,
  size = 0,
  width = 100,
  options = [],
  mode = null,
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
      <Select
        {...(mode && { mode: mode })}
        value={value}
        onChange={(e) => onChange(property, e)}
        style={{ width: "100%" }}
        disabled={disabled}
        options={options}
        filterOption={(input, option) =>
          (option?.label.toUpperCase() ?? "").includes(input.toUpperCase())
        }
        showSearch
      />
    </Space>
  );
};

SelectInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  options: PropTypes.array,
};

export default SelectInput;
