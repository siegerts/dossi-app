/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      // {
      //   source: "/:slug",
      //   headers: [
      //     {
      //       key: "Referrer-Policy",
      //       value: "no-referrer-when-downgrade",
      //     },
      //     {
      //       key: "X-DNS-Prefetch-Control",
      //       value: "on",
      //     },
      //   ],
      // },
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://github.com" },
          {
            key: "Access-Control-Allow-Methods",
            value: "OPTIONS,POST,GET,HEAD",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
}

export default nextConfig
