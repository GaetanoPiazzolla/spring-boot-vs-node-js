'use strict';

let config_data = null;

let getConf = function (confName) {
  if (config_data) {
    return config_data[confName];
  }
  config_data = {};
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    config_data = require('./development.json');
  } else {
    config_data = require('./production.json');
  }
  return config_data[confName];
};


module.exports = {
  getConf:getConf
};
