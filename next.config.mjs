import fs from "fs";
import path from "path";

// Copy graduation picture from brain to public folder
const srcPath = "C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\6efe14f6-2fd8-4c1f-8bc1-037b139c0a15\\media__1781271191434.jpg";
const destPath = "./public/graduation.jpg";

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log("Successfully copied graduation image to public/graduation.jpg");
  } else {
    console.warn("Graduation source image not found at:", srcPath);
  }
} catch (err) {
  console.error("Error copying graduation image:", err);
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

