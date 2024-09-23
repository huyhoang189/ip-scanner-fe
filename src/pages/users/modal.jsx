import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME, ScanModeOptions } from "../../utils/common.js";
import { useEffect, useState } from "react";
import userSlice from "../../toolkits/users/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";
import PasswordInput from "../../components/Form/password.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedUser, pageNumber } = useSelector(
    (state) => state.users
  );
  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      userSlice.actions.handleUser({
        item: item,
        actionName: _actionName,
        pageSize: 10,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedUser);
      clone[key] = event.target.value;
      dispatch(userSlice.actions.updateSelectedUserInput(clone));
    }
  };

  const onRecordSelectedInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedUser);
      clone[key] = event;
      dispatch(userSlice.actions.updateSelectedUserInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedUser?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedUser)
          : () => handleRecord(ACTION_NAME.CREATE, selectedUser)
      }
      title={selectedUser?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên đầy đủ"
        onChange={onRecordInputChange}
        property={"FullName"}
        value={selectedUser?.FullName}
      />
      <TextInput
        title="Tên tài khoản"
        onChange={onRecordInputChange}
        property={"UserName"}
        value={selectedUser?.UserName}
      />

      <PasswordInput
        title="Mật khẩu"
        onChange={onRecordInputChange}
        property={"Password"}
        value={selectedUser?.Password}
      />

      <SelectInput
        title="Quyền người dùng"
        // placeholder="Nhập vào lệnh quét"
        onChange={onRecordSelectedInputChange}
        property={"Permission"}
        value={selectedUser?.Permission}
        options={[
          { value: "ADMIN", label: "Quản trị viên hệ thống" },
          { value: "USER", label: "Người dùng" },
        ]}
      />
    </CustomeModal>
  );
};

export default ModalItem;
