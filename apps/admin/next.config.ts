import type { NextConfig } from 'next'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              path.dirname(require.resolve('tinymce/package.json')),
            ),
            to: path.join(__dirname, 'public/tinymce'),
          },
        ],
      })
    )
    return config
  },
}

export default nextConfig