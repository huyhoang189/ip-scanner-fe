import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import scanSlice from "../../toolkits/scans/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import { useParams } from "react-router-dom";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { session_id } = params;
  const { modalActive, selectedScan, pageNumber } = useSelector(
    (state) => state.scans
  );
  const handleModal = (_item) => {
    dispatch(scanSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      scanSlice.actions.handleScan({
        item: { ...item, SessionID: session_id },
        actionName: _actionName,
        pageSize: 10,
        pageNumber: pageNumber,
        SessionID: session_id,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedScan);
      clone[key] = event.target.value;
      dispatch(scanSlice.actions.updateSelectedScanInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedScan?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedScan)
          : () => handleRecord(ACTION_NAME.CREATE, selectedScan)
      }
      title={selectedScan?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Nhập lệnh quét"
        placeholder="192.168.1.0/24"
        onChange={onRecordInputChange}
        property={"Command"}
        value={selectedScan?.Command}
      />
    </CustomeModal>
  );
};

export default ModalItem;
