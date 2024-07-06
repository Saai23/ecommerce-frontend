/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: "/about",
      destination: "http://localhost:8000",
    }, ];
  },
};


export default nextConfig;
