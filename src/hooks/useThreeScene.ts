import { useEffect, useRef } from "react";
import * as THREE from "three";

const useThreeScene = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const lighting = (scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 45, 20);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080808, 0.5);
    scene.add(hemiLight);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const container = document.getElementById("scene");
    if (!container) {
      console.error("Container with id 'scene' not found");
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(20, 40, 20);
    camera.lookAt(0, 0, 0);
    camera.castShadow = true;

    lighting(scene);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  const addObject = (object: THREE.Object3D) => {
    if (sceneRef.current) {
      sceneRef.current.add(object);
      object.castShadow = true;
      object.receiveShadow = true;
    }
  };

  const clearScene = () => {
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
      lighting(sceneRef.current);
    }
  };

  return { addObject, clearScene, cameraRef };
};

export default useThreeScene;
