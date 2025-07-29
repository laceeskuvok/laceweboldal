/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'bjjjpntdcydixfgurtus.supabase.co'],
  },
  async headers() {
    return [
      {
        source: "/demo/:path*", // csak a /demo alatti route-okra érvényes
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // ez engedi iframe-ben a betöltést ugyanazon originről
          },
        ],
      },
    ];
  },
};

export default nextConfig;
