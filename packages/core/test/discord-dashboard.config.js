/** @type {import('@discord-dashboard/core').IConfig} */
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
