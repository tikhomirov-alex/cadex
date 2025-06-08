import { Button, Flex } from "antd";
import { PrimitivesList } from "../PrimitivesList/PrimitivesList";
import type { PrimitiveItem } from "../../../types/PrimitiveItem";
import { useState } from "react";
import "./SidePanel.scss";

interface SidePanelProps {
  onAdd: () => void;
  onClear: () => void;
  updateColor: (item: PrimitiveItem, color: number) => void;
  highlightObject: (item: PrimitiveItem | null) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  onAdd,
  onClear,
  updateColor,
  highlightObject,
}) => {
  const handlePanelClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("ant-list-item")) {
      highlightObject(null);
      setSelectedItem(null);
    }
  };

  const [selectedItem, setSelectedItem] = useState<PrimitiveItem | null>(null);

  return (
    <Flex
      vertical
      className="side-panel"
      justify="space-between"
      onClick={handlePanelClick}
    >
      <PrimitivesList
        updateColor={updateColor}
        highlightObject={highlightObject}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
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
