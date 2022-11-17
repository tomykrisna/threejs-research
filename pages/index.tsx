import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Scene} from "./scene/Scene";

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

export default function Home() {
    return (
        <Canvas>
            <ambientLight />
            <Scene/>
            {/*<ambientLight intensity={0.5} />*/}
            {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
            {/*<pointLight position={[-10, -10, -10]} />*/}
            {/*<Box position={[-1.2, 0, 0]} />*/}
            {/*<Box position={[1.3, 0, 2]} />*/}
            {/*<OrbitControls />*/}
        </Canvas>
    )
}
