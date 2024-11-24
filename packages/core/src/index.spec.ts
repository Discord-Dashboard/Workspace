import { Dashboard } from './';

describe('Index module exports', () => {
  it('should export Dashboard from @lib/Dashboard', () => {
    expect(Dashboard).toBeDefined();
    expect(typeof Dashboard).toBe('function');
  });
});
