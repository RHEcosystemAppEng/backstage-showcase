import { BackendDynamicPluginInstaller } from '@backstage/backend-plugin-manager';
import {createRouter} from "../service/router";

export const dynamicPluginInstaller: BackendDynamicPluginInstaller = {
  kind: 'legacy',

  // Contributions of the plugin to the application.
  // Here optional fields allow embedding the code which is usually described in the plugin readme for manual addition.
  // If a contribution is not used, the field should be omitted.

  router: {
    pluginID: 'dynamic',
    createPlugin: createRouter
  },

  events(eventsBackend, env) {
    // Do something with the events backend (add subscribers or publishers)
    // and return a list of HttpPostIngressOptions that will be
    // registered with the http event endpoint.
    return [];
  },

  catalog(builder, env) {
    // Add catalog contributions, such as
    // entity providers or location analyzers.
  },

  scaffolder(env) {
    // Return an array of scaffolder actions (TemplateAction)
    // that will be registered with the scaffolder.
    return [];
  },

  search(indexBuilder, schedule, env) {
    // Add search contributions, such as
    // collators and decorators.
  },
};
