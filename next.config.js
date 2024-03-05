/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dryy6uo6k/image/upload/v1709668872/its-probably-spicy/**",
      },
    ],
  },
};

module.exports = config;
