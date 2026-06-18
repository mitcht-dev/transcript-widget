import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
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
    }
  }
};