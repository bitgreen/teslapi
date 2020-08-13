import { vehicle, chargeState, refreshToken } from '../src';

const authToken = process.env.ACCESS_TOKEN;
if (!authToken) {
  throw new Error('requires ACCESS_TOKEN');
}
const refresh = process.env.REFRESH_TOKEN;
if (!refresh) {
  throw new Error('requires REFRESH_TOKEN');
}

describe('teslapi', () => {
  it('chargeState', async () => {
    const tesla = await vehicle({ authToken });
    console.log(tesla);

    if (tesla.state === 'asleep') {
      console.log('tesla IS ASLEEP');
      return;
    }

    const state = await chargeState({
      authToken,
      vehicleId: tesla.id_s
    });

    console.log(state);
  });
  it('refresh', async () => {
    console.log('refresh');
  });
});
