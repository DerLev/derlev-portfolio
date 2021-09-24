/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    rootUrl: 'https://derlev.mc-mineserver.de/',
  },
}
