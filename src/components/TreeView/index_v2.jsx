import { Tree } from "antd";
import { useState } from "react";

const TreeView = ({
  treeData,
  onSelected,
  onCheck,
  checkedKeys,
  initExpanedKey = [],
}) => {
  const [expandedKeys, setExpandedKeys] = useState(initExpanedKey);
  //   const [checkedKeys, setCheckedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    initExpanedKey && (
      <Tree
        style={{ fontWeight: "bold" }}
        treeData={treeData}
        showLine={true}
        selectable={false}
        onExpand={onExpand}
        expandedKeys={[...expandedKeys]}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        checkable
        autoExpandParent={autoExpandParent}
        checkStrictly
      />
    )
  );
};

export default TreeView;
