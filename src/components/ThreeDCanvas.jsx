"use client";

import React, { useEffect, useRef } from "react";

/**
 * ThreeDCanvas renders rotating 3D wireframe shapes on an HTML5 canvas.
 * Supported types: "sphere", "cube", "torus", "network", "rings"
 */
export default function ThreeDCanvas({ type = "cube", className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;

    // Resizing function for crisp rendering (retina support)
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 3D Point projection math
    const focalLength = 300;
    const project = (x, y, z) => {
      // Scale coordinates relative to depth (Z)
      const scale = focalLength / (focalLength + z);
      const sx = x * scale + width / 2;
      const sy = y * scale + height / 2;
      return { x: sx, y: sy, scale };
    };

    // Rotation angles
    let angleX = 0.006;
    let angleY = 0.008;
    let angleZ = 0.004;

    let rx = 0;
    let ry = 0;
    let rz = 0;

    // ── GEOMETRY GENERATORS ──

    // 1. Sphere Geometry
    const makeSphere = (radius, latBands, lonBands) => {
      const vertices = [];
      const edges = [];

      for (let lat = 0; lat <= latBands; lat++) {
        const theta = (lat * Math.PI) / latBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon < lonBands; lon++) {
          const phi = (lon * 2 * Math.PI) / lonBands;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);

          const x = radius * sinTheta * cosPhi;
          const y = radius * cosTheta;
          const z = radius * sinTheta * sinPhi;
          vertices.push({ x, y, z });
        }
      }

      // Generate edges
      for (let lat = 0; lat < latBands; lat++) {
        for (let lon = 0; lon < lonBands; lon++) {
          const first = lat * lonBands + lon;
          const second = first + lonBands;
          const nextLon = (lon + 1) % lonBands;
          const right = lat * lonBands + nextLon;
          const rightSecond = right + lonBands;

          // Latitudinal edge
          edges.push([first, right]);
          // Longitudinal edge
          if (lat < latBands - 1) {
            edges.push([first, second]);
          }
        }
      }

      return { vertices, edges };
    };

    // 2. Cube Geometry
    const makeCube = (size) => {
      const s = size / 2;
      const vertices = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Back face
        [4, 5], [5, 6], [6, 7], [7, 4], // Front face
        [0, 4], [1, 5], [2, 6], [3, 7], // Pillars
      ];
      return { vertices, edges };
    };

    // 3. Torus (Donut) Geometry
    const makeTorus = (rOuter, rInner, segmentsT, segmentsP) => {
      const vertices = [];
      const edges = [];

      for (let i = 0; i < segmentsT; i++) {
        const theta = (i * 2 * Math.PI) / segmentsT;
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        for (let j = 0; j < segmentsP; j++) {
          const phi = (j * 2 * Math.PI) / segmentsP;
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);

          // Torus parametric equations
          const x = (rOuter + rInner * cosPhi) * cosTheta;
          const y = rInner * sinPhi;
          const z = (rOuter + rInner * cosPhi) * sinTheta;

          vertices.push({ x, y, z });
        }
      }

      // Connect torus vertices
      for (let i = 0; i < segmentsT; i++) {
        const nextI = (i + 1) % segmentsT;
        for (let j = 0; j < segmentsP; j++) {
          const nextJ = (j + 1) % segmentsP;

          const curr = i * segmentsP + j;
          const right = nextI * segmentsP + j;
          const down = i * segmentsP + nextJ;

          edges.push([curr, right]);
          edges.push([curr, down]);
        }
      }

      return { vertices, edges };
    };

    // 4. Rings Geometry
    const makeRings = () => {
      const vertices = [];
      const edges = [];

      const numPoints = 32;
      // Ring 1 (Inner, tilted pitch)
      for (let i = 0; i < numPoints; i++) {
        const theta = (i * 2 * Math.PI) / numPoints;
        vertices.push({
          x: Math.cos(theta) * 70,
          y: Math.sin(theta) * 70,
          z: 0,
          ring: 1,
        });
        edges.push([i, (i + 1) % numPoints]);
      }

      // Ring 2 (Outer, opposite rotation, tilted yaw)
      const offset = numPoints;
      for (let i = 0; i < numPoints; i++) {
        const theta = (i * 2 * Math.PI) / numPoints;
        vertices.push({
          x: Math.cos(theta) * 110,
          y: 0,
          z: Math.sin(theta) * 110,
          ring: 2,
        });
        edges.push([offset + i, offset + ((i + 1) % numPoints)]);
      }

      return { vertices, edges };
    };

    // 5. Constellation Network (Drifting points connected by proximity)
    const makeNetwork = (count, range) => {
      const vertices = [];
      for (let i = 0; i < count; i++) {
        vertices.push({
          x: (Math.random() - 0.5) * range,
          y: (Math.random() - 0.5) * range,
          z: (Math.random() - 0.5) * range,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          vz: (Math.random() - 0.5) * 0.4,
        });
      }
      return { vertices, edges: [] };
    };

    // Instantiate geometries
    let model = { vertices: [], edges: [] };
    const radius = Math.min(width, height, 220) / 2;

    if (type === "sphere") model = makeSphere(radius * 0.8, 10, 16);
    else if (type === "cube") model = makeCube(radius * 1.1);
    else if (type === "torus") model = makeTorus(radius * 0.7, radius * 0.28, 14, 10);
    else if (type === "rings") model = makeRings();
    else if (type === "network") model = makeNetwork(28, radius * 1.4);

    // 3D rotation math helper
    const rotatePoint = (point, rxVal, ryVal, rzVal) => {
      let { x, y, z } = point;

      // Rotate around X axis
      const cosX = Math.cos(rxVal);
      const sinX = Math.sin(rxVal);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate around Y axis
      const cosY = Math.cos(ryVal);
      const sinY = Math.sin(ryVal);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // Rotate around Z axis
      const cosZ = Math.cos(rzVal);
      const sinZ = Math.sin(rzVal);
      const x3 = x2 * cosZ - y1 * sinZ;
      const y3 = x2 * sinZ + y1 * cosZ;

      return { ...point, x: x3, y: y3, z: z2 };
    };

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Fetch dynamic colors from styles so it updates instantly with theme
      const styleObj = getComputedStyle(document.body);
      const primaryColor = styleObj.getPropertyValue("--accent-color").trim() || "#38bdf8";
      const borderColor = styleObj.getPropertyValue("--border-color").trim() || "rgba(255, 255, 255, 0.1)";

      // Update rotation
      rx += angleX;
      ry += angleY;
      rz += angleZ;

      if (type === "network") {
        // Drifting animation for network nodes
        model.vertices = model.vertices.map((v) => {
          let nx = v.x + v.vx;
          let ny = v.y + v.vy;
          let nz = v.z + v.vz;

          const limit = radius * 0.9;
          if (Math.abs(nx) > limit) v.vx *= -1;
          if (Math.abs(ny) > limit) v.vy *= -1;
          if (Math.abs(nz) > limit) v.vz *= -1;

          return { ...v, x: nx, y: ny, z: nz };
        });
      }

      // Rotate & Project vertices
      const projected = model.vertices.map((v) => {
        let rotated;
        if (type === "rings") {
          // Concentrate rings: Inner rotates normal, Outer rotates reverse
          const direction = v.ring === 1 ? 1 : -1.2;
          rotated = rotatePoint(v, rx * direction, ry * direction, rz * direction);
        } else {
          rotated = rotatePoint(v, rx, ry, rz);
        }
        return {
          proj: project(rotated.x, rotated.y, rotated.z),
          z: rotated.z,
        };
      });

      // ── DRAWING ──

      ctx.lineWidth = 1;

      if (type === "network") {
        // Draw constellation lines based on proximity
        const maxDist = radius * 0.58;
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j];
            const dx = model.vertices[i].x - model.vertices[j].x;
            const dy = model.vertices[i].y - model.vertices[j].y;
            const dz = model.vertices[i].z - model.vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.28;
              ctx.strokeStyle = primaryColor;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(p1.proj.x, p1.proj.y);
              ctx.lineTo(p2.proj.x, p2.proj.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1.0;

        // Draw nodes
        projected.forEach((p) => {
          const opacity = Math.max(0.2, (radius - p.z) / (radius * 2));
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(p.proj.x, p.proj.y, 2.5 * p.proj.scale, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
      } else {
        // Draw wireframe edges (Cube, Sphere, Torus, Rings)
        model.edges.forEach(([idx1, idx2]) => {
          const p1 = projected[idx1];
          const p2 = projected[idx2];
          if (!p1 || !p2) return;

          // Depth-aware opacity for wireframe lines
          const avgZ = (p1.z + p2.z) / 2;
          const opacity = Math.max(0.12, Math.min(0.6, (radius - avgZ) / (radius * 1.8)));

          ctx.strokeStyle = primaryColor;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(p1.proj.x, p1.proj.y);
          ctx.lineTo(p2.proj.x, p2.proj.y);
          ctx.stroke();
        });
        ctx.globalAlpha = 1.0;

        // Draw node vertices
        projected.forEach((p) => {
          const opacity = Math.max(0.15, (radius - p.z) / (radius * 2));
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(p.proj.x, p.proj.y, 2 * p.proj.scale, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className={`three-d-canvas ${className}`}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
