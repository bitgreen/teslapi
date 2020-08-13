import bent from 'bent';

const BASE_URL = 'https://owner-api.teslamotors.com';

function clamp(value, min, max) {
  if (value < min) {
    value = min;
  }

  if (value > max) {
    value = max;
  }

  return value;
}

const post = bent(BASE_URL, 'POST', 'json', 200);
const get = bent(BASE_URL, 'GET', 'json', 200);

export const refreshToken = async refresh_token =>
  await post('/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token
  });

export const vehicle = async options =>
  await get('/api/1/vehicles', null, {
    Authorization: 'Bearer ' + options.authToken
  });

export const getCommand = async (options, command) =>
  await get(`/api/1/vehicles/${options.vehicleId}/${command}`, null, {
    Authorization: 'Bearer ' + options.authToken
  });

export const postCommand = async (options, command, body) =>
  await post(`/api/1/vehicles/${options.vehicleId}/${command}`, body, {
    Authorization: 'Bearer ' + options.authToken
  });

export const vehicleData = async options =>
  await getCommand(options, 'vehicle_data');

export const vehicleConfig = async options =>
  await getCommand(options, 'data_request/vehicle_config');

export const vehicleState = async options =>
  await getCommand(options, 'data_request/vehicle_state');

export const climateState = async options =>
  await getCommand(options, 'data_request/climate_state');

export const nearbyChargers = async options =>
  await getCommand(options, 'nearby_charging_sites');

export const driveState = async options =>
  await getCommand(options, 'data_request/drive_state');

export const chargeState = async options =>
  await getCommand(options, 'data_request/charge_state');

export const guiSettings = async options =>
  await getCommand(options, 'data_request/gui_settings');

export const mobileEnabled = async options =>
  await getCommand(options, 'mobile_enabled');

export const honkHorn = async options =>
  await postCommand(options, 'command/honk_horn', null);

export const flashLights = async options =>
  await postCommand(options, 'command/flash_lights', null);

export const startCharge = async options =>
  await postCommand(options, 'command/charge_start', null);

export const stopCharge = async options =>
  await postCommand(options, 'command/charge_stop', null);

export const openChargePort = async options =>
  await postCommand(options, 'command/charge_port_door_open', null);

export const closeChargePort = async options =>
  await postCommand(options, 'command/charge_port_door_close', null);

export const scheduleSoftwareUpdate = async (options, offset) =>
  await postCommand(options, 'command/schedule_software_update', {
    offset_sec: offset
  });

export const cancelSoftwareUpdate = async options =>
  await postCommand(options, 'command/cancel_software_update', null);

export const navigationRequest = async (options, subject, text, locale) =>
  await postCommand(options, 'command/navigation_request', {
    type: 'share_ext_content_raw',
    value: {
      'android.intent.ACTION': 'android.intent.action.SEND',
      'android.intent.TYPE': 'text/plain',
      'android.intent.extra.SUBJECT': subject,
      'android.intent.extra.TEXT': text
    },
    locale: locale,
    timestamp_ms: Date.now()
  });

export const mediaTogglePlayback = async options =>
  await postCommand(options, 'command/media_toggle_playback', null);

export const mediaPlayNext = async options =>
  await postCommand(options, 'command/media_next_track', null);

export const mediaPlayPrevious = async options =>
  await postCommand(options, 'command/media_prev_track', null);

export const mediaPlayNextFavorite = async options =>
  await postCommand(options, 'command/media_next_fav', null);

export const mediaPlayPreviousFavorite = async options =>
  await postCommand(options, 'command/media_prev_fav', null);

export const mediaVolumeUp = async options =>
  await postCommand(options, 'command/media_volume_up', null);

export const mediaVolumeDown = async options =>
  await postCommand(options, 'command/media_volume_down', null);

export const speedLimitActivate = async (options, pin) =>
  await postCommand(options, 'command/speed_limit_activate', { pin: pin });

