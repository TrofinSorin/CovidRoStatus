export default function(baseApi, domainUrl) {
  return {
    domainUrl: domainUrl,
    api: {
      baseApi: `${baseApi}/api`
    }
  };
}