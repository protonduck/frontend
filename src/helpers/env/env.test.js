import { expect, describe, it } from 'vitest';
import env from '@helpers/env';

describe.concurrent('Test ENV helper', () => {
  it('returns correct vite api base url', async () => {
    expect(env.getItem('VITE_API_BASE_URL')).toContain('http://localhost:3000');
  });

  it('returns incorrect vite api base url', async () => {
    expect(env.getItem('VITE_API_BASE_URL')).not.toContain('http://api.bookmarks.local:8025/v1');
  });

  it('returns null as result', async () => {
    expect(env.getItem('INCORRECT_KEY')).toBeNull;
  });
});
