import { SuperbaseAuthGuard } from './superbase-auth.guard';

describe('SuperbaseAuthGuard', () => {
  it('should be defined', () => {
    expect(new SuperbaseAuthGuard()).toBeDefined();
  });
});
