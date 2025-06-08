import { useMemo, useState } from "react";
import * as THREE from "three";
import type { PrimitiveItem } from "../types/PrimitiveItem";

export function useMaterialManager() {
  const materialReferences = useMemo(
    () => new Map<string, THREE.MeshPhysicalMaterial>(),
    []
  );

  const [selectedObject, setSelectedObject] =
    useState<THREE.MeshPhysicalMaterial | null>(null);

  const highlightObject = (item: PrimitiveItem | null) => {
    if (selectedObject) {
      selectedObject.emissive.set(0x000000);
      selectedObject.needsUpdate = true;
    }
    if (!item) {
      return;
    }

    const material = materialReferences.get(item.materialUUID);
    if (!material) {
      return;
    }

    setSelectedObject(material);

    material.emissive.set(new THREE.Color(0xffff00));
    material.needsUpdate = true;
  };

  const updateColor = (item: PrimitiveItem, color: number) => {
    const material = materialReferences.get(item.materialUUID);
    if (material) {
      material.color.set(color);
    }
  };

  return {
    materialReferences,
    highlightObject,
    updateColor
  };
}
