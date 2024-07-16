import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import departmentSlice from "../../toolkits/departments/slice.js";
import identifySlice from "../../toolkits/identifies/slice.js";
import { generateTrees, generateTreesOnlyValue } from "../../utils/tree.js";
import TextInput from "../../components/Form/textinput.jsx";
import TreeInput from "../../components/Form/treeInput.jsx";
import CustomeModal from "../../components/Form/modal.jsx";
import { notification } from "antd";
// import NumberInput from "../../components/Form/numberinput.jsx";
// import SelectInput from "../../components/Form/selectinput.jsx";
// import { isValidIP } from "../../utils/regex.js";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.departments);
  const { modalActive, selectedIdentify } = useSelector(
    (state) => state.identifies
  );
  const { pageSize, pageNumber } = useSelector((state) => state.scans);
  const [tree, setTree] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const handleModal = (_item) => {
    dispatch(identifySlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);

    if (_item?.DepartmentID != null) {
      dispatch(
        identifySlice.actions.identifyIpRange({
          item: {
            data: _item.IpRanges.map((e) => ({
              ID: e,
              DepartmentID: _item?.DepartmentID,
            })),
            SessionID: _item?.SessionID,
          },
          actionName: _actionName,
          pageSize: pageSize,
          pageNumber: pageNumber,
        })
      );
    } else {
      api.error({ message: "Hay chọn đơn vị trước khi định danh!" });
    }
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedIdentify);
      clone[key] = event.target.value;
      dispatch(identifySlice.actions.updateSelectedIdentyfiInput(clone));
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedIdentify);
      clone[key] = event;
      dispatch(identifySlice.actions.updateSelectedIdentyfiInput(clone));
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
    if (departments) setTree(generateTreesOnlyValue(departments));
  }, [departments]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.IDENTIFY, selectedIdentify)}
      title={"Định danh cho dải địa chỉ IP"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      {contextHolder}
      {/* <TextInput
        title="Nhập vào dải địa chỉ"
        placeholder="Nhập vào địa chỉ"
        onChange={onRecordInputChange}
        property={"IpRange"}
        value={selectedIdentify?.Command}
        disabled={true}
      /> */}

      <TreeInput
        title="Đơn vị"
        onChange={onRecordSelectInputChange}
        property={"DepartmentID"}
        value={selectedIdentify?.DepartmentID}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
