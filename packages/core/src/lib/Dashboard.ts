import Config from '@config/Config';

import Fastify from 'fastify';

import HandleExceptions from '@utils/HandleExceptions';

class Dashboard {
  private readonly server = Fastify();
  private readonly config = Config.getInstance();

  @HandleExceptions
  private validateConfig() {
    Config.validateConfig();
  }

  @HandleExceptions
  async start() {
    this.validateConfig();

    await this.server.listen({
      port: this.config.get().server.port,
    });
  }
}

export { Dashboard };
