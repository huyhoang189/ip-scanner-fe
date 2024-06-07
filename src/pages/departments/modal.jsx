import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import departmentSlice from "../../toolkits/departments/slice.js";
import { generateTrees } from "../../utils/tree.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const {
    modalActive,
    selectedDepartment,
    pageSize,
    pageNumber,
    departments,
    departmentTrees,
  } = useSelector((state) => state.departments);
  const [tree, setTree] = useState([]);
  const handleModal = (_item) => {
    dispatch(departmentSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      departmentSlice.actions.handleDepartment({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDepartment);
      clone[key] = event.target.value;
      dispatch(departmentSlice.actions.updateSelectedDepartmentInput(clone));
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDepartment);
      clone[key] = event;
      dispatch(departmentSlice.actions.updateSelectedDepartmentInput(clone));
    }
  };

  //sIDe effect
  useEffect(() => {
    if (modalActive)
      dispatch(
        departmentSlice.actions.getDepartmentTrees({
          pageNumber: 1,
          pageSize: 10000,
        })
      );
  }, [dispatch, modalActive]);

  useEffect(() => {
    if (departmentTrees) setTree(generateTrees(departmentTrees));
  }, [departmentTrees]);

  console.log(departmentTrees);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDepartment?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDepartment)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDepartment)
      }
      title={selectedDepartment?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên đơn vị"
        placeholder="Nhập vào tên đơn vị"
        onChange={onRecordInputChange}
        property={"Name"}
        value={selectedDepartment?.Name}
      />

      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"Description"}
        value={selectedDepartment?.Description}
      />

      <NumberInput
        title="Số thứ tự"
        onChange={onRecordSelectInputChange}
        property={"Position"}
        value={selectedDepartment?.Position}
        max={1000}
      />

      <SelectInput
        title="Loại danh mục"
        onChange={onRecordSelectInputChange}
        property={"IsCategory"}
        value={selectedDepartment?.IsCategory}
        options={[
          { label: "Danh mục", value: false },
          { label: "Đơn vị", value: true },
        ]}
      />
      <TreeInput
        title="Đơn vị cha"
        onChange={onRecordSelectInputChange}
        property={"ParentID"}
        value={selectedDepartment?.ParentID}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
