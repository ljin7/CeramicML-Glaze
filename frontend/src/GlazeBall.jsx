import React, { useRef } from "react";
import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  useTexture
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

  "Satin - Matte": {
    roughness: 0.5,
    clearcoat: 0.15,
    clearcoatRoughness: 0.35,
    metalness: 0.0
  },

  "Matte": {
    roughness: 0.75,
    clearcoat: 0.05,
    clearcoatRoughness: 0.5,
    metalness: 0.0
  },

  "Matte - Semi": {
    roughness: 0.6,
    clearcoat: 0.08,
    clearcoatRoughness: 0.4,
    metalness: 0.0
  },

  "Matte - Smooth": {
    roughness: 0.55,
    clearcoat: 0.1,
    clearcoatRoughness: 0.25,
    metalness: 0.0
  },

  "Matte - Dry": {
    roughness: 0.92,
    clearcoat: 0.0,
    clearcoatRoughness: 1.0,
    metalness: 0.0
  },

  "Matte - Stony": {
    roughness: 1.0,
    clearcoat: 0.0,
    clearcoatRoughness: 1.0,
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

  "Semi-Opaque": {
    transmission: 0.08,
    opacity: 0.98,
    thickness: 0.3,
    ior: 1.2
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
// CERAMIC BALL MESH
// ======================================================

function CeramicMesh({
  surface_type,
  transparency_type,
  rgb_r,
  rgb_g,
  rgb_b
}) {

  const meshRef = useRef();

  // Texture
  const texture = useTexture("/textures/example.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  texture.anisotropy = 16;

  // Surface settings
  const surface =
    SURFACE_PRESETS[surface_type] ||
    SURFACE_PRESETS["Glossy"];

  // Transparency settings
  const transparency =
    TRANSPARENCY_PRESETS[transparency_type] ||
    TRANSPARENCY_PRESETS["Opaque"];

  // Slow rotation
  useFrame(() => {

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }

  });

  return (

    <mesh
      ref={meshRef}
      rotation={[0.2, 0.4, 0]}
    >

      <sphereGeometry args={[1, 128, 128]} />

      <meshPhysicalMaterial

        map={texture}

        color={
          new THREE.Color(
            rgb_r / 255,
            rgb_g / 255,
            rgb_b / 255
          )
        }

        roughness={surface.roughness}
        metalness={surface.metalness}

        clearcoat={surface.clearcoat}
        clearcoatRoughness={
          surface.clearcoatRoughness
        }

        transmission={transparency.transmission}

        opacity={transparency.opacity}

        transparent={true}

        thickness={transparency.thickness}

        ior={transparency.ior}

        envMapIntensity={1.5}

      />

    </mesh>

  );

}


// ======================================================
// MAIN COMPONENT
// ======================================================

export default function GlazeBall(props) {

  return (

    <Canvas
      camera={{
        position: [0, 0, 4],
        fov: 45
      }}
    >

      {/* Lighting */}

      <ambientLight intensity={0.6} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <directionalLight
        position={[-5, -3, 2]}
        intensity={1}
      />

      {/* HDR environment */}

      <Environment preset="studio" />

      {/* Ceramic sphere */}

      <CeramicMesh {...props} />

      {/* Mouse orbit */}

      <OrbitControls
        enablePan={false}
      />

    </Canvas>

  );

}