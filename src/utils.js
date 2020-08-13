import bent from 'bent';

const BASE_URL = 'https://owner-api.teslamotors.com';

export function clamp(value, min, max) {
  if (value < min) {
    value = min;
  }

  if (value > max) {
    value = max;
  }

  return value;
}

const postReq = bent(BASE_URL, 'POST', 'json', 200);
const getReq = bent(BASE_URL, 'GET', 'json', 200);

export const post = async (url, body, headers) => {
  const result = await postReq(url, body, headers);
  if (result.response) {
    return result.response;
  }
  return result;
};

export const get = async (url, body, headers) => {
  const result = await getReq(url, body, headers);
  if (result.response) {
    return result.response;
  }
  return result;
};

export const getOne = async (url, body, headers) => {
  const result = await getReq(url, body, headers);
  if (result.response && result.count > 0) {
    return result.response[0];
  }
  return result;
};

export const getCommand = async (options, command) =>
  await get(`/api/1/vehicles/${options.vehicleId}/${command}`, null, {
    Authorization: 'Bearer ' + options.authToken
  });

export const postCommand = async (options, command, body) =>
  await post(`/api/1/vehicles/${options.vehicleId}/${command}`, body, {
    Authorization: 'Bearer ' + options.authToken
  });
