import { useLoader } from '@react-three/fiber';
import {GLTFLoader} from "three-stdlib";

export function TREX() {
  const gltf = useLoader(GLTFLoader,  "/3d/TREX.glb");

  return (
    <primitive object={gltf.scene} position={[1, 5.75, 1.75]} rotation={[3.15, -1.5, 0]}/>
  )
}
