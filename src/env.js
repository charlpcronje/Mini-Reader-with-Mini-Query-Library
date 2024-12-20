// src/env.js

// Define the environment configuration object
const env = {
    APP_HOST: 'https://mini.reader.webally.co.za/',
    APP_PORT: 80,
    STORAGE_KEY: 'mini-reader-storage',
    CTRL_ERROR_KEY: 'e',
    DB_NAME: 'mini_reader',
    DB_USER: 'cp',
    DB_PASSWORD: '4334.4334',
    LOG_SQL: false,
};

// Freeze the object to prevent modifications
Object.freeze(env);

// Export the frozen object for use elsewhere
export { env };
