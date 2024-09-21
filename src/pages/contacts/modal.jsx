import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import departmentSlice from "../../toolkits/departments/slice.js";
import contactSlice from "../../toolkits/contacts/slice.js";
import { generateTrees } from "../../utils/tree.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";
import { isValidIP } from "../../utils/regex.js";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const { modalActive, selectedContact, pageSize, pageNumber } = useSelector(
    (state) => state.contacts
  );
  const [tree, setTree] = useState([]);
  const [ipCheck, setIpCheck] = useState("");
  const handleModal = (_item) => {
    dispatch(contactSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      contactSlice.actions.handleContact({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedContact);
      clone[key] = event.target.value;
      dispatch(contactSlice.actions.updateSelectedContactInput(clone));
    }

    if (key === "Contact")
      setIpCheck(isValidIP(event.target.value) ? "" : "error");
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedContact);
      clone[key] = event;
      dispatch(contactSlice.actions.updateSelectedContactInput(clone));
    }
  };

  //sIDe effect
  useEffect(() => {
    if (modalActive)
      dispatch(
        departmentSlice.actions.getDepartments({
          pageNumber: 1,
          pageSize: 10000,
        })
      );
  }, [dispatch, modalActive]);

  useEffect(() => {
    if (departments) setTree(generateTrees(departments));
  }, [departments]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedContact?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedContact)
          : () => handleRecord(ACTION_NAME.CREATE, selectedContact)
      }
      title={selectedContact?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên cán bộ"
        // placeholder="Nhập vào tên cán bộ"
        onChange={onRecordInputChange}
        property={"Name"}
        value={selectedContact?.Name}
      />
      <TextInput
        title="Chức vụ"
        // placeholder="Nhập vào mô tả phiên quét"
        onChange={onRecordInputChange}
        property={"Position"}
        value={selectedContact?.Position}
      />
      <TextInput
        title="Số điện thoại di động"
        // placeholder="Nhập vào lệnh quét"
        onChange={onRecordInputChange}
        property={"MobileNumber"}
        value={selectedContact?.MobileNumber}
      />

      <TextInput
        title="Số điện thoại bàn"
        onChange={onRecordInputChange}
        property={"LandlineNumber"}
        value={selectedContact?.LandlineNumber}
      />
      <TreeInput
        title="Đơn vị"
        onChange={onRecordSelectInputChange}
        property={"DepartmentID"}
        value={selectedContact?.DepartmentID}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
