// webpack.config.mjs (or webpack.config.js if "type": "module")

import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    // Now we can safely use __dirname just like before
    path: path.resolve(__dirname, 'dist'), 
  },
};