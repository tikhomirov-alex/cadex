import { Flex } from "antd";
import { SidePanel } from "./components/ui/SidePanel/SidePanel";
import { AddPrimitiveDialog } from "./components/ui/AddPrimitiveDialog/AddPrimitiveDialog";
import { useMemo, useState } from "react";
import useThreeScene from "./hooks/useThreeScene";
import * as THREE from "three";
import type { PrimitiveItem, PrimitiveType } from "./types/PrimitiveItem";
import { Primitive } from "./components/prefabs/Primitive";
import { useDispatch, useSelector } from "react-redux";
import { addPrimitive, clearSceneState } from "./store/primitiveSlice";
import type { RootState } from "./store";

function App() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { addObject, clearScene, cameraRef } = useThreeScene();

  const dispatch = useDispatch();
  let boxCount = useSelector((state: RootState) => state.primitives.boxCount);
  let pyramidCount = useSelector(
    (state: RootState) => state.primitives.pyramidCount
  );

  const materialReferences = useMemo(
    () => new Map<string, THREE.MeshPhysicalMaterial>(),
    []
  );

  const [selectedObject, setSelectedObject] =
    useState<THREE.MeshPhysicalMaterial | null>(null);

  const highlightObject = (item: PrimitiveItem) => {
    const material = materialReferences.get(item.materialUUID);

    if (!material) {
      return;
    }

    // Сбрасываем предыдущую подсветку
    if (
      selectedObject &&
      selectedObject instanceof THREE.MeshPhysicalMaterial
    ) {
      selectedObject.emissive.set(0x000000);
      selectedObject.needsUpdate = true;
    }

    // Устанавливаем новый выбранный объект
    setSelectedObject(material);

    // Добавляем эффект подсветки
    if (material instanceof THREE.MeshPhysicalMaterial) {
      material.emissive.set(new THREE.Color("#ffff00").getHex());
      material.needsUpdate = true;
    }
  };

  const SCALE_FACTOR = 0.2;

  const addGroup = (
    type: PrimitiveType,
    length: number,
    width: number,
    height: number,
    count: number
  ) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const fov = camera.fov * (Math.PI / 180); // Переводим в радианы
    const aspect = camera.aspect;
    const cameraPosition = camera.position;
    const targetZ = 0;
    const d = Math.abs(cameraPosition.z - targetZ);

    // Корректный расчет видимой области
    const visibleHeight = 2 * d * Math.tan(fov / 2);
    const visibleWidth = visibleHeight * aspect;

    // Генерация объектов
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * visibleWidth;
      const z = (Math.random() - 0.5) * visibleHeight;

      const geom = Primitive(
        type,
        length * SCALE_FACTOR,
        width * SCALE_FACTOR,
        height * SCALE_FACTOR
      );

      const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
      const material = new THREE.MeshPhysicalMaterial({
        color: color.getHex(),
        metalness: 0.4,
        roughness: 0.7,
        emissiveIntensity: 2.0,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geom, material);

      mesh.position.set(x, height / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      materialReferences.set(material.uuid, material);

      addObject(mesh);

      const name = `${type}${type === "Box" ? ++boxCount : ++pyramidCount}`;
      dispatch(
        addPrimitive({
          name,
          type,
          color: color.getStyle(),
          position: `(${mesh.position.x.toFixed(2)},
              ${mesh.position.y.toFixed(2)},
              ${mesh.position.z.toFixed(2)})`,
          materialUUID: material.uuid,
          checked: false,
        })
      );
    }
  };

  return (
    <Flex>
      <SidePanel
        onAdd={() => setShowDialog(true)}
        onClear={() => {
          clearScene();
          dispatch(clearSceneState());
          materialReferences.clear();
        }}
        updateColor={(item, color) => {
          const material = materialReferences.get(item.materialUUID);
          if (material) {
            material.color.set(color);
          }
        }}
        highlightObject={highlightObject}
      />
      <div id="scene" style={{ width: "100%", height: "100vh" }} />
      <AddPrimitiveDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onAddGroup={addGroup}
      />
    </Flex>
  );
}

export default App;
