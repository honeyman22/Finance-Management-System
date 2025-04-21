import { Group, Text } from "@mantine/core";import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdClose } from "react-icons/md";
const CustomDropzone = ({
  image,
  onDrop,
  onReject,
  id,
  label,
}: {
  image?: any;
  onDrop?: any;
  onReject?: any;
  id: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {image ? (
        <div className="h-[220px] relative w-full">
          <img
            src={URL.createObjectURL(image)}
            alt="images"
            className="object-cover h-full w-full"
          />
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2"
            onClick={() => onDrop([])}
          >
            <MdClose size={20} />
          </button>
        </div>
      ) : (
        <Dropzone
          onDrop={(files) => onDrop(files)}
          onReject={(files) => onReject(files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          h={220}
        >
          <Group gap="xl" mih={220} style={{ pointerEvents: "none" }}>
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </div>
  );
};

export default CustomDropzone;
