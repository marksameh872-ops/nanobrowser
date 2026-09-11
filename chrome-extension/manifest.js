export default {
  manifest_version: 3,
  name: 'NanoBrowser',
  version: '0.1.13',
  default_locale: 'en',
  description: 'AI-powered web automation Chrome extension',
  permissions: [
    'storage',
    'sidePanel',
    'activeTab',
    'scripting',
    'audioCapture'
  ],
  host_permissions: ['<all_urls>'],
  action: {
    default_title: 'NanoBrowser',
  },
  side_panel: {
    default_path: 'src/pages/side-panel/index.html',
  },
  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
};
