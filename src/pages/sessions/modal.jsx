import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import sessionSlice from "../../toolkits/sessions/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedSession, pageNumber } = useSelector(
    (state) => state.sessions
  );
  const handleModal = (_item) => {
    dispatch(sessionSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      sessionSlice.actions.handleSession({
        item: item,
        actionName: _actionName,
        pageSize: 10,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedSession);
      clone[key] = event.target.value;
      dispatch(sessionSlice.actions.updateSelectedSessionInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedSession?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedSession)
          : () => handleRecord(ACTION_NAME.CREATE, selectedSession)
      }
      title={selectedSession?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên phiên quét"
        placeholder="Nhập vào tên phiên quét"
        onChange={onRecordInputChange}
        property={"Name"}
        value={selectedSession?.Name}
      />

      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"Description"}
        value={selectedSession?.Description}
      />
    </CustomeModal>
  );
};

export default ModalItem;
