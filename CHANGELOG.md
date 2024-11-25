## 0.0.2-2 (2024-11-25)

### 🚀 Features

- **auto-pr.yml:** enhance PR title and body to include branch and commit details for better context ([e106658](https://github.com/Discord-Dashboard/workspace/commit/e106658))
- **auto-pr.yml:** add check for existing PR before creating a new one to prevent duplicate PRs ([673fec6](https://github.com/Discord-Dashboard/workspace/commit/673fec6))
- **auto-pr.yml): add GitHub CLI setup to enable PR existence check and creation refactor(auto-pr.yml:** update PR title to be more descriptive for automated PRs ([5c44a8c](https://github.com/Discord-Dashboard/workspace/commit/5c44a8c))
- **config:** enhance default value handling to initialize missing sections as objects and improve validation for empty configuration sections ([61ab30a](https://github.com/Discord-Dashboard/workspace/commit/61ab30a))
- **config): add saveToFile option to logs configuration for enhanced logging control refactor(config): remove null return from getConfigFilePath and throw exception instead for better error handling fix(logger): include supportUrl in formatted log messages for clearer troubleshooting guidance fix(exceptions:** update IExceptionDetails to make supportUrl optional for flexibility in exception handling ([ea2990a](https://github.com/Discord-Dashboard/workspace/commit/ea2990a))
- **config): refactor configuration management to support loading from various file types and improve structure fix(Dashboard): update config access to reflect new structure for server port fix(Logger): update log level and file access to use new configuration structure test(config:** add sample configuration file for testing purposes ([c5d343f](https://github.com/Discord-Dashboard/workspace/commit/c5d343f))
- **config): support default export for loaded config modules to enhance compatibility with ES modules fix(IConfig): make logs properties optional to allow for more flexible configuration fix(Logger): check config option before saving logs to file to prevent errors when saveToFile is not defined docs(test:** update import path in discord-dashboard.config.js for correct type reference ([ebc3fe8](https://github.com/Discord-Dashboard/workspace/commit/ebc3fe8))
- **config): update log level to DEVELOPMENT for better debugging during development refactor(logger): enhance logging logic to include DEVELOPMENT priority messages docs(config): add detailed comments and descriptions for log levels and config structure docs(exceptions:** improve documentation for exception priorities and their usage ([c914c9a](https://github.com/Discord-Dashboard/workspace/commit/c914c9a))
- **discord-dashboard.config.js:** add logging configuration to enhance debugging capabilities ([d36a408](https://github.com/Discord-Dashboard/workspace/commit/d36a408))
- **exceptions:** add ConfigurationException and InternalException classes to handle specific error scenarios in the application ([95ef7ad](https://github.com/Discord-Dashboard/workspace/commit/95ef7ad))
- **index.ts:** export constant 'a' with value 4 to enhance module functionality ([a85de50](https://github.com/Discord-Dashboard/workspace/commit/a85de50))
- **package.json): update main entry point from discord-dashboard.js to index.js for consistency feat(Config.ts): replace LogicException with ConfigurationException for better error handling in config feat(ConfigurationException.ts): add new ConfigurationException class for configuration-related errors feat(InternalException.ts): add InternalException class for internal application errors feat(index.ts): initialize and start Dashboard instance in test file feat(webpack.config.js): change output filename from discord-dashboard.js to index.js for clarity chore(tsconfig.base.json:** remove unnecessary declarationMap and sourceMap options for cleaner configuration ([72e96a2](https://github.com/Discord-Dashboard/workspace/commit/72e96a2))
- **workflow:** add auto PR creation workflow for feature branches to streamline development process ([df6e9be](https://github.com/Discord-Dashboard/workspace/commit/df6e9be))

### 🩹 Fixes

- **IConfig.ts): update logs property to make it required instead of optional to ensure proper configuration docs(IConfig.ts:** remove redundant description for ALL log level to streamline documentation ([50124e8](https://github.com/Discord-Dashboard/workspace/commit/50124e8))
- **index.ts:** update the value of constant 'a' from 4 to 5 to reflect the correct configuration ([db97d17](https://github.com/Discord-Dashboard/workspace/commit/db97d17))
- **index.ts:** update constant 'a' value from 5 to 6 to reflect the correct configuration ([ac401dc](https://github.com/Discord-Dashboard/workspace/commit/ac401dc))
- **index.ts:** update constant 'a' value from 6 to 7 to reflect the correct configuration ([93ac024](https://github.com/Discord-Dashboard/workspace/commit/93ac024))
- **index.ts:** update the exported constant 'a' from 7 to 8 to reflect the correct value ([9a63f17](https://github.com/Discord-Dashboard/workspace/commit/9a63f17))
- **index.ts:** update constant 'a' value from 8 to 9 to reflect the correct configuration ([c644699](https://github.com/Discord-Dashboard/workspace/commit/c644699))
- **index.ts:** update the value of constant 'a' from 9 to 10 to reflect the correct configuration ([d4b5ee5](https://github.com/Discord-Dashboard/workspace/commit/d4b5ee5))

### ❤️  Thank You

- Marcin Kondrat