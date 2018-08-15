const appUserModel = require('../../../model/appuser');

const resolve = {
  Mutation: {
    login: async (root, params) => {
      const response = await Promise.resolve(appUserModel.login(params));
      return response;
    },
    signup: async (root, params) => {
      const response = await Promise.resolve(appUserModel.signup(params));
      return response; 
    },
  },
};
module.exports = resolve;
