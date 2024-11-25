import { Dashboard } from './Dashboard';
import Config from '@config/Config';
import Fastify from 'fastify';

// Mock external modules
jest.mock('@config/Config');
jest.mock('fastify');
jest.mock('@utils/HandleExceptions');

describe('Dashboard Class', () => {
  let dashboard: Dashboard;
  let listenMock: jest.Mock;
  let closeMock: jest.Mock;

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Mock implementations
    const mockConfigInstance = {
      get: jest.fn().mockReturnValue({
        server: { port: 3000 },
      }),
    };
    (Config.getInstance as jest.Mock).mockReturnValue(mockConfigInstance);

    (Config.validateConfig as jest.Mock).mockReturnValue(undefined);

    listenMock = jest.fn().mockResolvedValue(undefined);
    closeMock = jest.fn().mockResolvedValue(undefined);

    // Properly type the mocked Fastify function
    const mockFastify = Fastify as jest.MockedFunction<typeof Fastify>;
    mockFastify.mockReturnValue({
      listen: listenMock,
      close: closeMock,
    } as any);

    // Instantiate Dashboard
    dashboard = new Dashboard();
  });

  afterEach(async () => {
    // Clean up resources
    if (await dashboard['server']) {
      await dashboard['server'].close();
    }
  });

  test('should validate configuration on start', async () => {
    await dashboard.start();

    expect(Config.validateConfig).toHaveBeenCalled();
  });

  test('should start the server with correct port', async () => {
    await dashboard.start();

    expect(dashboard['server'].listen).toHaveBeenCalledWith({
      port: 3000,
    });
  });

  test('should throw error on invalid configuration', async () => {
    (Config.validateConfig as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid config');
    });

    await expect(dashboard.start()).rejects.toThrow('Invalid config');
  });

  test('should handle server start failure', async () => {
    const listenError = new Error('Port in use');
    listenMock.mockRejectedValue(listenError);

    await expect(dashboard.start()).rejects.toThrow('Port in use');
  });
});
