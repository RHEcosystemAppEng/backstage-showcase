import { createRouter } from '@backstage/plugin-permission-backend';
import {
  AuthorizeResult,
  PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

class DefaultPermissionPolicy implements PermissionPolicy {
  async handle(request: PolicyQuery): Promise<PolicyDecision> {
    // console.log(`SG:: -> permission.name=[${request.permission.name}]`)

    if (request.permission.name === 'catalog.entity.delete') {
      console.log(
        `SG:: DENYing -> for permission.name=[${request.permission.name}]`,
      );
      return { result: AuthorizeResult.DENY };
    }
    console.log(
      `SG:: ALLOWing -> for permission.name=[${request.permission.name}]`,
    );
    return { result: AuthorizeResult.ALLOW };
  }
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new DefaultPermissionPolicy(),
    identity: env.identity,
  });
}
