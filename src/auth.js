import { post } from './utils';

export const login = async ({ username, password, client_id, client_secret }) =>
  await post('/oauth/token', {
    grant_type: 'password',
    client_id,
    client_secret,
    email: username,
    password: password
  });

export const logout = async options =>
  await post('/oauth/revoke', null, {
    Authorization: 'Bearer ' + options.authToken
  });

export const refreshToken = async refresh_token =>
  await post('/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token
  });
