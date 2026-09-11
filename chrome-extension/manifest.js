import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';

const { version } = packageJson;

// Convert from semver to x.x.x.x
const [major, minor, patch, label] = version.replace('-', '.').split('.');

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: 'NanoBrowser',
  version: `${major}.${minor}.${patch}.${label || '0'}`,
  version_name: version,
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
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['assets/*', 'pages/*'],
      matches: ['<all_urls>'],
    },
  ],
}));

export default manifest;
