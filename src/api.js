import { clamp, get, getOne, getCommand as g, postCommand as p } from './utils';

export const vehicle = async opts =>
  await getOne('/api/1/vehicles', null, {
    Authorization: 'Bearer ' + opts.authToken
  });

export const vehicles = async opts =>
  await get('/api/1/vehicles', null, {
    Authorization: 'Bearer ' + opts.authToken
  });

export const vehicleData = async opts => await g(opts, 'vehicle_data');

export const vehicleConfig = async opts =>
  await g(opts, 'data_request/vehicle_config');

export const vehicleState = async opts =>
  await g(opts, 'data_request/vehicle_state');

export const climateState = async opts =>
  await g(opts, 'data_request/climate_state');

export const nearbyChargers = async opts =>
  await g(opts, 'nearby_charging_sites');

export const driveState = async opts =>
  await g(opts, 'data_request/drive_state');

export const chargeState = async opts =>
  await g(opts, 'data_request/charge_state');

export const guiSettings = async opts =>
  await g(opts, 'data_request/gui_settings');

export const mobileEnabled = async opts => await g(opts, 'mobile_enabled');

export const honkHorn = async opts => await p(opts, 'command/honk_horn', null);

export const flashLights = async opts =>
  await p(opts, 'command/flash_lights', null);

export const startCharge = async opts =>
  await p(opts, 'command/charge_start', null);

export const stopCharge = async opts =>
  await p(opts, 'command/charge_stop', null);

export const openChargePort = async opts =>
  await p(opts, 'command/charge_port_door_open', null);

export const closeChargePort = async opts =>
  await p(opts, 'command/charge_port_door_close', null);

export const scheduleSoftwareUpdate = async (opts, offset) =>
  await p(opts, 'command/schedule_software_update', {
    offset_sec: offset
  });

export const cancelSoftwareUpdate = async opts =>
  await p(opts, 'command/cancel_software_update', null);

export const navigationRequest = async (opts, subject, text, locale) =>
  await p(opts, 'command/navigation_request', {
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

export const mediaTogglePlayback = async opts =>
  await p(opts, 'command/media_toggle_playback', null);

export const mediaPlayNext = async opts =>
  await p(opts, 'command/media_next_track', null);

export const mediaPlayPrevious = async opts =>
  await p(opts, 'command/media_prev_track', null);

export const mediaPlayNextFavorite = async opts =>
  await p(opts, 'command/media_next_fav', null);

export const mediaPlayPreviousFavorite = async opts =>
  await p(opts, 'command/media_prev_fav', null);

export const mediaVolumeUp = async opts =>
  await p(opts, 'command/media_volume_up', null);

export const mediaVolumeDown = async opts =>
  await p(opts, 'command/media_volume_down', null);

export const speedLimitActivate = async (opts, pin) =>
  await p(opts, 'command/speed_limit_activate', { pin: pin });

export const speedLimitDeactivate = async (opts, pin) =>
  await p(opts, 'command/speed_limit_deactivate', { pin: pin });

export const speedLimitClearPin = async (opts, pin) =>
  await p(opts, 'command/speed_limit_clear_pin', { pin: pin });

export const speedLimitSetLimit = async (opts, limit_mph) =>
  await p(opts, 'command/speed_limit_set_limit', {
    limit_mph
  });

export const setSentryMode = async (opts, onoff) =>
  await p(opts, 'command/set_sentry_mode', { on: onoff });

export const seatHeater = async (opts, heater, level) =>
  await p(opts, 'command/remote_seat_heater_request', {
    heater,
    level
  });

export const steeringHeater = async (opts, level) =>
  await p(opts, 'command/remote_steering_wheel_heater_request', {
    on: level
  });

export const maxDefrost = async (opts, onoff) =>
  await p(opts, 'command/set_preconditioning_max', {
    on: onoff
  });

export const windowControl = async (opts, command) =>
  await p(opts, 'command/window_control', {
    command,
    lat: 0,
    lon: 0
  });

export const CHARGE_STORAGE = 50;
export const CHARGE_DAILY = 70;
export const CHARGE_STANDARD = 90;
export const CHARGE_RANGE = 100;

export const setChargeLimit = async (opts, amt) =>
  await p(opts, 'command/set_charge_limit', {
    percent: clamp(amt, CHARGE_STORAGE, CHARGE_RANGE)
  });

export const chargeStandard = async opts =>
  await p(opts, 'command/charge_standard', null);

export const chargeMaxRange = async opts =>
  await p(opts, 'command/charge_max_range', null);

export const doorLock = async opts => await p(opts, 'command/door_lock', null);

export const doorUnlock = async opts =>
  await p(opts, 'command/door_unlock', null);

export const climateStart = async opts =>
  await p(opts, 'command/auto_conditioning_start', null);

export const climateStop = async opts =>
  await p(opts, 'command/auto_conditioning_stop', null);

export const SUNROOF_VENT = 'vent';
export const SUNROOF_CLOSED = 'close';
export const sunRoofControl = async (opts, state) =>
  await p(opts, 'command/sun_roof_control', { state: state });

export const sunRoofMove = async (opts, percent) =>
  await p(opts, 'command/sun_roof_control', {
    state: 'move',
    percent
  });

export const MIN_TEMP = 15; // 59 Deg.F
export const MAX_TEMP = 28; // 82.4 Deg.F
export const setTemps = async (opts, driver, pass) => {
  if (!pass) {
    pass = driver;
  }
  // ensure valid temp range
  driver = clamp(driver, MIN_TEMP, MAX_TEMP);
  pass = clamp(pass, MIN_TEMP, MAX_TEMP);

  return await p(opts, 'command/set_temps', {
    driver_temp: driver,
    passenger_temp: pass
  });
};

export const remoteStart = async (opts, password) =>
  await p(opts, 'command/remote_start_drive', {
    password
  });

export const FRUNK = 'front';
export const TRUNK = 'rear';
export const openTrunk = async (opts, which) =>
  await p(opts, 'command/actuate_trunk', { which_trunk: which });

export const wakeUp = async opts => await p(opts, 'wake_up', null);

export const setValetMode = async (opts, onoff, pin) =>
  await p(opts, 'command/set_valet_mode', {
    on: onoff,
    password: pin
  });

export const resetValetPin = async opts =>
  await p(opts, 'command/reset_valet_pin', null);

export const calendar = async (opts, entry) =>
  await p(opts, 'command/upcoming_calendar_entries', entry);

export const homelink = async (opts, lat, long) =>
  await p(opts, 'command/trigger_homelink', {
    lat: lat,
    lon: long
  });
