import { Modal } from "antd";
import React from "react";

const FullScreenModal = ({ children, open, onCancel }) => {
  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={null}
        maskClosable={false}
        className="popup-fullwidth popup-fullwidth-modal-area"
      >
        {children}
      </Modal>
    </>
  );
};

export default FullScreenModal;
