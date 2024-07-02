import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME, ScanModeOptions } from "../../utils/common.js";
import { useEffect, useState } from "react";
import curatorSlice from "../../toolkits/curators/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";
import { useParams } from "react-router-dom";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;
  const { modalActive, selectedCurator } = useSelector(
    (state) => state.curators
  );
  const handleModal = (_item) => {
    dispatch(curatorSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      curatorSlice.actions.handleCurator({
        item: {
          ...item,
          DepartmentID: id,
        },
        actionName: _actionName,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedCurator);
      clone[key] = event.target.value;
      dispatch(curatorSlice.actions.updateSelectedCuratorInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedCurator?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedCurator)
          : () => handleRecord(ACTION_NAME.CREATE, selectedCurator)
      }
      title={selectedCurator?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên cán bộ"
        // placeholder="Nhập vào tên cán bộ"
        onChange={onRecordInputChange}
        property={"Name"}
        value={selectedCurator?.Name}
      />
      <TextInput
        title="Chức vụ"
        // placeholder="Nhập vào mô tả phiên quét"
        onChange={onRecordInputChange}
        property={"Position"}
        value={selectedCurator?.Position}
      />
      <TextInput
        title="Số điện thoại di động"
        // placeholder="Nhập vào lệnh quét"
        onChange={onRecordInputChange}
        property={"MobileNumber"}
        value={selectedCurator?.MobileNumber}
      />

      <TextInput
        title="Số điện thoại bàn"
        onChange={onRecordInputChange}
        property={"LandlineNumber"}
        value={selectedCurator?.LandlineNumber}
      />
    </CustomeModal>
  );
};

export default ModalItem;
