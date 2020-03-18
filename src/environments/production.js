import environment from './base';

const domainUrl = 'productionUrl';
const baseApi = '//api-url';
const env = environment(baseApi, domainUrl);

export default {
  ...env
};