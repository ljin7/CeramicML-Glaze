import React, {
  useRef,
  useMemo,
  useEffect
} from "react";

import * as THREE from "three";

import {
  Canvas,
  useFrame,
  useThree
} from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  useTexture,
  useGLTF,
  Center
} from "@react-three/drei";


// ======================================================
// SURFACE PRESETS
// ======================================================

const SURFACE_PRESETS = {
  "Glossy": {
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    metalness: 0.05
  },

  "Glossy - Semi": {
    roughness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
    metalness: 0.03
  },

  "Satin": {
    roughness: 0.35,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
    metalness: 0.0
  },

  "Matte": {
    roughness: 0.75,
    clearcoat: 0.05,
    clearcoatRoughness: 0.5,
    metalness: 0.0
  }
};


// ======================================================
// TRANSPARENCY PRESETS
// ======================================================

const TRANSPARENCY_PRESETS = {

  "Opaque": {
    transmission: 0.0,
    opacity: 1.0,
    thickness: 0.0,
    ior: 1.1
  },

  "Translucent": {
    transmission: 0.45,
    opacity: 0.92,
    thickness: 0.8,
    ior: 1.35
  },

  "Transparent": {
    transmission: 0.9,
    opacity: 0.85,
    thickness: 1.5,
    ior: 1.5
  }

};


// ======================================================
// AUTO CAMERA FIT
// ======================================================

function CameraFit({ targetRef }) {

  const { camera, controls } = useThree();

  useEffect(() => {

    if (!targetRef.current) return;

    const box = new THREE.Box3().setFromObject(
      targetRef.current
    );

    const size = box.getSize(
      new THREE.Vector3()
    );

    const center = box.getCenter(
      new THREE.Vector3()
    );

    const maxDim = Math.max(
      size.x,
      size.y,
      size.z
    );

    // Camera distance formula
    const fov = camera.fov * (Math.PI / 180);

    let cameraZ =
      Math.abs(maxDim / 2 / Math.tan(fov / 2));

    // Extra padding
    cameraZ *= 1.8;

    camera.position.set(
      center.x,
      center.y,
      cameraZ
    );

    camera.near = 0.1;
    camera.far = 1000;

    camera.updateProjectionMatrix();

    // Orbit target
    if (controls) {

      controls.target.copy(center);
      controls.update();

    }

  }, [camera, controls, targetRef]);

  return null;

}


// ======================================================
// CERAMIC MODEL
// ======================================================

function CeramicMesh({
  surface_type,
  transparency_type,
  rgb_r,
  rgb_g,
  rgb_b
}) {

  const groupRef = useRef();

  const { scene } = useGLTF(
    "/models/ceramic.glb"
  );

  const texture = useTexture(
    "/textures/example.jpg"
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  texture.anisotropy = 16;

  const surface =
    SURFACE_PRESETS[surface_type] ||
    SURFACE_PRESETS["Glossy"];

  const transparency =
    TRANSPARENCY_PRESETS[transparency_type] ||
    TRANSPARENCY_PRESETS["Opaque"];

  // Center model once
  useMemo(() => {

    const box = new THREE.Box3().setFromObject(scene);

    const center = box.getCenter(
      new THREE.Vector3()
    );

    scene.position.sub(center);

  }, [scene]);

  // Rotation
  useFrame(() => {

    if (groupRef.current) {

      groupRef.current.rotation.y += 0.003;

    }

  });

  // Apply material once
  useMemo(() => {

    scene.traverse((child) => {

      if (child.isMesh) {

        child.material =
          new THREE.MeshPhysicalMaterial({

            map: texture,

            color: new THREE.Color(
              rgb_r / 255,
              rgb_g / 255,
              rgb_b / 255
            ),

            roughness: surface.roughness,
            metalness: surface.metalness,

            clearcoat: surface.clearcoat,

            clearcoatRoughness:
              surface.clearcoatRoughness,

            transmission:
              transparency.transmission,

            opacity:
              transparency.opacity,

            transparent: true,

            thickness:
              transparency.thickness,

            ior:
              transparency.ior,

            envMapIntensity: 1.5

          });

        child.castShadow = true;
        child.receiveShadow = true;

      }

    });

  }, [
    scene,
    texture,
    surface,
    transparency,
    rgb_r,
    rgb_g,
    rgb_b
  ]);

  return (

    <group
      ref={groupRef}
      scale={1.5}
    >

      <primitive object={scene} />

    </group>

  );

}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function GlazeBall(props) {

  const modelRef = useRef();

  return (

    <Canvas
      shadows
      camera={{
        position: [0, 0, 5],
        fov: 45
      }}
      style={{
        background: "#000000"
      }}
    >

      {/* Lights */}

      <ambientLight intensity={0.7} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
      />

      <directionalLight
        position={[-5, -3, 2]}
        intensity={1}
      />

      {/* Environment */}

      <Environment preset="studio" />

      {/* Camera auto-fit */}

      <CameraFit targetRef={modelRef} />

      {/* Centered model */}

      <Center>

        <group ref={modelRef}>

          <CeramicMesh {...props} />

        </group>

      </Center>

      {/* Controls */}

      <OrbitControls
        enablePan={false}
      />

    </Canvas>

  );

}