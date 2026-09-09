import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "preact/hooks";

import { heroVisualStyles } from "./HeroVisual.stylex.ts";

const NARROW_QUERY = "(max-width: 768px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const shouldSkipWebGL = () =>
  window.matchMedia(REDUCED_QUERY).matches || window.matchMedia(NARROW_QUERY).matches;

const mountMintScene = async (canvas: HTMLCanvasElement) => {
  const THREE = await import("three");

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 4;

  const geometry = new THREE.IcosahedronGeometry(1.2, 4);
  const material = new THREE.MeshStandardMaterial({
    color: 0x16a36a,
    roughness: 0.45,
    metalness: 0.1,
    flatShading: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const light = new THREE.DirectionalLight(0xddf4e9, 1.2);
  light.position.set(2, 3, 4);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xf7f5ee, 0.6));

  const handles = { frameId: 0, disposed: false };
  const reducedQuery = window.matchMedia(REDUCED_QUERY);

  const dispose = () => {
    if (handles.disposed) return;
    handles.disposed = true;
    cancelAnimationFrame(handles.frameId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    window.removeEventListener("resize", onResize);
    reducedQuery.removeEventListener("change", stopOnReduced);
  };

  const animate = () => {
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;
    renderer.render(scene, camera);
    handles.frameId = requestAnimationFrame(animate);
  };

  const onResize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const stopOnReduced = () => {
    if (!reducedQuery.matches) return;
    dispose();
  };

  window.addEventListener("resize", onResize);
  reducedQuery.addEventListener("change", stopOnReduced);
  animate();

  return dispose;
};

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || shouldSkipWebGL()) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    mountMintScene(canvas).then((dispose) => {
      if (cancelled) {
        dispose();
        return;
      }
      teardown = dispose;
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <canvas {...stylex.props(heroVisualStyles.canvas)} data-hero-canvas ref={canvasRef} />;
}

export default HeroCanvas;
