import dotenv from 'dotenv';
import { IConfig, LogLevel } from './IConfig';
import { Logger } from '@utils/Logger';
import { ExceptionPriority } from '@utils/exceptions/IExceptionDetails';
import { ConfigurationException } from '@utils/exceptions/ConfigurationException';

class Config {
  private static instance: Config;
  private readonly envConfig: IConfig;
  private readonly defaultValues: Partial<IConfig> = {
    DBD_LOG_FILE: 'discord-dashboard.log', // Default value for log file
    DBD_LOG_LEVEL: LogLevel.ALL, // Default log level
  };

  private constructor() {
    dotenv.config();

    // Initialize config with environment variables or default values
    this.envConfig = {
      DBD_PORT: Number(process.env.DBD_PORT), // Port must be provided
      DBD_LOG_FILE: process.env.DBD_LOG_FILE || this.defaultValues.DBD_LOG_FILE,
      DBD_LOG_LEVEL:
        (process.env.DBD_LOG_LEVEL as LogLevel) ||
        this.defaultValues.DBD_LOG_LEVEL,
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.envConfig[key];
  }

  public static validateConfig(config: Config) {
    const allKeys = Object.keys(
      Config.getInstance().envConfig
    ) as (keyof IConfig)[];
    const required = ['DBD_PORT'] as (keyof IConfig)[];

    // Calculate optional keys by excluding required keys
    const optional = allKeys.filter((key) => !required.includes(key));

    const missingInEnv: {
      key: keyof IConfig;
      defaultValue?: IConfig[keyof IConfig];
    }[] = [];

    // Check required keys
    const required_missing: (keyof IConfig)[] = [];
    for (const option of required) {
      if (!process.env[option]) {
        required_missing.push(option);
      }
    }

    if (required_missing.length > 0) {
      throw new ConfigurationException(
        `Missing required config options: ${required_missing.join(', ')}`,
        {
          priority: ExceptionPriority.CRITICAL,
        }
      );
    }

    // Check optional keys
    for (const option of optional) {
      if (!process.env[option] && config.defaultValues[option] !== undefined) {
        missingInEnv.push({
          key: option,
          defaultValue: config.defaultValues[option],
        });
      }
    }

    // Log missing optional keys with their default values
    if (missingInEnv.length > 0) {
      missingInEnv.forEach(({ key, defaultValue }) => {
        Logger.log(
          new ConfigurationException(
            `Missing optional config option '${key}'. Using default value: ${defaultValue}`,
            {
              priority: ExceptionPriority.INFO,
            }
          )
        );
      });
    }
  }
}

export default Config;
