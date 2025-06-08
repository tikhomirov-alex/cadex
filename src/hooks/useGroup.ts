import type { Dispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import * as THREE from 'three';
import type { PrimitiveType } from '../types/PrimitiveItem';
import { calculateSceneBounds, createPrimitive } from '../utils/primitive.util';
import { addPrimitive } from '../store/primitiveSlice';

export function useGroup(
  addObject: (mesh: THREE.Mesh) => void,
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>,
  materialReferences: Map<string, THREE.MeshPhysicalMaterial>,
  dispatch: Dispatch,
  boxCount: number,
  pyramidCount: number,
  closeDialog: () => void
) {
  return useCallback((
    type: PrimitiveType,
    length: number,
    width: number,
    height: number,
    count: number
  ) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const { visibleWidth, visibleHeight } = calculateSceneBounds(camera);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * visibleWidth;
      const z = (Math.random() - 0.5) * visibleHeight;

      const { mesh, material, color } = createPrimitive(type, length, width, height);

      mesh.position.set(x, height / 2, z);
      materialReferences.set(material.uuid, material);

      addObject(mesh);

      const name = `${type}${type === "Box" ? ++boxCount : ++pyramidCount}`;
      dispatch(
        addPrimitive({
          name,
          type,
          color: color.getStyle(),
          position: `(${mesh.position.x.toFixed(2)}, ${mesh.position.y.toFixed(2)}, ${mesh.position.z.toFixed(2)})`,
          materialUUID: material.uuid
        })
      );
      closeDialog();
    }
  }, [addObject, cameraRef, materialReferences, dispatch, boxCount, pyramidCount, closeDialog]);
}
