import {Environment, Float, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import React, {Suspense} from "react";
import {TREX} from "../models/TREX";
import {Color} from "three";

const defaultColor = {
  r: 1,
  g: 0.2,
  b: 0.1
}

export function Scene() {
  let lightColor = new Color(defaultColor.r, defaultColor.g, defaultColor.b);

  return (
    <Suspense fallback={null}>
      {/*<Environment background={"only"} files={"textures/bg.hdr"} />*/}

      <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.85, 20.35]} />
      <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 4}/>

      <Float
        speed={0.5}
        rotationIntensity={0.6}
        floatIntensity={0.6}
      >
        {/*<primitive object={mesh} />*/}
        <spotLight
          penumbra={1}
          angle={0.65}
          intensity={0.3}
          color={lightColor}
          position={[1.19, 10.85, -4.45]}
        />
        <TREX />
      </Float>
    </Suspense>
  );
}
