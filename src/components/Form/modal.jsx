import { Divider, Modal } from "antd";
// import { ModalWrapper } from "../../assets/styles/modal-style";

const CustomeModal = (props) => {
  // eslint-disable-next-line react/prop-types
  let { children } = props;
  return (
    <Modal {...props} maskClosable={false} style={{ top: 80 }}>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      {children}
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    </Modal>
  );
};

export default CustomeModal;
