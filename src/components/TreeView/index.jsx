import { Tree } from "antd";
import CustomeTable from "../Table/table";

const TreeView = ({ treeData, onSelected }) => {
  return (
    <Tree
      treeData={treeData}
      showLine={true}
      onSelect={onSelected}
      defaultExpandedKeys={["0-0"]}
    />
  );
};

const baseColumns = [
  {
    title: "Tên đơn vị",
    dataIndex: "Name",
    key: "Name",
    width: "35%",
  },
];

const TreeView_2 = ({ treeData, onSelected }) => {
  return (
    <CustomeTable
      data={treeData}
      columns={baseColumns}
      showHeader={false}
      pagination={false}
    />
  );
};

export default TreeView_2;
