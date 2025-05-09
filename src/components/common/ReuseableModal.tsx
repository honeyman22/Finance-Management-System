import { Modal } from "@mantine/core";const ReuseableModal = ({
  open,
  toggle,
  func,
  title,
  subtitle,
}: {
  open: boolean;
  toggle: () => void;
  func: () => void;
  title: string;
  subtitle: string;
}) => {
  return (
    <Modal
      opened={open}
      centered
      size={"sm"}
      withCloseButton={false}
      onClose={toggle}
    >
      <div className="flex flex-col gap-2 items-center">
        <h3 className="font-medium text-xl text-red-500">{title}</h3>
        <p className="">{subtitle}</p>
        <div className="flex w-full mt-3 gap-4">
          <button
            type="button"
            aria-label="cancle"
            onClick={() => {
              toggle();
            }}
            className="bg-gray-600 flex-1  text-white rounded-md px-4 py-2"
          >
            No
          </button>
          <button
            onClick={func}
            aria-label="submit"
            className="bg-blue-600  flex-1 text-white rounded-md px-4 py-2"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReuseableModal;
