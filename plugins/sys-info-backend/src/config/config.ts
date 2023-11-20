import { Config } from '@backstage/config';

/**
 * Configuration used in sys-info plugin
 *
 * @public
 */
export interface SysInfoConfig {
  /**
   * BaseURL for GitHub site
   */
  baseUrl: string;

  /**
   * Repo name
   */
  repoName: string;

  /**
   * File name
   */
  fileName?: string;
}

export function getSysInfoConfig(config: Config): SysInfoConfig {
  return {
    baseUrl: config.getString('sysInfo.baseUrl'),
    repoName: config.getString('sysInfo.repoName'),
    fileName: config.getOptionalString('sysInfo.fileName'),
  };
}
