import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME, ScanModeOptions } from "../../utils/common.js";
import { useEffect, useState } from "react";
import sessionSlice from "../../toolkits/sessions/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";

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

  const onRecordSelectedInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedSession);
      clone[key] = event;
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
        property={"Title"}
        value={selectedSession?.Title}
      />
      <TextInput
        title="Mô tả phiên quét"
        placeholder="Nhập vào mô tả phiên quét"
        onChange={onRecordInputChange}
        property={"Description"}
        value={selectedSession?.Description}
      />
      <TextInput
        title="Lệnh quét"
        placeholder="Nhập vào lệnh quét"
        onChange={onRecordInputChange}
        property={"Command"}
        value={selectedSession?.Command}
      />
      <SelectInput
        title="Chế độ quét"
        // placeholder="Nhập vào lệnh quét"
        onChange={onRecordSelectedInputChange}
        property={"Mode"}
        value={selectedSession?.Mode}
        options={ScanModeOptions}
      />
    </CustomeModal>
  );
};

export default ModalItem;
