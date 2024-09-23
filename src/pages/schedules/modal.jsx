import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME, ScanModeOptions } from "../../utils/common.js";
import { useEffect, useState } from "react";
import scheduleSlice from "../../toolkits/schedules/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import NumberInput from "../../components/Form/numberinput.jsx";
import SelectInput from "../../components/Form/selectinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedSchedule, pageNumber } = useSelector(
    (state) => state.schedules
  );
  const handleModal = (_item) => {
    dispatch(scheduleSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      scheduleSlice.actions.handleSchedule({
        item: item,
        actionName: _actionName,
        pageSize: 10,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedSchedule);
      clone[key] = event.target.value;
      dispatch(scheduleSlice.actions.updateSelectedScheduleInput(clone));
    }
  };

  const onRecordNumberInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedSchedule);
      clone[key] = event;
      dispatch(scheduleSlice.actions.updateSelectedScheduleInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedSchedule?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedSchedule)
          : () => handleRecord(ACTION_NAME.CREATE, selectedSchedule)
      }
      title={selectedSchedule?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên dịch vụ"
        onChange={onRecordInputChange}
        property={"ServiceName"}
        value={selectedSchedule?.ServiceName}
        disabled
      />
      <NumberInput
        title="Chu kỳ (phút)"
        onChange={onRecordNumberInputChange}
        property={"IntervalDuration"}
        value={selectedSchedule?.IntervalDuration}
        min={1}
        max={36000}
      />

      {/* <SelectInput
        title="Chế độ quét"
        // placeholder="Nhập vào lệnh quét"
        onChange={onRecordSelectedInputChange}
        property={"Mode"}
        value={selectedSchedule?.Mode}
        options={ScanModeOptions}
      /> */}
    </CustomeModal>
  );
};

export default ModalItem;
