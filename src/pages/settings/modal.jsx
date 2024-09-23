import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import settingSlice from "../../toolkits/settings/slice.js";
import TextInput from "../../components/Form/textinput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedSetting, pageNumber } = useSelector(
    (state) => state.settings
  );
  const handleModal = (_item) => {
    dispatch(settingSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      settingSlice.actions.handleSetting({
        item: item,
        actionName: _actionName,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedSetting);
      clone[key] = event.target.value;
      dispatch(settingSlice.actions.updateSelectedSettingInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedSetting?.ID
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedSetting)
          : () => handleRecord(ACTION_NAME.CREATE, selectedSetting)
      }
      title={selectedSetting?.ID ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Key"
        onChange={onRecordInputChange}
        property={"SettingKey"}
        disabled={true}
        value={selectedSetting?.SettingKey}
      />
      <TextInput
        title="Giá trị"
        onChange={onRecordInputChange}
        property={"SettingValue"}
        value={selectedSetting?.SettingValue}
      />
      <TextInput
        title="Mô tả"
        placeholder="Nhập vào mô tả"
        onChange={onRecordInputChange}
        property={"Description"}
        value={selectedSetting?.Description}
      />
    </CustomeModal>
  );
};

export default ModalItem;
