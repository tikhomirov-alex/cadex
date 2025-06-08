import * as THREE from 'three';
import type { PrimitiveType } from '../types/PrimitiveItem';
import { Primitive } from '../components/prefabs/Primitive';

export const SCALE_FACTOR = 0.2;

export function createPrimitive(
  type: PrimitiveType,
  length: number,
  width: number,
  height: number
) {
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
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  
  return { mesh, material, color };
}

export function calculateSceneBounds(camera: THREE.PerspectiveCamera) {
  const fov = camera.fov * (Math.PI / 180);
  const aspect = camera.aspect;
  const cameraPosition = camera.position;
  const targetZ = 0;
  const d = Math.abs(cameraPosition.z - targetZ);
  
  const visibleHeight = 2 * d * Math.tan(fov / 2);
  const visibleWidth = visibleHeight * aspect;
  
  return { visibleWidth, visibleHeight };
}
