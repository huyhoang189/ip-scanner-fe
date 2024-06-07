import { Tree } from "antd";

const TreeView = ({ treeData, onSelected }) => {
  return (
    <Tree
      treeData={treeData}
      showLine={true}
      onSelect={onSelected}
      defaultExpandAll
    />
  );
};

export default TreeView;
