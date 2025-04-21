import BlueLinky from 'bluelinky';

const client = new BlueLinky({
  username: 'email',
  password: 'password',
  brand: 'hyundai',
  region: 'US',
  pin: '1234'
});

client.on('ready', async () => {
  const vehicle = client.getVehicle('VIN');
  const response = await vehicle?.status({ parsed: true, refresh: false });
  console.log(response);
  const location = await vehicle?.location();
  console.log(location);
  const startResponse = await vehicle?.start({
    hvac: true,
    defrost: true,
    heatedFeatures: true,
    temperature: 85,
    duration: 10,
    unit: 'F'
  });
  const stopResponse = await vehicle?.stop();
  const chargeStartResponse = await vehicle?.startCharge();
  const chargeStopResponse = await vehicle?.stopCharge();
});
