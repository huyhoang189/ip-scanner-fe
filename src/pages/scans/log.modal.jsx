import { useDispatch, useSelector } from "react-redux";
import { ACTION_NAME } from "../../utils/common.js";
import { useEffect, useState } from "react";
import scanSlice from "../../toolkits/scans/slice.js";
import CustomeModal from "../../components/Form/modal.jsx";
import { useParams } from "react-router-dom";

import { Input } from "antd";
import { convertTime } from "../../utils/time.js";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { session_id } = params;
  const { modalActive, scanLogs } = useSelector((state) => state.scans);
  const handleModal = (_item) => {
    dispatch(scanSlice.actions.toggleModal(_item));
  };

  useEffect(() => {
    if (modalActive) {
      dispatch(
        scanSlice.actions.getScanLogBySessionIDs({
          SessionID: session_id,
          pageSize: 256,
        })
      );
    }
  }, [modalActive]);

  const dataSource = scanLogs?.map((e) => {
    return `${convertTime(e?.UpdatedAt)}\t\tScanning Ip range ${
      e?.Command
    }\t\t\t\t${e?.Status}`;
  });

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      title={"Chi tiết phiên quét"}
      okText="Chấp nhận"
      cancelText="Từ chối"
      width={1000}
    >
      <Input.TextArea
        style={{ width: "100%" }}
        rows={50}
        value={dataSource?.join("\n")}
        readOnly
      />
    </CustomeModal>
  );
};

export default ModalItem;
