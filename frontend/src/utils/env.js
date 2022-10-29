import pkJson from '../../package.json';

// let NODE_ENV = process.env.NODE_ENV || 'development';

let url = '';

// url = pkJson.config.url;

if (window.location.host !== 'localhost:8888') {
  url = `${window.location.protocol}//${process.env.API_V1}`;
} else {
  url = pkJson.config.url;
}
console.log(url);
// eslint-disable-next-line import/prefer-default-export
export const defaultConfig = {
  url,
  api_url: `${url}/api/v1`,
};
