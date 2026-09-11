export default {
  manifest_version: 3,
  name: 'NanoBrowser',
  version: '0.1.13',
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
    default_title: 'Click to open side panel',
  },
  side_panel: {
    default_path: 'pages/side-panel/index.html',
  },
};
