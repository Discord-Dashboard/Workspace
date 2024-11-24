import Config from '@config/Config';

import Fastify from 'fastify';

import HandleExceptions from '@utils/HandleExceptions';

class Dashboard {
  private server = Fastify();
  private config = Config.getInstance();

  @HandleExceptions
  private validateConfig() {
    Config.validateConfig(this.config);
  }

  @HandleExceptions
  async start() {
    this.validateConfig();

    await this.server.listen({
      port: this.config.get('DBD_PORT'),
    });
  }
}

export { Dashboard };
