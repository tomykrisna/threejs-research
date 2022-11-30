import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {Suspense, useRef, useState} from "react";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Float, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Color} from "three";
import {GLTFLoader} from "three-stdlib";

function Box(props: any) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    let el: HTMLCanvasElement;
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // @ts-ignore
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => {
                console.log("aaaa")
                hover(true)
            }}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 2, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'red'}/>
        </mesh>
    )
}

const defaultColor = {
    r: 1,
    g: 0.2,
    b: 0.1
}

function Scene() {
    let lightColor = new Color(defaultColor.r, defaultColor.g, defaultColor.b);

    return (
        <Suspense fallback={null}>
            {/*<Environment background={"only"} files={"textures/bg.hdr"} />*/}

            <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.85, 20.35]}/>
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
                <TREX/>
            </Float>
        </Suspense>
    );
}

function TREX() {
    const gltf = useLoader(GLTFLoader, "/3d/TREX.glb");
    return (
        <primitive object={gltf.scene} position={[1, 5.75, 1.75]} rotation={[3.15, -1.5, 0]}/>
    )
}

export default function Home() {
    return (
        <Canvas>
            <Scene/>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
            <pointLight position={[-10, -10, -10]}/>
            {/*<Box position={[1.3, 0, 2]} />*/}
            <Box position={[1.3, 0, 2]}/>
            <OrbitControls/>
        </Canvas>
    )
}
