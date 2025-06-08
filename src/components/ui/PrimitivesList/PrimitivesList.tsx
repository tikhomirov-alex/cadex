import { ColorPicker, Flex, List, Typography } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { PrimitiveItem } from "../../../types/PrimitiveItem";
import * as THREE from "three";
import { useState } from "react";

interface PrimitivesListProps {
  updateColor: (item: PrimitiveItem, color: number) => void;
  highlightObject: (item: PrimitiveItem) => void;
}

export const PrimitivesList: React.FC<PrimitivesListProps> = ({
  updateColor,
  highlightObject,
}) => {
  const primitives = useSelector((state: RootState) => state.primitives.items);

  const [selectedItem, setSelectedItem] = useState<PrimitiveItem | null>(null);

  return (
    <Flex vertical align="center" style={{ maxHeight: "90%" }}>
      <Typography>Objects list:</Typography>
      {primitives.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={primitives}
          bordered
          style={{ flex: 1, overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item
              key={item.name}
              style={{
                minWidth: "350px",
                cursor: "pointer",
                backgroundColor: selectedItem === item ? "#6babff" : "inherit",
                fontWeight: selectedItem === item ? "bold" : "normal",
                userSelect: "none",
              }}
              className={selectedItem === item ? "selected" : ""}
              onClick={() => {
                setSelectedItem(item);
                highlightObject(item);
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "100%" }}
              >
                <Flex vertical>
                  <Typography>{item.name}</Typography>
                  <Typography>{`position: ${item.position}`}</Typography>
                </Flex>

                <ColorPicker
                  defaultValue={item.color}
                  onChange={(color) =>
                    updateColor(
                      item,
                      new THREE.Color(color.toCssString()).getHex()
                    )
                  }
                />
              </Flex>
            </List.Item>
          )}
        />
      )}
    </Flex>
  );
};
