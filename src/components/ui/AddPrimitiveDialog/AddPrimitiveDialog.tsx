import { Flex, InputNumber, Modal, Select, Space, Typography } from "antd";
import { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import type { PrimitiveType } from "../../../types/PrimitiveItem";
import './AddPrimitiveDialog.scss';

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
      className="modal"
    >
      <Flex vertical gap="10px">
        <Space size="large">
          <Typography className="modal-label">Type:</Typography>
          <Select
            defaultValue={type}
            className="modal-input"
            onChange={(value) => setType(value)}
            options={[
              { value: "Box", label: "Box" },
              { value: "Pyramid", label: "Pyramid" },
            ]}
          />
        </Space>
        <Space size="large">
          <Typography className="modal-label">Length:</Typography>
          <InputNumber
            className="modal-input"
            value={length}
            min={5}
            max={100}
            onChange={(val) => setLength(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography className="modal-label">Width:</Typography>
          <InputNumber
            className="modal-input"
            value={width}
            min={5}
            max={100}
            onChange={(val) => setWidth(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography className="modal-label">Height:</Typography>
          <InputNumber
            className="modal-input"
            value={height}
            min={5}
            max={100}
            onChange={(val) => setHeight(Number(val))}
          />
        </Space>
        <Space size="large">
          <Typography className="modal-label">Number:</Typography>
          <InputNumber
            className="modal-input"
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
