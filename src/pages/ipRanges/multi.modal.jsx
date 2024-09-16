import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import departmentSlice from "../../toolkits/departments/slice.js";
import ipRangeSlice from "../../toolkits/ipRanges/slice.js";
import { generateTrees } from "../../utils/tree.js";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";

const ModalItem = ({ selectedIpRanges }) => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const { modalUpdateActive, selectedIpRange, pageSize, pageNumber } =
    useSelector((state) => state.ipRanges);
  const [tree, setTree] = useState([]);

  const handleModal = (_item) => {
    dispatch(ipRangeSlice.actions.toggleModalUpdate(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      ipRangeSlice.actions.updateDepartmentIdForIpRanges({
        item: {
          DepartmentID: item.DepartmentID,
          IpRangeIDs: selectedIpRanges,
        },
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedIpRange);
      clone[key] = event;
      dispatch(ipRangeSlice.actions.updateSelectedIpRangeInput(clone));
    }
  };

  //sIDe effect
  useEffect(() => {
    if (modalUpdateActive)
      dispatch(
        departmentSlice.actions.getDepartments({
          pageNumber: 1,
          pageSize: 10000,
        })
      );
  }, [dispatch, modalUpdateActive]);

  useEffect(() => {
    if (departments) setTree(generateTrees(departments));
  }, [departments]);

  console.log("selectedIpRanges", selectedIpRanges);
  return (
    <CustomeModal
      open={modalUpdateActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.UPDATE, selectedIpRange)}
      title={"Cập nhật danh danh sách dải địa chỉ IP"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TreeInput
        title="Đơn vị"
        onChange={onRecordSelectInputChange}
        property={"DepartmentID"}
        value={selectedIpRange?.DepartmentID}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
