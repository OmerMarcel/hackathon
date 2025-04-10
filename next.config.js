/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Désactiver la compression des attributs HTML
  compress: false,
  // Configuration pour éviter les problèmes d'hydratation avec les extensions de navigateur
  experimental: {
    // Désactiver la minification des attributs HTML
    minify: false,
  },
}

module.exports = nextConfig 