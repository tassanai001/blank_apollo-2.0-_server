const appUserModel = require('../../../model/appuser');

const resolvers = {
  Query: {
    currentUser: async () => {
      const response = await Promise.resolve(appUserModel.getCurrent());
      return response;
    },
    getMe: async (root, args, context) => {
      const result = await Promise.resolve(context.user);
      return result.user;
    }
  }
};

module.exports = resolvers;
