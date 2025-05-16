"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { useFrame, useThree, Canvas } from "@react-three/fiber";

// Shader for particles with depth and scroll effects
const fragmentShader = `
  precision highp float;
  
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec4 iMouse; // x, y for position; z for click status (1 if clicked, 0 otherwise)
  uniform float iScrollProgress; // Overall scroll progress (0-1)
  // uniform float iScrollSpeed; // This will be driven by the new scroll logic if needed by shader
  uniform float iScrollOffset;   // Accumulated scroll offset for particle movement
  uniform float grainStrength;   // Grain effect strength
  uniform float grainSize;       // Grain size control
  uniform vec3 iColor;          // Theme-based color for particles

  // Definitions from Codepen
  #define S(a, b, t) smoothstep(a, b, t)
  #define sat(x) clamp(x, 0.0, 1.0)
  // #define SPHERECOL vec3(1.0, 1.0, 1.0) // We will use iColor instead
  #define NUM_SPHERES 50.0
  #define NUM_DUST 200.0
  #define LIGHT_DIR vec3(0.577, -0.577, -0.577) // Lighting direction
  #define BASE_SPHERE_SIZE 1.0
  #define DUST_SIZE 0.05
  
  // Improved noise functions for grain effect (from Codepen)
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
  }
  
  float hash(float n) {
      return fract(sin(n) * 43758.5453);
  }
  
  // Polynomial smooth max from IQ (from Codepen)
  // float smax(float a, float b, float k) {
  //     float h = sat(0.5 + 0.5*(b-a)/k);
  //     return mix(a, b, h) + k*h*(1.0-h);
  // }
  
  // Simple sphere function (from Codepen)
  float Sphere(vec2 uv, float b) {
      return S(b, -b, length(uv) - 0.5);
  }
  
  // Quaternion rotation functions (from Codepen)
  vec4 qmulq(vec4 q1, vec4 q2) {
      return vec4(q1.xyz*q2.w+q2.xyz*q1.w+cross(q1.xyz,q2.xyz), (q1.w*q2.w)-dot(q1.xyz,q2.xyz));
  }
  
  vec4 aa2q(vec3 axis, float angle) {
      return vec4(normalize(axis)*sin(angle*0.5), cos(angle*0.5));
  }
  
  vec4 qinv(vec4 q) {
      return vec4(-q.xyz, q.w)/dot(q, q);
  }
  
  vec3 qmulv(vec4 q, vec3 p) {
      return qmulq(q, qmulq(vec4(p, 0.0), qinv(q))).xyz;
  }
  
  // Ray-sphere intersection (from Codepen)
  vec2 RaySphere(vec3 rd, vec3 p, float radius) {
      float l = dot(rd, p);
      float det = l*l - dot(p, p) + radius*radius;
      if (det < 0.0) return vec2(-1.0);
      float sd = sqrt(det);
      return vec2(l - sd, l + sd);
  }
  
  struct sphereInfo {
      vec3 p1, p2, n1, n2;
      vec2 uv1, uv2;
  };
  
  sphereInfo GetSphereUvs(vec3 rd, vec2 i, vec2 rot, vec3 s, float radius) {
      sphereInfo res;
      rot *= 6.2831; // PI * 2
      vec4 q = aa2q(vec3(cos(rot.x), sin(rot.x), 0.0), rot.y);
      vec3 o = qmulv(q, -s) + s;
      vec3 d = qmulv(q, rd);
      
      res.p1 = rd * i.x;
      vec3 p_calc = o + d*i.x - s; // Renamed p to p_calc to avoid conflict with struct member
      res.uv1 = vec2(atan(p_calc.x, p_calc.z), p_calc.y);
      res.n1 = res.p1 - s;
      
      res.p2 = rd * i.y;
      p_calc = o + d*i.y - s; // Renamed p to p_calc
      res.uv2 = vec2(atan(p_calc.x, p_calc.z), p_calc.y);
      res.n2 = s - res.p2;
          
      return res;
  }
  
  vec4 SphereBall(vec3 rd, vec3 p, vec2 rot, float radius, float blur, vec3 particleBaseCol) {
      vec2 d = RaySphere(rd, p, radius);
      
      vec4 col = vec4(0.0);
      if(d.x > 0.0) { // Check if ray intersects the sphere
          sphereInfo info = GetSphereUvs(rd, d, rot, p, radius);
          
          float sd = length(cross(p, rd));
          float edge = S(radius, mix(radius, 0.1, blur), sd);
          
          float backMask = Sphere(info.uv2 / radius, blur) * edge; 
          float frontMask = Sphere(info.uv1 / radius, blur) * edge; 
          float frontLight = sat(dot(LIGHT_DIR, normalize(info.n1)) * 0.8 + 0.2);
          float backLight = sat(dot(LIGHT_DIR, normalize(info.n2)) * 0.8 + 0.2) * 0.9;
          
          // Use particleBaseCol instead of the global iColor here
          col = mix(vec4(backLight * particleBaseCol, backMask), 
                  vec4(frontLight * particleBaseCol, frontMask), 
                  frontMask);
      }
      return col;
  }
  
  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    vec2 m = iMouse.xy / iResolution.xy; // Normalized mouse coords (0-1)
    // Adjust m.y for focus plane based on Codepen (inverted when clicked, fixed otherwise)
    // iMouse.z is 1 if clicked, 0 otherwise.
    m.y = iMouse.z > 0.5 ? 1.0 - m.y : 0.4; 


    float t = iTime * 0.3; // Adjusted time scale from Codepen
    
    // Apply camera movement based on scroll progress (Codepen)
    float cameraY = iScrollProgress * 1.5; 
    uv.y += cameraY;
    
    // Also add some subtle rotation/movement based on scroll (Codepen)
    float scrollAngle = iScrollProgress * 0.05; 
    uv = mat2(cos(scrollAngle), -sin(scrollAngle), sin(scrollAngle), cos(scrollAngle)) * uv;

    vec3 rd = normalize(vec3(uv, 1.0)); // Ray direction
    
    vec2 sphereRot = t * vec2(0.12, 0.18); // Base rotation for spheres
    vec4 finalColor = vec4(0.0); // Initialize final color
    
    // Main spheres (Codepen loop)
    for(float i = 0.0; i < 1.0; i += (1.0 / NUM_SPHERES)) {
        float hashX = fract(sin(i * 536.3) * 7464.4);
        float hashY = fract(sin(i * 234.5) * 8573.2);
        // float hashZ_sphere = fract(sin(i * 657.8) * 9456.3); // hashZ was unused for main spheres
        
        // Generate unique color hint for this sphere
        float ch_r = fract(sin(i * 100.1) * 10000.1);
        float ch_g = fract(sin(i * 200.2) * 20000.2);
        float ch_b = fract(sin(i * 300.3) * 30000.3);
        vec3 colorVariationFactor = (vec3(ch_r, ch_g, ch_b) - 0.5) * 0.15; // Subtle variation: +/- 7.5%
        vec3 particleUniqueColor = sat(iColor * (1.0 + colorVariationFactor));

        float x = (hashX * 2.0 - 1.0) * 15.0;
        
        // Y position controlled by scrollOffset (Codepen)
        float baseY = (hashY * 2.0 - 1.0) * 15.0;
        // Use iScrollOffset here. Note: Codepen shader had iScrollOffset * 0.4.
        // The JS part should provide iScrollOffset already scaled or shader adapts.
        // Assuming iScrollOffset from JS is appropriately scaled for this.
        float y = mod(baseY - iScrollOffset, 30.0) - 15.0; 
        
        float z = mix(14.0, 2.0, i); // Z depth with variation
        
        float depthFactor = 1.0 - (z - 2.0) / 12.0; // 1.0 at z=2, 0.0 at z=14
        float sizeBoost = mix(1.0, 1.8, depthFactor); 
        float sphereRadius = BASE_SPHERE_SIZE * sizeBoost;
        
        // Calculate blur based on focus plane (from mouse via m.y)
        float blur = mix(0.03, 0.35, S(0.0, 0.4, abs(m.y - i)));
        
        vec2 currentSphereRot = sphereRot + (fract(sin(i * vec2(536.3, 23.4)) * vec2(764.4, 987.3)) - 0.5);
        currentSphereRot.y += iScrollProgress * hashX * 0.5; // Scroll-based rotation
        
        // Pass particleUniqueColor to SphereBall
        vec4 sphereCol = SphereBall(rd, vec3(x, y, z), currentSphereRot, sphereRadius, blur, particleUniqueColor);
        sphereCol.a *= 0.5; // Lower opacity by half for main spheres
        
        finalColor = mix(finalColor, sphereCol, sphereCol.a * (1.0 - finalColor.a)); // Alpha blending
    }
    
    // Add small dust particles (Codepen loop)
    for(float i = 0.0; i < 1.0; i += (1.0 / NUM_DUST)) {
        float hashX = fract(sin(i * 1234.5) * 5432.1);
        float hashY = fract(sin(i * 6543.2) * 3210.9);
        float hashZ_dust = fract(sin(i * 9876.5) * 2109.8);
        float hashW = fract(sin(i * 5432.1) * 9876.5);
        
        // Generate unique color hint for this dust particle
        float dch_r = fract(sin(i * 400.4) * 40000.4);
        float dch_g = fract(sin(i * 500.5) * 50000.5);
        float dch_b = fract(sin(i * 600.6) * 60000.6);
        vec3 dustColorVariationFactor = (vec3(dch_r, dch_g, dch_b) - 0.5) * 0.1; // More subtle variation for dust: +/- 5%
        vec3 dustUniqueColor = sat(iColor * (1.0 + dustColorVariationFactor));
        
        float x = (hashX * 2.0 - 1.0) * 25.0;
        
        float fallSpeed = hashZ_dust * 0.5 + 0.2;
        float baseY = (hashY * 2.0 - 1.0) * 25.0;
        float timeY = mod(baseY - t * fallSpeed, 50.0) - 25.0;
        // Use iScrollOffset here as well. Codepen shader had iScrollOffset * (0.2 + hashW * 0.3)
        // Assuming iScrollOffset is scaled appropriately from JS.
        float y = mod(timeY - iScrollOffset * (0.5 + hashW * 0.5) , 50.0) - 25.0; // Adjusted multiplier slightly
        
        x += sin(t * (0.2 + hashX * 0.3) + hashY * 10.0) * 0.3; // Subtle horizontal drift
        
        float z = mix(18.0, 1.0, hashZ_dust);
        
        float dustRadius = DUST_SIZE * (0.5 + hashX * 0.5);
        
        float blur = mix(0.05, 0.4, S(0.0, 0.3, abs(m.y - hashZ_dust)));
        
        vec2 dustRot = t * vec2(0.05, 0.08) + hashX;
        
        // Pass dustUniqueColor to SphereBall
        vec4 dustCol = SphereBall(rd, vec3(x, y, z), dustRot, dustRadius, blur, dustUniqueColor);
        dustCol.a *= 0.2; // Lower opacity by half for dust (was 0.4, now 0.2)
        
        finalColor = mix(finalColor, dustCol, dustCol.a * (1.0 - finalColor.a)); // Alpha blending
    }
    
    // Add subtle color tint based on scroll position (Codepen)
    // Use iColor as part of the tint for theme consistency
    float tintAmount = iScrollProgress * 0.3;
    vec3 baseTintColor = vec3(1.0, 1.0, 1.0); // Original tint base
    vec3 scrollTintColor = mix(baseTintColor, iColor * 0.3 + baseTintColor * 0.7, tintAmount); // Mix with iColor
    finalColor.rgb *= scrollTintColor;
    
    // Apply grain effect (Codepen)
    vec2 uvRandom = uv; 
    // Multiplying uvRandom.y by hash can cause issues if original uv.y is 0.
    // Add a small epsilon or use a different approach if issues arise.
    uvRandom.y *= hash(vec2(uvRandom.y + t*0.001, t * 0.01)); // Added t to inner hash for more variation
    float noise = hash(uvRandom * grainSize + t * 0.1) * grainStrength;
    finalColor.rgb += noise - grainStrength * 0.5; // Center the noise around zero
    
    gl_FragColor = finalColor;
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

function getThemeColor(theme: string | undefined): THREE.Vector3 {
  if (theme === "dark") return new THREE.Vector3(1.0, 1.0, 1.0); // White
  if (theme === "neon") return new THREE.Vector3(0.0, 1.0, 0.6); // Neon green: #00FF99
  // if (theme === "ocean") return new THREE.Vector3(0.0, 0.67, 1.0); // Ocean blue: #00AAFF
  // if (theme === "forest") return new THREE.Vector3(0.3, 0.82, 0.31); // Forest green: #4DD14F
  // Default to black for light theme, or a very dark gray for better visibility if needed
  return new THREE.Vector3(0.1, 0.1, 0.1); // Dark Gray for light theme (instead of pure black)
}

// ShaderPlane component that renders our particle effect
function ShaderPlane() {
  const mesh = useRef<THREE.Mesh>(null);
  const { size } = useThree(); // Removed viewport as it wasn't used directly here
  const { theme } = useTheme();

  // Scroll-related data using refs to avoid re-renders and to hold values for event handlers
  const scrollDataRef = useRef({
    lastY: typeof window !== "undefined" ? window.scrollY : 0,
    currentOffset: 0, // This is iScrollOffset
    // For smoothing scroll speed/deltas
    scrollBuffer: Array(10).fill(0),
    scrollBufferIndex: 0,
  });

  const uniforms = useRef({
    iResolution: { value: new THREE.Vector2(size.width, size.height) },
    iTime: { value: 0 },
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) }, // x, y, click_status (z), unused (w)
    iScrollProgress: { value: 0 },
    iScrollOffset: { value: 0 }, // New: for particle Y movement based on accumulated scroll
    // iScrollSpeed: { value: 0 }, // Will be set directly in scroll handler, if shader needs it explicitly
    // The Codepen shader doesn't explicitly use iScrollSpeed, but its JS uses it to calculate offset.
    // For now, we won't add it as a uniform unless the shader strictly requires it.
    // The effect of speed is implicit in how iScrollOffset changes.
    grainStrength: { value: 0.15 }, // New: from Codepen
    grainSize: { value: 3.5 }, // New: from Codepen
    iColor: { value: getThemeColor(theme) },
  });

  // Update uniforms on theme change
  useEffect(() => {
    if (uniforms.current) {
      uniforms.current.iColor.value = getThemeColor(theme);
    }
  }, [theme]);

  // Track mouse position and click state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (uniforms.current.iMouse) {
        uniforms.current.iMouse.value.x = e.clientX;
        uniforms.current.iMouse.value.y = e.clientY; // Shader expects origin top-left for mouse, like gl_FragCoord
        // If shader normalizes it (0-1 range), this is fine.
        // Codepen shader normalizes iMouse.xy/iResolution.xy, so raw clientX/Y is fine.
      }
    };

    const handleMouseDown = () => {
      if (uniforms.current.iMouse) {
        uniforms.current.iMouse.value.z = 1.0; // Set click status to active (1.0)
      }
    };

    const handleMouseUp = () => {
      if (uniforms.current.iMouse) {
        uniforms.current.iMouse.value.z = 0.0; // Reset click status to inactive (0.0)
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  // Handle scroll events to update shader uniforms
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // Initialize prevScrollY for the closure
    // We use scrollDataRef for all scroll state now
    // let prevScrollY = window.scrollY; // This line can be removed

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sd = scrollDataRef.current;
      const deltaY = currentScrollY - sd.lastY;

      // Update iScrollProgress (overall page scroll percentage 0-1)
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (uniforms.current.iScrollProgress && scrollableHeight > 0) {
        const progress = Math.min(currentScrollY / scrollableHeight, 1.0);
        uniforms.current.iScrollProgress.value = progress;
      } else if (uniforms.current.iScrollProgress) {
        uniforms.current.iScrollProgress.value = 0; // Handle case with no scrollable height
      }

      // Update iScrollOffset and potentially iScrollSpeed (Codepen logic)
      // This part is for the iScrollOffset that affects particle Y positions
      if (Math.abs(deltaY) > 0.5) {
        sd.scrollBuffer[sd.scrollBufferIndex] = deltaY;
        sd.scrollBufferIndex =
          (sd.scrollBufferIndex + 1) % sd.scrollBuffer.length;

        let avgDelta = 0;
        for (let i = 0; i < sd.scrollBuffer.length; i++) {
          avgDelta += sd.scrollBuffer[i];
        }
        avgDelta /= sd.scrollBuffer.length;

        // This factor (0.03) is from Codepen, determines how much particles move with scroll
        // It results in a slowly accumulating offset. The shader uses this offset directly.
        // Halving speed: 0.03 -> 0.015
        sd.currentOffset += avgDelta * 0.015;

        // If a specific iScrollSpeed uniform was needed by shader:
        // if (uniforms.current.iScrollSpeed) uniforms.current.iScrollSpeed.value = avgDelta * 0.01;
      } else {
        // If a specific iScrollSpeed uniform was needed and damped:
        // if (uniforms.current.iScrollSpeed) uniforms.current.iScrollSpeed.value *= 0.9;
      }

      if (uniforms.current.iScrollOffset) {
        uniforms.current.iScrollOffset.value = sd.currentOffset;
      }

      sd.lastY = currentScrollY;
      // prevScrollY = currentScrollY; // This line can be removed
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (mesh.current && uniforms.current.iTime) {
      uniforms.current.iTime.value += delta;
      // Other per-frame updates could go here if needed
      // For example, if scrollSpeed needed continuous damping when not scrolling:
      // if (uniforms.current.iScrollSpeed && Math.abs(window.scrollY - scrollDataRef.current.lastY) < 0.5) {
      //   uniforms.current.iScrollSpeed.value *= 0.9;
      // }
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms.current}
        transparent={true}
      />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true, // Ensure canvas is transparent
      }}
      camera={{ fov: 45, position: [0, 0, 5] }} // Default camera, Ortho cam used by shader plane
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // Ensure it's behind content
        pointerEvents: "none", // Default to no pointer events for canvas itself
      }}
    >
      <ShaderPlane />
    </Canvas>
  );
}