export const speedLimitDeactivate = async (options, pin) =>
  await postCommand(options, 'command/speed_limit_deactivate', { pin: pin });

export const speedLimitClearPin = async (options, pin) =>
  await postCommand(options, 'command/speed_limit_clear_pin', { pin: pin });

export const speedLimitSetLimit = async (options, limit_mph) =>
  await postCommand(options, 'command/speed_limit_set_limit', {
    limit_mph
  });

export const setSentryMode = async (options, onoff) =>
  await postCommand(options, 'command/set_sentry_mode', { on: onoff });

export const seatHeater = async (options, heater, level) =>
  await postCommand(options, 'command/remote_seat_heater_request', {
    heater,
    level
  });

export const steeringHeater = async (options, level) =>
  await postCommand(options, 'command/remote_steering_wheel_heater_request', {
    on: level
  });

export const maxDefrost = async (options, onoff) =>
  await postCommand(options, 'command/set_preconditioning_max', {
    on: onoff
  });

export const windowControl = async (options, command) =>
  await postCommand(options, 'command/window_control', {
    command,
    lat: 0,
    lon: 0
  });

export const CHARGE_STORAGE = 50;
export const CHARGE_DAILY = 70;
export const CHARGE_STANDARD = 90;
export const CHARGE_RANGE = 100;

export const setChargeLimit = async (options, amt) =>
  await postCommand(options, 'command/set_charge_limit', {
    percent: clamp(amt, CHARGE_STORAGE, CHARGE_RANGE)
  });

export const chargeStandard = async options =>
  await postCommand(options, 'command/charge_standard', null);

export const chargeMaxRange = async options =>
  await postCommand(options, 'command/charge_max_range', null);

export const doorLock = async options =>
  await postCommand(options, 'command/door_lock', null);

export const doorUnlock = async options =>
  await postCommand(options, 'command/door_unlock', null);

export const climateStart = async options =>
  await postCommand(options, 'command/auto_conditioning_start', null);

export const climateStop = async options =>
  await postCommand(options, 'command/auto_conditioning_stop', null);

export const SUNROOF_VENT = 'vent';
export const SUNROOF_CLOSED = 'close';
export const sunRoofControl = async (options, state) =>
  await postCommand(options, 'command/sun_roof_control', { state: state });

export const sunRoofMove = async (options, percent) =>
  await postCommand(options, 'command/sun_roof_control', {
    state: 'move',
    percent
  });

export const MIN_TEMP = 15; // 59 Deg.F
export const MAX_TEMP = 28; // 82.4 Deg.F
export const setTemps = async (options, driver, pass) => {
  if (!pass) {
    pass = driver;
  }
  // ensure valid temp range
  driver = clamp(driver, MIN_TEMP, MAX_TEMP);
  pass = clamp(pass, MIN_TEMP, MAX_TEMP);

  return await postCommand(options, 'command/set_temps', {
    driver_temp: driver,
    passenger_temp: pass
  });
};

export const remoteStart = async (options, password) =>
  await postCommand(options, 'command/remote_start_drive', {
    password: password
  });

export const FRUNK = 'front';
export const TRUNK = 'rear';
export const openTrunk = async (options, which) =>
  await postCommand(options, 'command/actuate_trunk', { which_trunk: which });

export const wakeUp = async options =>
  await postCommand(options, 'wake_up', null);

export const setValetMode = async (options, onoff, pin) =>
  await postCommand(options, 'command/set_valet_mode', {
    on: onoff,
    password: pin
  });

export const resetValetPin = async options =>
  await postCommand(options, 'command/reset_valet_pin', null);

export const calendar = async (options, entry) =>
  await postCommand(options, 'command/upcoming_calendar_entries', entry);

export const homelink = async (options, lat, long) =>
  await postCommand(options, 'command/trigger_homelink', {
    lat: lat,
    lon: long
  });
