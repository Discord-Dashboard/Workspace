import { Dashboard } from './Dashboard';
import Config from '@config/Config';
import Fastify from 'fastify';

// Mock external modules
jest.mock('@config/Config');
jest.mock('fastify');
jest.mock('@utils/HandleExceptions');

describe('Dashboard Class', () => {
  let dashboard: Dashboard;

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

    const listenMock = jest.fn().mockResolvedValue(undefined);

    // Properly type the mocked Fastify function
    const mockFastify = Fastify as jest.MockedFunction<typeof Fastify>;
    mockFastify.mockReturnValue({
      listen: listenMock,
    } as any); // Use 'as any' to bypass strict type checking if necessary

    // Instantiate Dashboard
    dashboard = new Dashboard();
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
});
