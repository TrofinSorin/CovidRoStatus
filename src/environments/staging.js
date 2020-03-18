import environment from './base';

const domainUrl = 'stagingUrl';
const baseApi = '//api-url';
const env = environment(baseApi, domainUrl);

export default {
  ...env
};