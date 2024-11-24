import fs from 'fs';
import path from 'path';
import { IConfig, LogLevel } from './IConfig';
import { Logger } from '@utils/Logger';
import { ExceptionPriority } from '@utils/exceptions/IExceptionDetails';
import { ConfigurationException } from '@utils/exceptions/ConfigurationException';

class Config {
  private static instance: Config;
  private config: IConfig;

  // Default configuration values
  protected static readonly defaultValues: IConfig = {
    server: {
      port: 3000,
    },
    logs: {
      file: 'discord-dashboard.log',
      level: LogLevel.DEVELOPMENT,
    },
  };

  /**
   * Private constructor to ensure singleton pattern.
   * Loads and sets the configuration from a file.
   */
  private constructor() {
    const configPath = Config.getConfigFilePath();
    if (!configPath) {
      throw new ConfigurationException('Config file not found.', {
        priority: ExceptionPriority.CRITICAL,
      });
    }

    this.config = Config.loadConfig(configPath);
    this.setDefaultValues(this.config);
  }

  /**
   * Finds and returns the path to the configuration file (JSON, JS, or TS).
   * Checks for the file in the working directory.
   */
  private static getConfigFilePath(): string | null {
    const configFiles = [
      'discord-dashboard.config.json',
      'discord-dashboard.config.js',
      'discord-dashboard.config.ts',
    ];
    for (const file of configFiles) {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
    return null;
  }

  /**
   * Loads the configuration from JSON, JS, or TS file based on the file extension.
   */
  private static loadConfig(configPath: string): IConfig {
    if (configPath.endsWith('.json')) {
      return this.loadJsonConfig(configPath);
    } else if (configPath.endsWith('.js') || configPath.endsWith('.ts')) {
      return this.loadJsOrTsConfig(configPath);
    } else {
      throw new ConfigurationException('Unsupported config file type.', {
        priority: ExceptionPriority.CRITICAL,
      });
    }
  }

  /**
   * Loads configuration from a JSON file.
   * @param configPath The path to the config file.
   */
  private static loadJsonConfig(configPath: string): IConfig {
    const rawData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(rawData);
  }

  /**
   * Loads configuration from a JS or TS file.
   * @param configPath The path to the config file.
   */
  private static loadJsOrTsConfig(configPath: string): IConfig {
    return require(configPath);
  }

  /**
   * Merges default configuration values into the provided configuration if they are missing.
   * Recursively merges nested objects.
   */
  private setDefaultValues(config: IConfig): void {
    const mergeDefaults = (source: any, defaults: any): void => {
      Object.keys(defaults).forEach((key) => {
        if (source[key] === undefined || source[key] === null) {
          source[key] =
            typeof defaults[key] === 'object' && defaults[key] !== null
              ? {} // Set empty object if default is an object
              : defaults[key]; // Otherwise, set default value
        } else if (
          typeof source[key] === 'object' &&
          source[key] !== null &&
          typeof defaults[key] === 'object' &&
          defaults[key] !== null
        ) {
          // If both are objects, recursively merge
          mergeDefaults(source[key], defaults[key]);
        }
      });
    };

    // Create a deep copy to avoid mutating the original object
    const configCopy = JSON.parse(JSON.stringify(config));
    mergeDefaults(configCopy, Config.defaultValues);

    // Set the final merged configuration
    this.config = configCopy;
  }

  /**
   * Singleton pattern to get the instance of the Config class.
   * @returns The singleton instance of the Config class.
   */
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /**
   * Returns the entire configuration object.
   * @returns The configuration object.
   */
  public get(): IConfig {
    return this.config;
  }

  /**
   * Generates all possible paths from the configuration object.
   * This is used to traverse through nested objects and find all keys in the configuration.
   * @param obj The configuration object to traverse.
   * @param parentPath The path to the current object (used in recursion).
   * @returns An array of paths (keys) in the configuration object.
   */
  private static getAllPaths(obj: any, parentPath = ''): string[] {
    let paths: string[] = [];

    for (const key in obj) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If it's an empty object, add its path
        if (Object.keys(obj[key]).length === 0) {
          paths.push(currentPath);
        }
        // Recursively add paths from nested objects
        paths = paths.concat(this.getAllPaths(obj[key], currentPath));
      } else {
        paths.push(currentPath);
      }
    }

    return paths;
  }

  /**
   * Retrieves the value from the configuration object based on the provided path (e.g., "logs.file").
   * @param obj The configuration object.
   * @param path The path to the value in dot notation (e.g., "server.port").
   * @returns The value at the specified path.
   */
  private static getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => {
      return acc && typeof acc === 'object' ? acc[part] : undefined;
    }, obj);
  }

  /**
   * Validates the configuration, checking for missing required values and logs warnings for missing optional values.
   * @throws {ConfigurationException} If any required configuration options are missing.
   */
  public static validateConfig() {
    const required: string[] = ['server.port'];
    const required_missing: string[] = [];
    const missingOptionalValues: string[] = [];

    // Generate all paths from default values
    const defaultPaths = this.getAllPaths(Config.defaultValues);

    // Load current config from file
    const currentConfig = Config.loadConfig(Config.getConfigFilePath()!);

    // Check for missing required and optional values
    for (const defaultPath of defaultPaths) {
      const configValue = this.getValueByPath(currentConfig, defaultPath);

      if (configValue === undefined || configValue === null) {
        if (required.includes(defaultPath)) {
          required_missing.push(defaultPath);
        } else {
          missingOptionalValues.push(defaultPath);
        }
      }
    }

    // Throw exception if required values are missing
    if (required_missing.length > 0) {
      throw new ConfigurationException(
        `Missing required config options: ${required_missing.join(', ')}`,
        {
          priority: ExceptionPriority.CRITICAL,
        }
      );
    }

    // Log missing optional values
    missingOptionalValues.forEach((missingPath) => {
      const defaultValue = this.getValueByPath(
        Config.defaultValues,
        missingPath
      );
      Logger.log(
        new ConfigurationException(
          `Missing optional config option '${missingPath}'. Using default value: ${JSON.stringify(
            defaultValue
          )}`,
          {
            priority: ExceptionPriority.DEVELOPMENT,
          }
        )
      );
    });
  }
}

export default Config;
