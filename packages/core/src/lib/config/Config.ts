import dotenv from 'dotenv'; // Importing dotenv to load environment variables
import { IConfig, LogLevel } from './IConfig'; // Importing IConfig and LogLevel types
import { Logger } from '@utils/Logger'; // Importing custom Logger utility
import { LogicException } from '@utils/exceptions/LogicException'; // Importing custom LogicException
import { ExceptionPriority } from '@utils/exceptions/IExceptionDetails'; // Importing ExceptionPriority enum

class Config {
  // Singleton instance of Config
  private static instance: Config;

  // Object to hold the environment configuration values
  private readonly envConfig: IConfig;

  /**
   * Private constructor that loads environment variables and initializes config.
   * Uses dotenv to load environment variables from a .env file.
   */
  private constructor() {
    dotenv.config(); // Load environment variables

    // Initialize config with environment variables
    this.envConfig = {
      DBD_PORT: Number(process.env.DBD_PORT), // Port for the dashboard server
      DBD_TEST: process.env.DBD_TEST || '', // Optional test config, default is an empty string
      DBD_LOG_FILE: process.env.DBD_LOG_FILE || 'discord-dashboard.log', // Log file name
      DBD_LOG_LEVEL: (process.env.DBD_LOG_LEVEL as LogLevel) || LogLevel.ALL, // Log level (default is ALL)
    };
  }

  /**
   * Singleton access method to get the instance of the Config class.
   * Ensures only one instance of Config is created (singleton pattern).
   */
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config(); // Create a new instance if it doesn't exist
    }
    return Config.instance;
  }

  /**
   * Method to get a configuration value by key.
   * @param key The key of the configuration to retrieve.
   */
  public get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.envConfig[key]; // Return the value of the requested config key
  }

  /**
   * Validates the configuration by checking if optional and required configuration options are missing.
   * Logs missing optional options as an INFO log and throws an error for missing required options.
   * @param config The config instance to validate.
   */
  public static validateConfig(config: Config) {
    // Define optional configuration options
    const optional = ['DBD_TEST', 'DBD_LOG_FILE'] as (keyof IConfig)[];

    // Define required configuration options
    const required = ['DBD_PORT'] as (keyof IConfig)[];

    // Array to hold any missing optional configuration options
    const optional_missing: (keyof IConfig)[] = [];
    for (const option of optional) {
      if (!config.get(option)) optional_missing.push(option); // Check if the config key is missing
    }

    // Log any missing optional config options
    if (optional_missing.length > 0) {
      Logger.log(
        new LogicException(
          `Missing optional config options: ${optional_missing.join(', ')}`,
          {
            priority: ExceptionPriority.INFO, // Log level set to INFO for missing optional config options
          }
        )
      );
    }

    // Array to hold any missing required configuration options
    const required_missing: (keyof IConfig)[] = [];
    for (const option of required) {
      if (!config.get(option)) required_missing.push(option); // Check if the required config key is missing
    }

    // If there are missing required config options, throw an error
    if (required_missing.length > 0) {
      throw new LogicException(
        `Missing required config options: ${required_missing.join(', ')}`,
        {
          priority: ExceptionPriority.CRITICAL, // Log level set to CRITICAL for missing required config options
        }
      );
    }
  }
}

export default Config;
