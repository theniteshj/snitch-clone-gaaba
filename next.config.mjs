/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // static deployment ke liye — direct file URLs
  },
};

export default nextConfig;
