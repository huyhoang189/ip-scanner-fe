import { Tree } from "antd";
import CustomeTable from "../Table/table";
import { useState } from "react";

// const TreeView = ({ treeData, onSelected }) => {
//   return (
//     <Tree
//       treeData={treeData}
//       showLine={true}
//       onSelect={onSelected}
//       autoExpandParent={true}
//       expandedKeys={["0-0"]}
//     />
//   );
// };

const TreeView = ({ treeData, onSelected }) => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0"]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    <Tree
      style={{ fontWeight: "bold", height: 600, overflow: "auto" }}
      treeData={treeData}
      showLine={true}
      onSelect={onSelected}
      onExpand={onExpand}
      expandedKeys={[...expandedKeys]}
      // autoExpandParent={autoExpandParent}
      // onCheck={onCheck}
    />
  );
};

const TreeView_2 = ({ treeData, onSelected }) => {
  return (
    <CustomeTable
      data={treeData}
      columns={baseColumns}
      showHeader={false}
      pagination={false}
      rowSelection={{
        type: "radio",
        onChange: onSelected,
      }}
    />
  );
};

export default TreeView;
