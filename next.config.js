/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        apiKey: "api-key",
    },
};

module.exports = nextConfig;
