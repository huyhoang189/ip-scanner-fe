import { Space, TreeSelect, Typography } from "antd";
import PropTypes from "prop-types";

const TreeInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  disabled = false,
  size = 0,
  width = 100,
  options = [],
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
      <TreeSelect
        treeLine={true}
        style={{
          width: "100%",
        }}
        treeData={options}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(property, e)}
      />
    </Space>
  );
};

TreeInput.propTypes = {
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

export default TreeInput;
