export const weatherAPIKey = 'd3b816af8d229be6132f283d0994ef3f';
export const openCageGeocodingAPIKey = 'b0216de4d299456b8a04b61f9ad47c1f';
export const defaultCoordinates = {
  lat: '32.0852997',
  lng: '34.7818064',
};

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.wtwr.xyz'
    : 'http://localhost:3001';
