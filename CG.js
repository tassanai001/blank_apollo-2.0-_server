const mongoose = require('mongoose');

let pool;
const singleton = (() => {
  let instance;
  MongoInit = () => {
    if (pool) 
      return pool;
    mongoose.connect('mongodb://db:27017/server');
    pool = mongoose.connection;
    pool.on('error', console.error.bind(console, 'connection error:'));
    pool.once('open', (con) => {
      console.log('Connect Success!!');
      return con;
    });
    return pool;
  }
  return {
    getInstance: () => {
      if (!instance) {
        instance = MongoInit();
      }
      return instance;
    }
  };
})();

module.exports = singleton.getInstance();