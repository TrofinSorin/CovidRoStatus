import environment from './base';

const domainUrl = 'localhost';
const baseApi = '//api-urlchanged';
const env = environment(baseApi, domainUrl);

export default {
  ...env
};