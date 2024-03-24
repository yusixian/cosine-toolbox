/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config) => {
    // svg loader
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules = [
      ...config.module.rules.filter((rule) => rule !== fileLoaderRule),
      { ...fileLoaderRule, exclude: /\.svg$/i },
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: {
          ...fileLoaderRule.resourceQuery,
          not: [
            ...fileLoaderRule.resourceQuery.not,
            /component/, // *.svg?component
          ],
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: '@svgr/webpack',
        resourceQuery: /component/, // *.svg?component
      },
    ];
    return config;
  },
};

module.exports = nextConfig;
