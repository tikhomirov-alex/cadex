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
    // Вершины (по часовой стрелке для каждой грани)
    vertices.push(
      // Передняя грань
      -width / 2, -height / 2, -length / 2, // 0
      width / 2, -height / 2, -length / 2, // 1
      width / 2, height / 2, -length / 2, // 2
      -width / 2, height / 2, -length / 2, // 3
      
      // Задняя грань
      -width / 2, -height / 2, length / 2, // 4
      width / 2, -height / 2, length / 2, // 5
      width / 2, height / 2, length / 2, // 6
      -width / 2, height / 2, length / 2 // 7
    );

    // Индексы (против часовой стрелки для корректного отображения)
    indices.push(
      // Верхняя грань
      2, 1, 0, 3, 2, 0,
      // Передняя грань
      1, 5, 4, 1, 4, 0,
      // Нижняя грань
      5, 6, 7, 5, 7, 4,
      // Задняя грань
      6, 2, 3, 6, 3, 7,
      // Левая грань
      0, 3, 7, 0, 7, 4,
      // Правая грань
      1, 6, 5, 1, 2, 6
    );

    // Нормали (по граням)
    normals.push(
      // Верхняя
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
      // Передняя
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      // Нижняя
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      // Задняя
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      // Левая
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
      // Правая
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0
    );
  }

if (type === 'Pyramid') {
  // Вершины пирамиды
  vertices.push(
    // Основание
    -width / 2, -height / 2, -length / 2,  // 0
    width / 2, -height / 2, -length / 2,   // 1
    width / 2, -height / 2, length / 2,    // 2
    -width / 2, -height / 2, length / 2,   // 3
    
    // Вершина
    0, height / 2, 0                      // 4
  );

  // Индексы пирамиды (против часовой стрелки)
  indices.push(
    // Передняя грань
    0, 4, 1,
    
    // Правая грань
    1, 4, 2,
    
    // Задняя грань
    2, 4, 3,
    
    // Левая грань
    3, 4, 0,
    
    // Основание
    0, 1, 2,
    2, 3, 0
  );

  // Нормали для каждой грани
  normals.push(
    // Передняя грань
    0, 0.707, -0.707, 0, 0.707, -0.707, 0, 0.707, -0.707,
    
    // Правая грань
    0.707, 0.707, 0, 0.707, 0.707, 0, 0.707, 0.707, 0,
    
    // Задняя грань
    0, 0.707, 0.707, 0, 0.707, 0.707, 0, 0.707, 0.707,
    
    // Левая грань
    -0.707, 0.707, 0, -0.707, 0.707, 0, -0.707, 0.707, 0,
    
    // Основание
    0, -1, 0, 0, -1, 0, 0, -1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0
  );
}

  // Создаем геометрию
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
  // geometry.attributes.position.needsUpdate = true;
  // geometry.attributes.normal.needsUpdate = true;
  // geometry.attributes.index.needsUpdate = true;

  return geometry;
};
