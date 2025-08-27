import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e4433c2c5f99498fbf5f8d008b67475c',
  appName: 'surf-espana-app',
  webDir: 'dist',                // 👈 usa el build local
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'       // 👈 sin url remota
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2563eb',
      showSpinner: false
    }
  }
};

export default config;
