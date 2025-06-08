import { Flex, InputNumber, Modal, Select, Space, Typography } from "antd";
import { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import type { PrimitiveType } from "../../../types/PrimitiveItem";

interface AddPrimitiveDialogProps {
  open: boolean;
  onClose: () => void;
  onAddGroup: (
    type: PrimitiveType,
    length: number,
    width: number,
    height: number,
    count: number
  ) => void;
}

export const AddPrimitiveDialog: React.FC<AddPrimitiveDialogProps> = ({
  open,
  onClose,
  onAddGroup,
}) => {
  const [type, setType] = useState<PrimitiveType>("Box");
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [count, setCount] = useState<number>(3);

  return (
    <Modal
      title="Add primitives group"
      centered
      open={open}
      onOk={() => onAddGroup(type, length, width, height, count)}
      onCancel={onClose}
      width={"400px"}
      style={{ padding: "10px" }}
    >
      <Flex vertical gap="10px">
        <Space size="large">
          <Typography style={{ width: "120px" }}>Type:</Typography>
          <Select
            defaultValue={type}
            style={{ width: "180px" }}
            onChange={(value) => setType(value)}
            options={[
              { value: "Box", label: "Box" },
              { value: "Pyramid", label: "Pyramid" },
            ]}
          />
        </Space>
        <Space size="large">
          <Typography style={{ width: "120px" }}>Length:</Typography>
          <InputNumber
            style={{ width: "180px" }}
            value={length}
            min={5}
            max={100}
            onChange={(val) => setLength(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography style={{ width: "120px" }}>Width:</Typography>
          <InputNumber
            style={{ width: "180px" }}
            value={width}
            min={5}
            max={100}
            onChange={(val) => setWidth(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography style={{ width: "120px" }}>Height:</Typography>
          <InputNumber
            style={{ width: "180px" }}
            value={height}
            min={5}
            max={100}
            onChange={(val) => setHeight(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography style={{ width: "120px" }}>Number:</Typography>
          <InputNumber
            style={{ width: "180px" }}
            value={count}
            min={1}
            max={10}
            onChange={(val) => setCount(Number(val))}
          />
        </Space>
      </Flex>
    </Modal>
  );
};
