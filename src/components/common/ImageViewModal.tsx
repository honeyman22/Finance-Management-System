import { Modal } from "@mantine/core";const ImageViewModal = ({
  open,
  toggle,
  image,
}: {
  open: boolean;
  toggle: () => void;
  image: any;
}) => {
  return (
    <Modal
      opened={open}
      onClose={toggle}
      centered
      size={"xl"}
      withCloseButton={false}
    >
      <img src={image} alt="Receipt" className="" />
    </Modal>
  );
};

export default ImageViewModal;
