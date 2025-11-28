import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Security headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ],
    },
  ],

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "@nextui-org/system",
      "@nextui-org/button",
      "@nextui-org/modal",
      "@nextui-org/spinner",
      "@nextui-org/progress",
      "@nextui-org/slider",
      "@nextui-org/table",
      "@nextui-org/image",
    ],
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const sc = config.optimization.splitChunks;
      // 确保 splitChunks 为对象（而不是 false）
      config.optimization.splitChunks = sc && sc !== false ? sc : { cacheGroups: {} };

      config.optimization.splitChunks.cacheGroups = {
        ...(config.optimization.splitChunks.cacheGroups || {}),
        heic2any: {
          test: /[\\\/]node_modules[\\\/]heic2any[\\\/]/,
          name: "heic2any",
          priority: 10,
          reuseExistingChunk: true,
        },
        jszip: {
          test: /[\\\/]node_modules[\\\/]jszip[\\\/]/,
          name: "jszip",
          priority: 10,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },

  // Redirects
  redirects: async () => [
    {
      source: "/blog",
      destination: "/",
      permanent: false,
    },
    {
      source: "/tags",
      destination: "/",
      permanent: false,
    },
    {
      source: "/projects",
      destination: "/",
      permanent: false,
    },
    {
      source: "/about",
      destination: "/",
      permanent: false,
    },
  ],
};

export default withNextIntl(nextConfig);
