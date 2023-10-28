import { expect, describe, it, afterEach, vi } from 'vitest';
import storage from '@helpers/storage';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_TOKEN_VALUE = 'api_key_123';

const USER_KEY = 'user';
const USER_VALUE = {
  id: 1,
  name: 'test',
  api_key: AUTH_TOKEN_KEY,
};

export const getAuthItem = () => localStorage.getItem(AUTH_TOKEN_KEY) || '';
export const setAuthItem = () => localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);

export const getUserItems = () => localStorage.getItem(USER_KEY, JSON.stringify(USER_VALUE)) || '';
export const setUserItems = () => localStorage.setItem(USER_KEY, JSON.stringify(USER_VALUE));

const getItemSpy = vi.spyOn(storage, 'getItem');
const setItemSpy = vi.spyOn(storage, 'setItem');
const removeItemSpy = vi.spyOn(storage, 'removeItem');
const clearItemsSpy = vi.spyOn(storage, 'clearItems');

afterEach(() => {
  localStorage.clear();
  getItemSpy.mockClear();
  setItemSpy.mockClear();
  removeItemSpy.mockClear();
  clearItemsSpy.mockClear();
});

describe.concurrent('Test Storage helper', () => {
  it('get item from LocalStorage', () => {
    setAuthItem();

    expect(storage.getItem(AUTH_TOKEN_KEY)).toStrictEqual(AUTH_TOKEN_VALUE);
    expect(getItemSpy).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
  });

  it('get item as array from LocalStorage', () => {
    setUserItems();

    expect(storage.getItem(USER_KEY, true)).toMatchObject(USER_VALUE);
    expect(getItemSpy).toHaveBeenCalledWith(USER_KEY, true);
  });

  it('set item to LocalStorage', () => {
    storage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);

    expect(getAuthItem()).toStrictEqual(AUTH_TOKEN_VALUE);
    expect(setItemSpy).toHaveBeenCalledWith(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
  });

  it('set items to LocalStorage', () => {
    storage.setItem(USER_KEY, USER_VALUE, true);

    expect(getUserItems()).toMatchObject(JSON.stringify(USER_VALUE));
    expect(setItemSpy).toHaveBeenCalledWith(USER_KEY, USER_VALUE, true);
  });

  it('remove item from LocalStorage', () => {
    setAuthItem();
    storage.removeItem(AUTH_TOKEN_KEY);

    expect(getAuthItem()).toBeNull;
    expect(removeItemSpy).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
  });

  it('clear items from LocalStorage', () => {
    setAuthItem();
    storage.clearItems();

    expect(getAuthItem()).toBeNull;
    expect(clearItemsSpy).toHaveBeenCalled;
  });
});
