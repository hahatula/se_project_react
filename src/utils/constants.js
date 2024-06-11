export const weatherAPIKey = 'd3b816af8d229be6132f283d0994ef3f';
export const coordinates = {
  latitude: '32.05019466821797',
  longitude: '34.82419831844607',
};

export const BASE_URL = process.env.NODE_ENV === "production" 
? "https://api.wtwr.xyz"
: "http://localhost:3001";
