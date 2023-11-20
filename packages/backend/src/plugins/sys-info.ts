import { createRouter } from '@internal/plugin-sys-info-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
    permissions: env.permissions,
    tokenManager: env.tokenManager,
  });
}
