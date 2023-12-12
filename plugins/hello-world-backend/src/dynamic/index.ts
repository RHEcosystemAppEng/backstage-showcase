import { BackendDynamicPluginInstaller } from '@backstage/backend-plugin-manager';
import { Router } from 'express';
import { createRouter } from '../service/router';

export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: 'legacy',

  // Contributions of the plugin to the application.
  // Here optional fields allow embedding the code which is usually described in the plugin readme for manual addition.
  // If a contribution is not used, the field should be omitted.

  router: {
    pluginID: 'hello-world',
    createPlugin(env): Promise<Router> {
      return createRouter({
        logger: env.logger,
      });
    },
  },
};
