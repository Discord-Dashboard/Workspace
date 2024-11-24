// config.js
/** @type {import('./IConfig').IConfig} */
module.exports = {
  server: {
    port: 3000,
  },
  logs: {
    saveToFile: true,
    file: 'discord-dashboard.log',
    level: 'DEVELOPMENT',
  },
};
