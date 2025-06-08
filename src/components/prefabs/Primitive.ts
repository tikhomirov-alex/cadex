import type { PrimitiveType } from "../../types/PrimitiveItem";
import * as THREE from "three";

export const Primitive = (
  type: PrimitiveType,
  length: number,
  width: number,
  height: number
) => {
  const vertices = [];
  const indices = [];
  const normals = [];

  if (type === "Box") {
    vertices.push(
      -width / 2, -height / 2, -length / 2, // 0.0.0
      width / 2, -height / 2, -length / 2, // 1.0.0
      width / 2, height / 2, -length / 2, // 1.1.0
      -width / 2, height / 2, -length / 2, // 0.1.0
      -width / 2, -height / 2, length / 2, // 0.0.1
      width / 2, -height / 2, length / 2, // 1.0.1
      width / 2, height / 2, length / 2, // 1.1.1
      -width / 2, height / 2, length / 2 // 0.1.1
    );

    indices.push(
      2, 1, 0, 3, 2, 0, // Top
      1, 5, 4, 1, 4, 0, // Front
      5, 6, 7, 5, 7, 4, // Bottom
      6, 2, 3, 6, 3, 7, // Back
      0, 3, 7, 0, 7, 4, // Left
      1, 6, 5, 1, 2, 6 // Right
    );

    normals.push(
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // Top
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, // Front
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // Bottom
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // Back
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // Left
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 // Right
    );
  }

  if (type === 'Pyramid') {
    vertices.push(
      -width / 2, -height / 2, -length / 2,  // 0, 0, 0
      width / 2, -height / 2, -length / 2,   // 1, 0, 0
      width / 2, -height / 2, length / 2,    // 1, 0, 1
      -width / 2, -height / 2, length / 2,   // 0, 0, 1
      
      0, height / 2, 0                      // 0.5, 1, 0.5
    );

    indices.push(
      0, 4, 1, // Front
      1, 4, 2, // Right
      2, 4, 3, // Back
      3, 4, 0, // Left
      0, 1, 2, 2, 3, 0 // Foundation
    );

    normals.push(
      0, 0.707, -0.707, 0, 0.707, -0.707, 0, 0.707, -0.707, // Front
      0.707, 0.707, 0, 0.707, 0.707, 0, 0.707, 0.707, 0, // Right
      0, 0.707, 0.707, 0, 0.707, 0.707, 0, 0.707, 0.707, // Back
      -0.707, 0.707, 0, -0.707, 0.707, 0, -0.707, 0.707, 0, // Left
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0 // Foundation
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(normals, 3)
  );
  geometry.computeVertexNormals();

  return geometry;
};
