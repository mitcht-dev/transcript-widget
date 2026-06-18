import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'), 
  },
  resolve: {
    alias: {
      'purecloud-platform-client-v2': path.resolve(__dirname, 'node_modules/purecloud-platform-client-v2/src/purecloud-platform-client-v2')
    },
    // Webpack 5 needs this to ignore Node.js core modules
    fallback: {
      path: false,
      crypto: false,
      util: false,
      os: false,
      fs: false,
      zlib: false,
      http: false,
      https: false,
      buffer: false
    }
  }
};