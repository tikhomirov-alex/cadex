import { Button, Flex } from "antd";
import { PrimitivesList } from "../PrimitivesList/PrimitivesList";
import "./SidePanel.scss";
import type { PrimitiveItem } from "../../../types/PrimitiveItem";

interface SidePanelProps {
  onAdd: () => void;
  onClear: () => void;
  updateColor: (item: PrimitiveItem, color: number) => void;
  highlightObject: (item: PrimitiveItem) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ onAdd, onClear, updateColor, highlightObject }) => {
  return (
    <Flex vertical className="side-panel" justify="space-between">
      <PrimitivesList updateColor={updateColor} highlightObject={highlightObject} />
      <Flex justify="space-evenly">
        <Button variant="outlined" color="red" onClick={onClear}>
          Clear scene
        </Button>
        <Button variant="filled" color="primary" onClick={onAdd}>
          Add group
        </Button>
      </Flex>
    </Flex>
  );
};
