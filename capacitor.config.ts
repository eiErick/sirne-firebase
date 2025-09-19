// capacitor.maraskin.config.ts

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.maraskin.app',
  appName: 'Maraskin',
  webDir: 'dist/maraskin/browser',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
  },
};

export default config;

// capacitor.sirne.config.ts

// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.sirne.app',
//   appName: 'Sirne',
//   webDir: 'dist/sirne/browser',
//   plugins: {
//     StatusBar: {
//       overlaysWebView: false,
//     },
//   },
// };

// export default config;
