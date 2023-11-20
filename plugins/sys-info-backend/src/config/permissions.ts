import { createPermission } from '@backstage/plugin-permission-common';

export const SYS_INFO_RESOURCE_TYPE = 'sysInfo';

/**
 * SysInfo read permission
 *
 * @public
 */
export const sysInfoReadPermission = createPermission({
  name: `${SYS_INFO_RESOURCE_TYPE}.read`,
  attributes: { action: 'read' },
  resourceType: SYS_INFO_RESOURCE_TYPE,
});

/**
 * List of all the SysInfo permissions
 *
 * @public
 */
export const sysInfoPermissions = [sysInfoReadPermission];
