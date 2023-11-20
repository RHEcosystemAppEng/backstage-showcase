import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const systemInfoPlugin = createPlugin({
  id: 'system-info',
  routes: {
    root: rootRouteRef,
  },
});

export const SystemInfoPage = systemInfoPlugin.provide(
  createRoutableExtension({
    name: 'SystemInfoPage',
    component: () =>
      import('./components/SystemInfoPage').then(m => m.SystemInfoPage),
    mountPoint: rootRouteRef,
  }),
);
