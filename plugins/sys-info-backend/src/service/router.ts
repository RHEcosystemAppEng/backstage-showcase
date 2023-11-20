import { errorHandler, TokenManager } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import os from 'os';

import { createPermissionIntegrationRouter } from '@backstage/plugin-permission-node';
import { NotAllowedError } from '@backstage/errors';
import { getBearerTokenFromAuthorizationHeader } from '@backstage/plugin-auth-node';
import {
  AuthorizeResult,
  PermissionEvaluator,
  ResourcePermission,
} from '@backstage/plugin-permission-common';

import { getSysInfoConfig } from '../config/config';
import { Config } from '@backstage/config';
import {
  sysInfoPermissions,
  sysInfoReadPermission,
} from '../config/permissions';

export interface RouterOptions {
  logger: Logger;
  config: Config;
  permissions: PermissionEvaluator;
  tokenManager: TokenManager;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, permissions } = options;
  // const { logger, config, permissions, tokenManager } = options;

  const permissionIntegrationRouter = createPermissionIntegrationRouter({
    permissions: sysInfoPermissions,
  });

  const router = Router();
  router.use(express.json());
  router.use(permissionIntegrationRouter);

  router.get('/system-info', async (req, res) => {
    await checkPermissionUsingResourceType(
      req,
      permissions,
      sysInfoReadPermission,
      'Read',
    );

    // if (!req.headers.authorization) {
    //   res.status(403).json({ error: 'Mandatory auth header missing'});
    // } else {
    for (const itemKey of config.getConfigArray('backend.auth.keys')) {
      console.log(`KEY=[${itemKey.getOptionalString('secret')}]`);
    }

    // const token = req.headers.authorization.split(' ')[1];
    // console.log(`AUTH TOKEN:: [${token}]`);
    // await tokenManager.authenticate(token);

    const sysInfoConfig = getSysInfoConfig(config);
    // const orgName = config.getString('organization.name');
    const systemInfo = {
      data: {
        hostname: os.hostname(),
        operatingSystem: os.type(),
        platform: os.platform(),
        release: os.release(),
        uptime: os.uptime(),
        loadavg: os.loadavg(),
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
      },
      cpus: os.cpus(),
      config: {
        baseUrl: sysInfoConfig.baseUrl,
        fileName: sysInfoConfig.fileName,
        repoName: sysInfoConfig.repoName,
        // orgName: orgName,
      },
    };

    logger.info(
      `Sending systemInfo for hostname=${systemInfo.data.hostname}...`,
    );

    res.send(systemInfo);
    // }
  });

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });
  router.use(errorHandler());
  return router;
}

async function checkPermissionUsingResourceType(
  req: any,
  permissions: PermissionEvaluator,
  permissionToCheck: ResourcePermission,
  callType: string,
) {
  const token = getBearerTokenFromAuthorizationHeader(
    req.headers.authorization,
  );

  console.log(`${callType} - Calling permissions.authorize...`);
  const decision = (
    await permissions.authorize(
      [
        {
          permission: permissionToCheck,
          resourceRef: req.body.id,
        },
      ],
      { token },
    )
  )[0];

  console.log(
    `${callType} - Got ${decision.result} - req.body.id=${
      req.body.id
    }, permission checked: ${JSON.stringify(permissionToCheck)}`,
  );
  if (decision.result !== AuthorizeResult.ALLOW) {
    throw new NotAllowedError(
      `Unauthorized for ${callType} - Got ${
        decision.result
      }. Permission checked: ${JSON.stringify(permissionToCheck)}`,
    );
  }
}
