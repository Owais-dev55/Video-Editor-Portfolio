"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, Environment, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"
import { motion } from "framer-motion"

function RotatingModel() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    if (isHovered) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.02
    } else {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main rotating cube representing camera/video concept */}
      <mesh onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.8}
          roughness={0.2}
          emissive="#6d28d9"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting spheres */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <mesh position={[4, 0, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshPhysicalMaterial
              color={i === 0 ? "#06b6d4" : i === 1 ? "#f59e0b" : "#10b981"}
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Lights */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#8b5cf6" />
    </group>
  )
}

function ModelCanvas() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]} performance={{ current: 1 }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <RotatingModel />
      <Environment preset="studio" />
      <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} autoRotate={true} autoRotateSpeed={4} />
    </Canvas>
  )
}

export function ThreeDModelSection() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    setCanRender(true)
  }, [])

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">Interactive Showcase</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore my work through an interactive 3D experience. Drag to rotate, scroll to zoom.
          </p>
        </motion.div>

        <motion.div
          className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden border border-border bg-gradient-to-br from-primary/5 to-accent/5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {canRender ? (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
                  </div>
                </div>
              }
            >
              <ModelCanvas />
            </Suspense>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">3D content loading...</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Interactive", description: "Drag and rotate to explore" },
            { label: "Performance", description: "Optimized for all devices" },
            { label: "Immersive", description: "Cutting-edge 3D visuals" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <h3 className="font-semibold mb-2">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
