import { defineManifest } from 'wxt';

export default defineManifest({
  name: 'NanoBrowser',
  description: 'AI-powered web automation Chrome extension',
  permissions: [
    'storage',
    'sidePanel',
    'activeTab',
    'scripting',
    'audioCapture',
    'tabCapture'
  ],
  host_permissions: ['<all_urls>'],
  action: {
    default_title: 'Click to open side panel',
  },
  side_panel: {
    default_path: 'pages/side-panel/index.html',
  },
  web_accessible_resources: [
    {
      resources: ['assets/*', 'pages/*'],
      matches: ['<all_urls>'],
    },
  ],
});
