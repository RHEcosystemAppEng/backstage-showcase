import { ConfigReader } from '@backstage/config';
import { getSysInfoConfig } from './config';

describe('GetSystemInfoConfig', () => {
  it('fails by missing keys', () => {
    expect(() => getSysInfoConfig(new ConfigReader({}))).toThrow();
    expect(() =>
      getSysInfoConfig(
        new ConfigReader({
          sysInfo: {},
        }),
      ),
    ).toThrow();
  });

  it('loads default params', () => {
    const config = new ConfigReader({
      sysInfo: {
        baseUrl: 'http://www.github.com',
        repoName: 'dummy',
      },
    });

    const sysInfoConfig = getSysInfoConfig(config);
    expect(sysInfoConfig).toStrictEqual({
      baseUrl: 'http://www.github.com',
      fileName: undefined,
      repoName: 'dummy',
    });
  });
});
