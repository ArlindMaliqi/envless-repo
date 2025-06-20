const packageJson = require('./package.json');
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
      APP_VERSION: packageJson.version,
  },
};

export default nextConfig;
