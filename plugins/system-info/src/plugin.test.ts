import { systemInfoPlugin } from './plugin';

describe('system-info', () => {
  it('should export plugin', () => {
    expect(systemInfoPlugin).toBeDefined();
  });
});
