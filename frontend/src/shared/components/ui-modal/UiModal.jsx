import { Modal } from "antd";

const UiModal = ({
  isOpen, // Boolean to control visibility
  onClose, // Function to close modal
  title, // Modal Title
  okText = "OK", // Default button text
  cancelText = "Cancel", // Default cancel button text
  onOk, // Function for OK button
  onCancel, // Function for Cancel button
  footer, // Optional Custom Footer
  children, // Modal Content
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onOk || onClose} // Defaults to closing the modal
      onCancel={onCancel || onClose} // Defaults to closing the modal
      okText={okText}
      cancelText={cancelText}
      footer={footer} // Allows custom buttons if needed
      centered={true}
      width={600}
      styles={{
        content: {
          padding: 0,
        },
        header: {
          padding: "20px 15px",
        },
        body: {
          padding: "10px 25px",
        },
        footer: {
          padding: "0 15px 20px",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default UiModal;
