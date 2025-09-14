import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.maraskin.app',
  appName: 'Maraskin',
  webDir: 'dist/maraskin/browser',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    }
  },
};

export default config;
