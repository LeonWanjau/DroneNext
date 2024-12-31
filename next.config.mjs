/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  output: "standalone",
  experimental:{
    instrumentationHook: true
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ],
  },
};

export default nextConfig;
