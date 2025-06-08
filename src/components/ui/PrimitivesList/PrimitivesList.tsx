import { ColorPicker, Flex, List, Typography } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { PrimitiveItem } from "../../../types/PrimitiveItem";
import * as THREE from "three";
import './PrimitiveList.scss';

interface PrimitivesListProps {
  updateColor: (item: PrimitiveItem, color: number) => void;
  highlightObject: (item: PrimitiveItem | null) => void;
  selectedItem: PrimitiveItem | null,
  setSelectedItem: React.Dispatch<React.SetStateAction<PrimitiveItem | null>>
}

export const PrimitivesList: React.FC<PrimitivesListProps> = ({
  updateColor,
  highlightObject,
  selectedItem,
  setSelectedItem
}) => {
  const primitives = useSelector((state: RootState) => state.primitives.items);

  const { Title, Text } = Typography;

  return (
    <Flex vertical align="center" style={{ maxHeight: "90%" }}>
      <Title level={4}>Objects list:</Title>
      {primitives.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={primitives}
          bordered
          style={{ flex: 1, overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item
              key={item.name}
              className={`item ${selectedItem === item ? "selected" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
                highlightObject(item);
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                className="item-meta"
              >
                <Flex vertical>
                  <Text strong>{item.name}</Text>
                  <Text code>{`position: ${item.position}`}</Text>
                </Flex>

                <ColorPicker
                  defaultValue={item.color}
                  onChange={(color) =>
                    updateColor(
                      item,
                      new THREE.Color(color.toHex()).getHex()
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
