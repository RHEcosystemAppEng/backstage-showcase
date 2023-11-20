import {
  createServiceBuilder,
  loadBackendConfig,
  HostDiscovery,
  ServerTokenManager,
} from '@backstage/backend-common';
import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './router';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
// import { ConfigReader } from "@backstage/config";

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: Logger;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'sys-info-backend' });
  const config = await loadBackendConfig({ logger, argv: [] });
  const discovery = HostDiscovery.fromConfig(config);
  const tokenManager = ServerTokenManager.fromConfig(config, { logger });
  const permissions = ServerPermissionClient.fromConfig(config, {
    discovery,
    tokenManager,
  });

  logger.debug('Starting application server...');
  const router = await createRouter({
    logger,
    config,
    permissions,
    tokenManager,
  });

  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/sys-info', router);
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  return await service.start().catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

module.hot?.accept();
